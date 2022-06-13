import React, { Component } from "react";
import { Grid, Typography, Container, Paper } from '@material-ui/core';
import UserContext from '../../UserContext';
import PdfLink from '../../widgets/PdfLink';
import InvestorPdfs from '../../model/InvestorPdfs';
import { UserPdfType } from 'fundscraper-model-enums';
import { EntityType } from 'fundscraper-model-enums';
import { InvestmentOrder, Investor } from '../../tsapi/api';

interface IProps {
	order: InvestmentOrder
}

interface IState {
}

/**
 *
 */
class OrderSubscriberDocuments extends Component<IProps, IState>
{
	render() {
		let investor = this.props.order.user as Investor;
		let profile = InvestorPdfs.getPdfOfType(investor.pdfs, UserPdfType.investor_profile);
		let kycPdf = InvestorPdfs.getPdfOfType(investor.pdfs, UserPdfType.key_kyp);

		let accountKyc = null;
		let account = null;
		if (this.props.order.entity_type === EntityType.users_corporation) {
			accountKyc = InvestorPdfs.getPdfOfType(investor.pdfs, UserPdfType.corporate_account);
			account = InvestorPdfs.getPdfOfType(investor.pdfs, UserPdfType.corporation_documents);
		}
		else if (this.props.order.entity_type === EntityType.users_trust) {
			accountKyc = InvestorPdfs.getPdfOfType(investor.pdfs, UserPdfType.trust_account);
			account = InvestorPdfs.getPdfOfType(investor.pdfs, UserPdfType.trust_documents);
		}
		else if (this.props.order.entity_type === EntityType.users_beneficiary) {
			accountKyc = InvestorPdfs.getPdfOfType(investor.pdfs, UserPdfType.beneficiary_account);
			account = InvestorPdfs.getPdfOfType(investor.pdfs, UserPdfType.beneficiary_documents);
		}

		return (
			<Paper>
				<Container maxWidth={false}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Typography><PdfLink pdf={profile} text='Profile Details' /></Typography>
							<Typography><PdfLink pdf={kycPdf} text='KYC/KYP' /></Typography>
							<Typography><PdfLink pdf={account} text='Investment Accounts' /></Typography>
							<Typography><PdfLink pdf={accountKyc} text='Investment Accounts KYC' /></Typography>
						</Grid>
					</Grid>
				</Container>
			</Paper>
		);
	}
}

OrderSubscriberDocuments.contextType = UserContext;

export default OrderSubscriberDocuments;
