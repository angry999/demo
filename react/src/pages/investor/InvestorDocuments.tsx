import React, { Component } from "react";
import Environment from '../../Environment';
import UserContext from '../../UserContext';
import { Button, Container, Grid, IconButton, Paper, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { UserPdf, Investor } from '../../tsapi/api';
import PdfLink from '../../widgets/PdfLink';
import InvestorPdfs from '../../model/InvestorPdfs';
import { UserPdfType } from 'fundscraper-model-enums';

const deleteWidth: React.CSSProperties = {
	'width': '20%'
}


interface IProps {
	investor: Investor
}

interface IState {
	files: any
	, dialog_open: boolean
	, uploading: boolean
	, error_message: string
}

/**
 *
 */
class InvestorDocuments extends Component<IProps, IState>
{
	constructor(props: IProps) {
		super(props);
		let files = (this.props.investor.pdfs === null || this.props.investor.pdfs === undefined) ? [] : this.props.investor.pdfs;
		this.state = {
			dialog_open: false
			, uploading: false
			, error_message: ''
			, files: files
		};
	}

	handleClose(e: any) {
		this.setState({ dialog_open: false });
	}

	handleDelete(e: any) {
		let id = e.currentTarget.id;
		let value = this.context;
		fetch(Environment.website_base_url + '/api/UserPdf/' + id + '?action=delete',
			{
				method: 'POST',
				headers: new Headers({
					'Authorization': 'Bearer ' + value.token
				})
			})
			.then((res) => {
				try {
					if (!res.ok) {
						if (res.status === 403)
							throw Error('You are not authorized to delete from this investor');
						throw new Error('The response was an http ' + res.status + ' and a message reading ' + res.statusText);
					}
					return res.json();
				}
				catch (error) {
					this.setState({ dialog_open: true, error_message: error.message });
				}
			})
			.then(results => {
				console.log('results ' + results);
				let currentFiles = this.state.files;
				for (let index = 0; index < currentFiles.length; index++) {
					let thisFile = currentFiles[index];
					if (thisFile.id === id)
						currentFiles.splice(index, 1);
				}
				this.setState({ uploading: false, files: currentFiles });
			}).catch((error) => {
				console.log('error ' + error);
				this.setState({ dialog_open: true, error_message: error.message });
			})
	}

	onChange(e: any) {
		console.log('uploadfiles');
		const files = Array.from(e.target.files)
		this.setState({ dialog_open: false, uploading: true, error_message: '' })

		const formData = new FormData()

		files.forEach((file: any, i: any) => {
			console.log('uploadfiles - ' + file);
			formData.append(i, file)
		})
		formData.append('type', UserPdfType.misc);

		let value = this.context;
		fetch(Environment.website_base_url + '/api/UserPdf/' + this.props.investor.id,
			{
				method: 'POST',
				headers: new Headers({
					'Authorization': 'Bearer ' + value.token
				}),
				body: formData
			})
			.then((res) => {
				try {
					if (!res.ok) {
						if (res.status === 403)
							throw Error('You are not authorized to upload to this investor');
						throw new Error('The response was an http ' + res.status + ' and a message reading ' + res.statusText);
					}
					return res.json();
				}
				catch (error) {
					this.setState({ dialog_open: true, error_message: error.message });
				}
			})
			.then(results => {
				let currentFiles = this.state.files;
				if (results != null) {
					for (let index = 0; index < results.length; index++) {
						let thisFile = results[index];
						let asObject = thisFile as UserPdf;
						currentFiles.push(asObject);
					}
				}
				console.log('results ' + results);
				this.setState({ uploading: false, files: currentFiles });
			}).catch((error) => {
				console.log('error ' + error);
				this.setState({ dialog_open: true, error_message: error.message });
			})
	}

	combinedLink(userPdf: any, title: string, link_id: string, no_delete = false) {
		if (userPdf !== null) {
			if (no_delete === true)
				return (
					<Grid item xs={3}>
						<PdfLink pdf={userPdf} text={title} id={link_id} />
					</Grid>
				);
			return (
				<Grid item container xs={3}>
					<Grid item xs={9}>
						<PdfLink pdf={userPdf} text={title} id={link_id} />
					</Grid>
					<Grid item xs={3}>
						<IconButton style={deleteWidth} id={userPdf.id} aria-label="delete" onClick={this.handleDelete.bind(this)}>
							<DeleteIcon></DeleteIcon>
						</IconButton>
					</Grid>
				</Grid>
			);
		}
	}

	render() {
		//let context = this.context;
		let profile = InvestorPdfs.getPdfOfType(this.props.investor.pdfs, UserPdfType.investor_profile);
		let kycPdf = InvestorPdfs.getPdfOfType(this.props.investor.pdfs, UserPdfType.key_kyp);
		let accountKyc = InvestorPdfs.getPdfOfType(this.props.investor.pdfs, UserPdfType.corporate_account);
		if (accountKyc === undefined)
			accountKyc = InvestorPdfs.getPdfOfType(this.props.investor.pdfs, UserPdfType.trust_account);
		if (accountKyc === undefined)
			accountKyc = InvestorPdfs.getPdfOfType(this.props.investor.pdfs, UserPdfType.beneficiary_account);
		let account = InvestorPdfs.getPdfOfType(this.props.investor.pdfs, UserPdfType.corporation_documents);
		if (account === undefined)
			account = InvestorPdfs.getPdfOfType(this.props.investor.pdfs, UserPdfType.trust_documents);
		if (account === undefined)
			account = InvestorPdfs.getPdfOfType(this.props.investor.pdfs, UserPdfType.beneficiary_documents);

		let error_text = this.state.error_message;

		let files = (this.state.files == null) ? [] : this.state.files;
		return (
			<Paper>
				<Container maxWidth={false}>
					<Grid container spacing={3}>
						{this.combinedLink(profile, 'Profile Details', 'profile_details_doc', true)}
						{this.combinedLink(kycPdf, 'KYC/KYP', 'kyc_kyp_doc', true)}
						{this.combinedLink(account, 'Investment Accounts', 'investment_accounts_doc', true)}
						{this.combinedLink(accountKyc, 'Investment Accounts KYC', 'investment_accounts_kyc_doc', true)}
						{files.map((pdf: any) => {
							if (pdf !== profile && pdf !== kycPdf && pdf !== account && pdf !== accountKyc
								&& pdf['pdf_type'] !== UserPdfType.assets)
								return this.combinedLink(pdf, pdf.title, pdf.id);
							return null;
						})}
						<Grid item xs={12}>
							<div>
								<Button variant="contained" component="label">Upload New
									<input type="file" onChange={this.onChange.bind(this)} style={{ display: "none" }} />
								</Button>
								<Typography>{error_text}</Typography>
							</div>
						</Grid>
					</Grid>
				</Container>
			</Paper>
		);
	}
}

InvestorDocuments.contextType = UserContext;

export default InvestorDocuments;
