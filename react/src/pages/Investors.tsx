import React from "react";
import { Link } from "react-router-dom";
import Environment from '../Environment';
import { Button, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import ArchiveIcon from '@material-ui/icons/Archive';
import UserContext from '../UserContext';
import { ApiLoadableList, IApiLoadableList_Props, IApiLoadableList_State } from '../basePages/ApiLoadableList';
import { InvestorPdfs } from '../model/InvestorPdfs';
import PdfLink from '../widgets/PdfLink';
import { UserPdfType, UserPdfType_friendlyText } from 'fundscraper-model-enums';
import { UserState, UserState_friendlyText } from 'fundscraper-model-enums';
import * as FundscraperApi from "../tsapi/api"
import { Configuration } from "../tsapi/configuration";
import { Investor } from "../tsapi/api";
import { InvestorAccreditation_friendlyText } from 'fundscraper-model-enums';
var md5 = require('js-md5');

/**
 * styles
 */
const textLink: React.CSSProperties = {
	'textDecoration': 'none',
};
const viewButton: React.CSSProperties = {
	'fontSize': '0.7rem',
	'color': '#3A74B9',
	'borderRadius': '2px',
	'backgroundColor': '#ffffff',
	'border': '1px solid #3A74B9',
	'boxShadow': 'none'
};

const tagOrdersJustRegistered: React.CSSProperties = {
	'maxWidth': '100px',
	'fontSize': '0.6rem',
	'textTransform': 'uppercase',
	'color': '#ffffff',
	'fontWeight': 500,
	'background': '#E3BE59',
	'textAlign': 'center',
	'borderRadius': '2px',
	'padding': '3px 10px',
	'letterSpacing': '1px'
};
const tagOrdersApproved: React.CSSProperties = {
	'maxWidth': '100px',
	'fontSize': '0.6rem',
	'textTransform': 'uppercase',
	'color': '#ffffff',
	'fontWeight': 500,
	'background': '#6F9233',
	'textAlign': 'center',
	'borderRadius': '2px',
	'padding': '3px 10px',
	'letterSpacing': '1px'
};
const tagOrdersProfile: React.CSSProperties = {
	'maxWidth': '100px',
	'fontSize': '0.6rem',
	'textTransform': 'uppercase',
	'color': '#ffffff',
	'fontWeight': 500,
	'background': '#C9C24C',
	'textAlign': 'center',
	'borderRadius': '2px',
	'padding': '3px 10px',
	'letterSpacing': '1px'
};
const tagOrdersKYC: React.CSSProperties = {
	'maxWidth': '100px',
	'fontSize': '0.6rem',
	'textTransform': 'uppercase',
	'color': '#ffffff',
	'fontWeight': 500,
	'background': '#9DAE3F',
	'textAlign': 'center',
	'borderRadius': '2px',
	'padding': '3px 10px',
	'letterSpacing': '1px'
};

const tagOrdersUnknown: React.CSSProperties = {
	'maxWidth': '100px',
	'fontSize': '0.6rem',
	'textTransform': 'uppercase',
	'color': '#ffffff',
	'fontWeight': 500,
	'background': '#969696',
	'textAlign': 'center',
	'borderRadius': '2px',
	'padding': '3px 10px',
	'letterSpacing': '1px'
};

const tagOrdersbBlocked: React.CSSProperties = {
	'maxWidth': '100px',
	'fontSize': '0.6rem',
	'textTransform': 'uppercase',
	'color': '#ffffff',
	'fontWeight': 500,
	'background': '#ff0000',
	'textAlign': 'center',
	'borderRadius': '2px',
	'padding': '3px 10px',
	'letterSpacing': '1px'
};

const nameTxt: React.CSSProperties = {
	'color': '#5154D3',
	'fontSize': '0.9rem',
	'fontWeight': 500,
};

const emailTxt: React.CSSProperties = {
	'color': '#5D5D5D',
	'fontSize': '0.7rem !important',
};

const dateTxt: React.CSSProperties = {
	'fontSize': '0.7rem',
};

/**
 * column layout
 */
const columns = [
	{
		id: 'name', label: 'Name', sortable: true, minWidth: 50, format: function (table: any, row: any) {
			return (<div><Link style={textLink} to={`/investor/${row['id']}`}><Typography style={nameTxt} variant="body2">{row['first_name']} {row['last_name']}</Typography></Link>
				<Typography style={emailTxt} variant="caption" >{row['email']}</Typography></div>
			);
		}
	},
	{ id: 'phone', label: 'Phone', sortable: true, minWidth: 50 },
	{
		id: 'signup_date', label: 'Date Registered', sortable: true, minWidth: 50, format: function (table: any, row: any) {
			let val = row['signup_date'];
			if (val === null || val === undefined)
				return null;
			let asDate = new Date(val);
			let result = asDate.toLocaleString();
			return <Typography style={dateTxt}>{result}</Typography>;
		}
	},
	{
		id: 'actual_investment_level', label: 'Eligibility', sortable: true, minWidth: 50, format: function (table: any, row: any) {
			let val = row['actual_investment_level'];
			if (val === null || val === undefined)
				return null;
			return <Typography style={dateTxt}>{InvestorAccreditation_friendlyText[val]}</Typography>;
		}
	},
	{
		id: 'status', label: 'KYC Status', sortable: true, minWidth: 50, format: function (table: any, row: any) {
			let val = parseInt(row['status']);
			if (val === null || val === undefined)
				return null;
			switch (val) {
				case 0:
					return <div style={tagOrdersJustRegistered}>{UserState_friendlyText[val]}</div>;
				case 1:
					if (row['kyc_confirmed'] === true)
						return <div style={tagOrdersApproved}>KYC Completed</div>;
					else
						return <div style={tagOrdersApproved}>{UserState_friendlyText[val]}</div>;
				case 2:
					return <div style={tagOrdersProfile}>{UserState_friendlyText[val]}</div>;
				case 3:
					return <div style={tagOrdersProfile}>{UserState_friendlyText[val]}</div>;
				case 5:
					return <div style={tagOrdersKYC}>{UserState_friendlyText[val]}</div>;
				case 6:
					return <div style={tagOrdersKYC}>{UserState_friendlyText[val]}</div>;
				case 9:
					return <div style={tagOrdersKYC}>{UserState_friendlyText[val]}</div>;
				case 99:
					return <div style={tagOrdersbBlocked}>{UserState_friendlyText[val]}</div>;
				default:
					return <div style={tagOrdersUnknown}>Unknown</div>;
			}
		}
	},
	{
		id: 'kyc', label: 'Documents', sortable: false, minWidth: 50, format: function (table: any, row: any) {
			let pdfs = table.valueForProperty(row, 'pdfs');
			//console.log(`pfds = ${JSON.stringify(pdfs)}`);
			let types = [
				UserPdfType.investor_profile
				, UserPdfType.key_kyp
				, UserPdfType.corporate_account
				, UserPdfType.trust_account
				, UserPdfType.beneficiary_account
				, UserPdfType.corporation_documents
				, UserPdfType.trust_documents
				, UserPdfType.beneficiary_account
			];
			let result = [] as any;

			types.forEach(function (documentType) {
				let doc = InvestorPdfs.getPdfOfType(pdfs, documentType);
				if (doc != null)
					result.push({ pdf: doc, title: UserPdfType_friendlyText[documentType] });
			});

			let investorId = table.valueForProperty(row, 'id');
			let md5InvestorId = md5(`${investorId}`);
			let docUrlLink = `${Environment.website_base_url}/download?investor-docs=${md5InvestorId}&access_token=${table.context.token}`;

			if (result.length > 0)
				return (<div>{
					result.map((entry: any) => {
						return (<PdfLink pdf={entry.pdf} text='' title={entry.title} />);
					}
					)
				}<a style={textLink} href={docUrlLink} title="Download all" rel="noopener noreferrer" target="_blank"><ArchiveIcon /></a></div>);

			return '';
		}
	},
	{
		id: 'view', label: 'Actions', sortable: false, minWidth: 50, format: function (table: any, row: any) {
			return (
				<Link style={textLink} to={`/investor/${row['id']}`}>
					<Button style={viewButton} variant="contained">
						View
					</Button>
				</Link>
			);
		}
	},
];

interface IProps extends IApiLoadableList_Props {
}

interface IState extends IApiLoadableList_State<Investor> {
	earliestRegDate: any
	, latestRegDate: any
	, status: any
}

/**
 * a list of investors
 */
class Investors extends ApiLoadableList<Investor, IProps, IState>
{
	private allPsuedoState = -1;
	private kycConfirmedPsuedoState = 11;

	/**
	 * create the component and set default values into the state
	 */
	constructor(props: IProps) {
		super(props, columns, 'Investors');
	}

	/**
	 * handle the search by status changing
	 */
	handleStatusChange = (e: any) => {
		this.setState({ status: e.target.value });
	}

	/**
	 * handle the search by earliest registration date changing
	 */
	handleEarliestRegDateChange = (date: any) => {
		this.setState({ earliestRegDate: date });
	}

	/**
	 * handle the search by latest registration date changing
	 */
	handleLatesRegDateChange = (date: any) => {
		this.setState({ latestRegDate: date });
	}

	/**
	 * allow derivations to insert custom pieces on the searching portion of the toolbar by overriding this
	 */
	customSearch() {
		// registration date range
		// status
		let earliestRegDate = this.state.earliestRegDate;
		let latestRegDate = this.state.latestRegDate;
		let status = (this.state.status == null) ? 0 : this.state.status;
		if (earliestRegDate === undefined)
			earliestRegDate = null;
		if (latestRegDate === undefined)
			latestRegDate = null;
		return [
			<div>
				<InputLabel shrink id="order-status-label">Status</InputLabel>
				<Select
					labelId="order-status-label"
					id="order-status"
					value={status}
					onChange={this.handleStatusChange.bind(this)}
				>
					<MenuItem value={this.allPsuedoState}>All</MenuItem>
					<MenuItem value={UserState.initial_signup}>{UserState_friendlyText[UserState.initial_signup]}</MenuItem>
					<MenuItem value={UserState.active}>{UserState_friendlyText[UserState.active]}</MenuItem>
					<MenuItem value={this.kycConfirmedPsuedoState}>KYC completed</MenuItem>
					<MenuItem value={UserState.address_set}>{UserState_friendlyText[UserState.address_set]}</MenuItem>
					<MenuItem value={UserState.basic_info_complete}>{UserState_friendlyText[UserState.basic_info_complete]}</MenuItem>
					<MenuItem value={UserState.risk_questions_complete}>{UserState_friendlyText[UserState.risk_questions_complete]}</MenuItem>
					<MenuItem value={UserState.employment_complete}>{UserState_friendlyText[UserState.employment_complete]}</MenuItem>
					<MenuItem value={UserState.saved_risk_tolerance}>{UserState_friendlyText[UserState.saved_risk_tolerance]}</MenuItem>
					<MenuItem value={UserState.blocked}>{UserState_friendlyText[UserState.blocked]}</MenuItem>
				</Select>
			</div >,
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<KeyboardDatePicker
					disableToolbar
					variant="inline"
					label="Earlist Reg"
					InputLabelProps={{ shrink: true, }}
					format="MM/dd/yyyy"
					margin="none"
					clearable={true}
					id="search-reg-date-begin"
					value={earliestRegDate}
					onChange={this.handleEarliestRegDateChange.bind(this)}
					KeyboardButtonProps={{ 'aria-label': 'change date' }}
				/>
			</MuiPickersUtilsProvider>,
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<KeyboardDatePicker
					disableToolbar
					variant="inline"
					label="Latest Reg"
					InputLabelProps={{ shrink: true, }}
					format="MM/dd/yyyy"
					margin="none"
					clearable={true}
					id="search-reg-date-end"
					value={latestRegDate}
					onChange={this.handleLatesRegDateChange.bind(this)}
					KeyboardButtonProps={{ 'aria-label': 'change date' }}
				/>
			</MuiPickersUtilsProvider>
		]
	}

	/**
	 * make the api call to get the investors
	 */
	callApi(config: Configuration, newSearchTerm: string, newPage: number, newPageSize: number, newSortBy: string, newSortOrder: 'asc' | 'desc' | undefined) {
		let filter = 'investors.is_deleted eq 0';
		// the order matters here. the sql parser has some issues with "or"
		if (newSearchTerm !== '' && newSearchTerm !== undefined)
			filter += ' and concat(investors.first_name, investors.last_name) like "%' + newSearchTerm + '%"';

		if (this.state.earliestRegDate !== undefined && this.state.earliestRegDate !== null) {
			let dateToUse = (typeof this.state.earliestRegDate === 'string') ? new Date(this.state.earliestRegDate) : this.state.earliestRegDate;
			filter += ` and investors.signup_date ge "${dateToUse.toLocaleDateString("en-US")}"`;
		}
		if (this.state.latestRegDate !== undefined && this.state.latestRegDate !== null) {
			let dateToUse = (typeof this.state.latestRegDate === 'string') ? new Date(this.state.latestRegDate) : this.state.latestRegDate;
			filter += ` and investors.signup_date le "${dateToUse.toLocaleDateString("en-US")}"`;
		}
		if (this.state.status != null && this.state.status !== this.allPsuedoState) {
			if (this.state.status === this.kycConfirmedPsuedoState)
				filter += ` and investors.[status] eq ${UserState.active} and investors.kyc_confirmed eq 1`;
			else
				filter += ` and investors.[status] eq ${this.state.status} and investors.kyc_confirmed ne 1`;
		}

		let orderBy = '';
		if (newSortBy !== null && newSortBy !== undefined && newSortBy !== '') {
			if (newSortBy === 'name')
				orderBy = 'investors.last_name';
			else if (newSortBy === 'actual_investment_level')
				orderBy = 'investors.investor_type_system';
			else
				orderBy = `[investors].[${newSortBy}]`;
			if (newSortOrder === 'desc')
				orderBy += ' desc';
		}

		let api = new FundscraperApi.DefaultApi(config);
		api.investorApiFindAllByFilter(filter, 'pdfs', orderBy, newPage + 1, newPageSize, {
			headers: { 'Authorization': 'Bearer ' + config.accessToken }
		}).then((data: Investor[]) => {
			console.log('callApi successful call');
			this.loadCallback(undefined, data, undefined);
		}).catch(problem => {
			console.log('callApi failed call');
			this.loadCallback(problem, undefined, undefined);
		});
	}
}

Investors.contextType = UserContext;

export default Investors;
