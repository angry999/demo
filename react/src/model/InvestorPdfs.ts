import { UserPdfType } from "fundscraper-model-enums";
import { UserPdf } from "../tsapi";

/**
 * this.props needs to be the order deep loaded with the investor, the investor documents and the project
 * extends=user,project
 *
 * the types generally used are:
 * 'additional-acknowledgements'
 * 'risk-acknowledgements'
 * 'pre-order-pdf' (purchase summary)
 * 'assets'
 * 'order-pdf' purchase statement (dont show this)
 * 'Corporation - Account'
 * 'Trust - Account'
 * 'Beneficiary - Account'
 */
export class InvestorPdfs {
	/**
	 * for the given set of user pdfs, return the one that is of a specific type
	 * @param array the pdf's to look through
	 * @param string typeName the name of the type to match
	 * @return UserPdf the first user pdf that is found of the given type
	 */
	static getPdfOfType(pdfs: UserPdf[], typeName: UserPdfType): UserPdf | null {
		if (pdfs != null) {
			var arrayLength = pdfs.length;
			for (var i = 0; i < arrayLength; i++) {
				let entry = pdfs[i];
				//console.log(`getPdfOfType compare ${(entry as any).pdf_type} to ${typeName}`);
				if (entry.pdf_type === typeName && entry.is_deleted == false) {
					//console.log('matched (' + entry.pdf_type + ') ' + entry.pdf_name);
					return entry;
				}
			}
		}
		//console.log('didnt find (' + typeName + ') ');
		return null;
	}

	/**
	 * is the given pdf for the order with the specified number?
	 * @param UserPdf pdf the document to check to see if its for the given order
	 * @param string order_no the order number to check if the pdf is for it
	 * @param number order_id the order id to check if the pdf is for it
	 * @return true if pdf is for the order with the number order_no
	 */
	static isForOrder(pdf: UserPdf, order_no: string, order_id: number): boolean {
		if (pdf.order_id == order_id)
			return true;
		if (pdf.pdf_name.indexOf(order_no) !== -1)
			return true;
		if (pdf.remarks.indexOf(order_no) !== -1)
			return true;
		return false;
	}

	/**
	 * for the given set of user pdfs, return the one that is of a specific type for the given order
	 * @param array the pdf's to look through
	 * @param string typeName the name of the type to match
	 * @param string order_no the order number to match
	 * @param number order_id the order id to match
	 * @return UserPdf the first user pdf that is found of the given type
	 */
	static getPdfForOrderOfType(pdfs: UserPdf[], typeName: string, order_no: string, order_id: number): UserPdf | null {
		if (pdfs !== null && pdfs !== undefined && order_no != null && order_no.length > 0) {
			var arrayLength = pdfs.length;
			for (var i = 0; i < arrayLength; i++) {
				let entry = pdfs[i];
				if (entry.pdf_type === typeName && entry.pdf_name != null && entry.is_deleted == false) {
					if (InvestorPdfs.isForOrder(entry, order_no, order_id))
						return entry;
				}
			}
		}
		//console.log('didnt find (' + typeName + ', ' + order_no + ') ');
		return null;
	}
}

export default InvestorPdfs;
