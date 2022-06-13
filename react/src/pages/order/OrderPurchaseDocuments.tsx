import React, { Component } from "react";
import Environment from '../../Environment';
import { Button, Container, Grid, IconButton, MenuItem, Paper, Select, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { UserPdf, InvestmentOrder, Investor } from '../../tsapi/api';
import UserContext from '../../UserContext';
import PdfLink from '../../widgets/PdfLink';
import InvestorPdfs from '../../model/InvestorPdfs';
import { UserOrderPdfType, UserOrderPdfType_friendlyText } from 'fundscraper-model-enums';

const deleteWidth: React.CSSProperties = {
	'width': '20%'
}

interface IProps {
	order: InvestmentOrder
}

interface IState {
	dialog_open: boolean
	, uploading: boolean
	, error_message: string
	, files: UserPdf[]
}

/**
 *
 */
class OrderPurchaseDocuments extends Component<IProps, IState>
{
	selectPrefix = 'select-';

	constructor(props: IProps) {
		super(props);
		this.state = {
			dialog_open: false
			, uploading: false
			, error_message: ''
			, files: (this.props.order.user as Investor).pdfs
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
							throw Error('You are not authorized to delete from this order');
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
		console.log('onChange');
		let value = this.context;
		let idString = e.currentTarget.id;
		let dashAt = idString.indexOf("-");
		let id = idString.substr(0, dashAt);

		let currentFiles = this.state.files;
		let alteredFile = null;
		for (let index = 0; index < currentFiles.length; index++) {
			let thisFile = currentFiles[index];
			if (thisFile.id === id) {
				alteredFile = thisFile;
				alteredFile['pdf_type'] = e.target.value;
			}
		}

		fetch(Environment.website_base_url + '/api/UserPdf/' + id + '?action=update',
			{
				method: 'POST',
				headers: new Headers({
					'Authorization': 'Bearer ' + value.token
				}),
				body: JSON.stringify(alteredFile)
			})
			.then((res) => {
				try {
					if (!res.ok) {
						if (res.status === 403)
							throw Error('You are not authorized to alter documents to this order');
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
			});
	}

	upload(e: any) {
		console.log('uploadfiles');
		const files = Array.from(e.target.files)
		this.setState({ dialog_open: false, uploading: true, error_message: '' })

		const formData = new FormData()

		files.forEach((file: any, i: any) => {
			console.log('uploadfiles - ' + file);
			formData.append(i, file)
		})
		formData.append('order_no', this.props.order.order_no);
		formData.append('type', UserOrderPdfType.misc);

		let value = this.context;
		fetch(Environment.website_base_url + '/api/UserPdf/' + this.props.order.user_id,
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

	linkForPdf(pdf: any) {
		if (pdf === null || pdf === undefined)
			return (<Typography>na</Typography>);
		return (<Typography><PdfLink pdf={pdf} /></Typography>);
	}

	combinedLink(userPdf: any, title: string, link_id: string, no_delete = false) {
		if (userPdf !== null) {
			if (no_delete === true)
				return (
					<Grid item xs={3}>
						<PdfLink pdf={userPdf} text={title} id={link_id} />
					</Grid>
				);
			//let selectId = this.selectPrefix + userPdf.id;
			return (
				<Grid item container xs={4}>
					<Grid item xs={12}>
						<PdfLink pdf={userPdf} text={title} id={link_id} />
					</Grid>
					<Grid item xs={9}>
						<Select value={userPdf.pdf_type} onChange={this.onChange.bind(this)}>
							<MenuItem id={userPdf.id + '-' + UserOrderPdfType.payment_receipt} value={UserOrderPdfType.payment_receipt}>{UserOrderPdfType_friendlyText[UserOrderPdfType.payment_receipt]}</MenuItem>
							<MenuItem id={userPdf.id + '-' + UserOrderPdfType.misc} value={UserOrderPdfType.misc}>{UserOrderPdfType_friendlyText[UserOrderPdfType.misc]}</MenuItem>
							<MenuItem id={userPdf.id + '-' + UserOrderPdfType.subscription_agreement} value={UserOrderPdfType.subscription_agreement}>{UserOrderPdfType_friendlyText[UserOrderPdfType.subscription_agreement]}</MenuItem>
						</Select>
					</Grid>
					<Grid item xs={3}>
						<IconButton id={userPdf.id} style={deleteWidth} aria-label="delete" onClick={this.handleDelete.bind(this)}>
							<DeleteIcon></DeleteIcon>
						</IconButton>
					</Grid>
				</Grid>
			);
		}
	}

	render() {
		let investor = this.props.order.user as Investor;
		let risk = InvestorPdfs.getPdfForOrderOfType(investor.pdfs, UserOrderPdfType.risk_acknowledgements, this.props.order.order_no, this.props.order.id);
		let orderPdf = InvestorPdfs.getPdfForOrderOfType(investor.pdfs, UserOrderPdfType.pre_order, this.props.order.order_no, this.props.order.id);
		let additional = InvestorPdfs.getPdfForOrderOfType(investor.pdfs, UserOrderPdfType.aditional_acknowledgements, this.props.order.order_no, this.props.order.id);
		let confirm = InvestorPdfs.getPdfForOrderOfType(investor.pdfs, UserOrderPdfType.trade_confirm, this.props.order.order_no, this.props.order.id);
		let docusign = InvestorPdfs.getPdfForOrderOfType(investor.pdfs, UserOrderPdfType.docusign, this.props.order.docusign_guid, this.props.order.id);

		let error_text = this.state.error_message;
		let files = (this.state.files == null) ? [] : this.state.files;
		return (
			<Paper>
				<Container maxWidth={false}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Typography>
								<PdfLink pdf={orderPdf} text='Purchase Summary' />
								<PdfLink pdf={risk} text='Investor Risk Acknowledgement' />
								<PdfLink pdf={additional} text='Investor Additional Achknowledgement' />
								<PdfLink pdf={confirm} text='Trade Confirmation' />
								<PdfLink pdf={docusign} text='DocuSign Form(s)' />
							</Typography>
						</Grid>
						{files.map((pdf: any) => {
							if ((pdf.pdf_type === UserOrderPdfType.payment_receipt
								|| pdf.pdf_type === UserOrderPdfType.misc
								|| pdf.pdf_type === UserOrderPdfType.subscription_agreement)
								&& InvestorPdfs.isForOrder(pdf, this.props.order.order_no, this.props.order.id)
							)
								return this.combinedLink(pdf, pdf.title, pdf.id);
							return null;
						})}
						<Grid item xs={12}>
							<div>
								<Button variant="contained" component="label">Upload New
									<input type="file" onChange={this.upload.bind(this)} style={{ display: "none" }} />
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

OrderPurchaseDocuments.contextType = UserContext;

export default OrderPurchaseDocuments;
