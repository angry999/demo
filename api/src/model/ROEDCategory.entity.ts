/**
 * a categorization of options for exempt distribution of reports
 */
export enum ROEDCategory 
{
	//
	no_security_code = 1

	//
	, no_exemption_relied_upon = 2

}

var ROEDCategory_friendlyText: {[key: number]: string} = {};
ROEDCategory_friendlyText[ROEDCategory.no_security_code] = 'no_security_code';
ROEDCategory_friendlyText[ROEDCategory.no_exemption_relied_upon] = 'no_exemption_relied_upon';



