
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AbstractHubspotService } from '../bll/AbstractHubspot.service';
import { HubspotContactService } from '../bll/HubspotContact.service';
import { HubspotDealService } from '../bll/HubspotDeal.service';
import { EmailService } from '../util/Email';
import { HubspotContactCobrandersService } from '../bll/HubspotContactCobranders.service';
import { HubspotProjectService } from '../bll/HubspotProject.service';

@Injectable()
export class HubspotCronService extends AbstractHubspotService {
    private readonly logger = new Logger(HubspotCronService.name);

    /**
     * create the new checker
     */
    constructor(readonly inEmailServce: EmailService
        , private readonly cobranderService: HubspotContactCobrandersService
        , private readonly projectService: HubspotProjectService
        , private readonly contactService: HubspotContactService
        , private readonly dealService: HubspotDealService) {
        super(inEmailServce);
    }

    /**
     * regular checkups for cobranders property
     */
    @Cron('0 45 4,12,20 * * *')
    //     | | | | | day of week
    //     | | | | month
    //     | | | day of month
    //     | | hour
    //     | minute
    //     second (optional)
    handleCobrandersCron() {
        this.logger.debug('handleCobrandersCron() enter');
        this.cobranderService.checkCobranders().then(() => {
            this.logger.debug('handleCobrandersCron() exit');
        })
    }

    /**
     * regular checkups for project property
     */
    @Cron('0 45 4,12,20 * * *')
    //     | | | | | day of week
    //     | | | | month
    //     | | | day of month
    //     | | hour
    //     | minute
    //     second (optional)
    handleProjectsPropertyCron() {
        this.logger.debug('handleProjectsPropertyCron() enter');
        this.projectService.checkAllProjects().then(() => {
            this.logger.debug('handleProjectsPropertyCron() exit');
        })
    }

    /**
     * regular checkups for investors
     */
    @Cron('0 0 4,6,8,10,12,14,16,18,20 * * *')
    //     | | | | | day of week
    //     | | | | month
    //     | | | day of month
    //     | | hour
    //     | minute
    //     second (optional)
    handleInvestorsCron() {
        this.logger.debug(`handleInvestorsCron enter()`);
        this.contactService.checkAllInvestors().then(() => {
            this.logger.debug(`handleInvestorsCron exit()`);
        })
    }

    /**
     * TODO: add check for contact
     */

    /**
     * regular checkups for orders
     */
    @Cron('0 30 4,6,8,10,12,14,16,18,20 * * *')
    //     | | | | | day of week
    //     | | | | month
    //     | | | day of month
    //     | | hour
    //     | minute
    //     second (optional)
    handleOrdersCron() {
        this.logger.debug('handleOrdersCron() enter');
        this.dealService.checkAllOrders().then(() => {
            this.logger.debug('handleOrdersCron() exit');
        })
    }

    /**
     * regular checkups for deals
     */
    @Cron('0 45 4,6,8,10,12,14,16,18,20 * * *')
    //     | | | | | day of week
    //     | | | | month
    //     | | | day of month
    //     | | hour
    //     | minute
    //     second (optional)
    handleDealsCron() {
        this.logger.debug('handleDealsCron() enter');
        this.dealService.checkAllDeals().then(() => {
            this.logger.debug('handleDealsCron() exit');
        })
    }
}
