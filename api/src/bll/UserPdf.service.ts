import { AbstractService } from './AbstractService.service';
import { Injectable, Inject, Logger } from '@nestjs/common';
import { Investor } from '../model/Investor.entity.generated';
import { InvestmentOrder } from '../model/InvestmentOrder.entity.generated';
import { Project } from '../model/Project.entity.generated';
import { UserPdf } from '../model/UserPdf.entity.generated';
import { UserPdfDal } from '../dal/UserPdf.provider';
import * as fs from 'fs';
import { zip } from 'zip-a-folder';

/**
 * A service to support the operations on instances of UserPdf
 * NOTE: the base of these services essentially proxy dal methods
 */
@Injectable()
export class UserPdfService extends AbstractService<UserPdf>
{
    private logger = new Logger(UserPdfService.name);
    constructor(private injectedDal: UserPdfDal) {
        super(injectedDal);
    }

    /**
     * get real pattern name in UserPdf record
     * @returns value of the field name. if null or undifined, return 'undefined' string
     * @userPdf one UserPdf record of the matchedUserPdfs
     * @pattern field name of the UserPdf and its extends  
     */
    getPatternName(userPdf: UserPdf, pattern: string): string {

        let destFile: string | Date = '';
        let invester = userPdf.user as unknown as Investor;
        let investmentOrder = userPdf.order as unknown as InvestmentOrder;
        let project = investmentOrder.project as unknown as Project;

        switch (pattern) {
            case 'pdf_type':
                destFile = userPdf.pdf_type ? userPdf.pdf_type : 'undefined';
                break;
            case 'pdf_name':
                destFile = userPdf.pdf_name ? userPdf.pdf_name : 'undefined';
                break;
            case 'fullName':
                destFile = invester ? invester.first_name + invester.last_name : 'undefined';
                break;
            case 'user.client_number':
                destFile = (invester && invester.client_number) ? invester.client_number : 'undefined';
                break;
            case 'order.project.name':
                destFile = (investmentOrder && project.name) ? project.name : 'undefined';
                break;
            case 'order.project.issuer.name':
                destFile = (investmentOrder && project && project.issuer && project.issuer.name) ? project.issuer.name : 'undefined';
                break;
            case 'order.order_no':
                destFile = (investmentOrder && investmentOrder.order_no) ? investmentOrder.order_no : 'undefined';
                break;
            case 'order.trade_date':
                destFile = (investmentOrder && investmentOrder.trade_date) ? investmentOrder.trade_date : 'undefined';
                break;
            case 'filter.start_date':
                destFile = userPdf.createtime ? userPdf.createtime : 'undefined';
                break;
            case 'filter.end_date':
                destFile = userPdf.createtime ? userPdf.createtime : 'undefined';
                break;
            default:
                destFile = 'bundlefile';
        }

        return destFile.toString();
    }

    /**
     * create bundle file as zip
     * @returns the bundle file path
     * @param filter - filter string for UserPdf  
     * @param expandBy - extends for UserPdf. input is 'user, order.project.issuer'  
     * @param pattern - pattern for bundle file. string that combines pattern1, pattern2, and pattern3 such as "pattern1, pattern2, pattern3"  
     * pattern1,2,3 is the field name of the UserPdf and its extends. that is merged as one string with comma. 
     * ex. "order.project.name, user.client_number, pdf_name"
     * pattern1 is used as directory name that is created in root  
     * pattern2 is used as directory name that is created inside pattern1 directory
     * pattern3 is used as file name that is created in pattern2 directory  
     */
    async getBundleFilePath(filter: string, expandBy: string[], pattern: string): Promise<string> {

        const matchedUserPdfs = await this.findAllByFilter(filter, null, expandBy);

        const rootFolderName = process.env.GEN_ROOT + '\\' + pattern + '_' + new Date().getTime();
        // make root directory
        if (!fs.existsSync(rootFolderName)) {
            fs.mkdirSync(rootFolderName);
        }

        const patterns = pattern.split(",");
        const pattern1 = patterns[0];
        const pattern2 = patterns[1];
        const pattern3 = patterns[2];

        for (let index = 0; index < matchedUserPdfs.length; index++) {
            const userPdf = matchedUserPdfs[index];
            let destPath1 = this.getPatternName(userPdf, pattern1);
            let destPath2 = this.getPatternName(userPdf, pattern2);
            destPath1 = rootFolderName + '\\' + destPath1;
            destPath2 = destPath1 + '\\' + destPath2;

            let destFileName = this.getPatternName(userPdf, pattern3) + '.pdf';
            let sourceFilePath = process.env.GEN_ROOT + '\\external\\pdfs\\' + userPdf.pdf_name;

            // make first sub directory
            if (!fs.existsSync(destPath1)) {
                fs.mkdirSync(destPath1);
            }

            // make second sub directory
            if (!fs.existsSync(destPath2)) {
                fs.mkdirSync(destPath2);
            }

            // copy files to destPath1\\destPath2 directory
            fs.copyFile(sourceFilePath, destPath2 + '\\' + destFileName, async (err) => {
                if (err) {
                    this.logger.debug(`File Copy Error Found: ` + err);
                }
                else {
                    this.logger.debug(`File Copied successfully ` + destFileName);
                }
            });
        }

        // zip directory as bundle
        await zip(rootFolderName, rootFolderName + '.zip');

        // remove bundle directory
        await fs.rmdirSync(rootFolderName, { recursive: true });

        return rootFolderName + '.zip';

    }

    /**
     * returns the file path of the UserPdf instance
     * @param id - the id of the UserPdf  
     */
    async getFilePath(id: number): Promise<string> {
        let userPdf = await this.repository.findOneById(id);
        const filepath = process.env.GEN_ROOT + '\\external\\pdfs\\' + userPdf.pdf_name;
        return filepath;
    }
}
