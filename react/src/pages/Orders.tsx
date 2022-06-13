import React from "react";
import { Link } from "react-router-dom";
import Environment from '../Environment';
import UserContext from '../UserContext';
import { Button, Checkbox, FormControl, FormGroup, FormLabel, IconButton, InputLabel, ListItemText, MenuItem, Select, TableSortLabel, TextField, Tooltip, Typography } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import ArchiveIcon from '@material-ui/icons/Archive';
import { ApiLoadableDataTable, IApiLoadableDataTable_Props, IApiLoadableDataTable_State } from '../basePages/ApiLoadableDataTable';
import PdfLink from '../widgets/PdfLink';
import { InvestorPdfs } from '../model/InvestorPdfs';
import { Province_friendlyText, Province_idMap, UserPdfType } from 'fundscraper-model-enums';
import { UserOrderPdfType } from 'fundscraper-model-enums';
import { EntityType } from 'fundscraper-model-enums';
import { InvestmentOrderStatus, InvestmentOrderStatus_friendlyText } from 'fundscraper-model-enums';
import * as FundscraperApi from "../tsapi/api"
import { Configuration } from "../tsapi/configuration";
import { InvestmentOrder, Project } from "../tsapi/api";
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

const nameTxt: React.CSSProperties = {
	'color': '#5154D3',
	'fontSize': '0.9rem',
	'fontWeight': 500,
};

const tagOrders: React.CSSProperties = {
	'fontSize': '0.7rem',
	'textTransform': 'uppercase',
	'color': '#ffffff',
	'background': '#969696',
	'textAlign': 'center',
	'borderRadius': '2px'
};

const dateTxt: React.CSSProperties = {
	'fontSize': '0.7rem',
};

interface IProps extends IApiLoadableDataTable_Props {
	additional_filter: string
}

interface IState extends IApiLoadableDataTable_State<InvestmentOrder> {
	earliestEstDate: any
	, latestEstDate: any
	, earliestOrderDate: any
	, latestOrderDate: any
	, status: any
	, data: any
}

class Orders extends ApiLoadableDataTable<any, IProps, IState>
{
	/**
	 * column layout
	 */
	columns = [
		{
			name: "fullName",
			label: "Subscriber",
			options: {
				filter: false,
				sort: true,
			}
		},
		{
			name: 'project.name',
			label: "Project",
			options: {
				filter: true,
				sort: true,
				filterType: 'custom',
				filterOptions: {
					logic: (location: any, filters: any, row: any) => {
						if (filters.length)
							return !filters.includes(location);
						return false;
					},
					display: (filterList: any, onChange: any, index: any, column: any) => {
						return (
							<FormControl>
								<InputLabel htmlFor='select-multiple-chip'>Project</InputLabel>
								<Select
									multiple
									value={filterList[index]}
									renderValue={selected =>
										this.projectNameListOf(selected as any[])
									}
									onChange={event => {
										filterList[index] = event.target.value;
										//console.log(`selected ${event.target.value} list=${JSON.stringify(filterList)}`);
										onChange(filterList[index], index, column);
									}}
								>
									{this.projects?.map(item => (
										<MenuItem key={item.id} value={item.id}>
											<Checkbox
												color='primary'
												checked={filterList[index].indexOf(item.id) > -1}
											/>
											<ListItemText primary={item.name} />
										</MenuItem>
									))}
								</Select>
							</FormControl >
						);
					}
				}
			}
		},
		{
			name: "order_no",
			label: "Order Number",
			options: {
				filter: true,
				sort: true,
				filterType: 'textField',
			}
		},
		{
			name: "number_of_shares",
			label: "# Units",
			options: {
				filter: false,
				sort: true,
				customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
					let result = (value == null) ? '' : value.toLocaleString(undefined, { minimumFractionDigits: 0 });
					return result;
				}
			},
		},
		{
			name: "share_price",
			label: "Share Price",
			options: {
				filter: false,
				sort: true,
				customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
					let result = (value == null) ? '' : value.toLocaleString(undefined, { minimumFractionDigits: 2 });
					return '$' + result;
				}
			},
		},
		{
			name: "total_amount",
			label: "Total Amount",
			options: {
				filter: true,
				sort: true,
				customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
					let result = (value == null) ? '' : value.toLocaleString(undefined, { minimumFractionDigits: 2 });
					return '$' + result;
				},
				filterType: 'textField',
			},
		},
		{
			name: "agent_comm",
			label: "Commission Amount",
			options: {
				filter: true,
				sort: true,
				customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
					let result = (value == null) ? '' : value.toLocaleString(undefined, { minimumFractionDigits: 2 });
					return '$' + result;
				},
				filterType: 'textField',
			},
		},
		{
			name: "status",
			label: "Status",
			options: {
				filter: true,
				sort: true,
				customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
					return (
						<div style={tagOrders}>{InvestmentOrderStatus_friendlyText[value]}</div>
					);
				},
				filterType: 'custom',
				filterOptions: {
					names: [],
					display: (filterList: any, onChange: any, index: any, column: any) => (
						<FormControl>
							<InputLabel id="order-status-label" htmlFor='select-multiple-chip'>Status</InputLabel>
							<Select
								multiple
								labelId="order-status-label"
								id="order-status"
								value={filterList[index] || ''}
								renderValue={(selected: any) => this.statusFriendlyTextList(selected)}
								onChange={event => {
									filterList[index] = event.target.value;
									onChange(filterList[index], index, column);
								}}
							>
								<MenuItem key={InvestmentOrderStatus.order_placed} value={InvestmentOrderStatus.order_placed}>
									<ListItemText primary={InvestmentOrderStatus_friendlyText[InvestmentOrderStatus.order_placed]} />
								</MenuItem>
								<MenuItem key={InvestmentOrderStatus.purchased} value={InvestmentOrderStatus.purchased}>
									<ListItemText primary={InvestmentOrderStatus_friendlyText[InvestmentOrderStatus.purchased]} />
								</MenuItem>
								<MenuItem key={InvestmentOrderStatus.refunded} value={InvestmentOrderStatus.refunded}>
									<ListItemText primary={InvestmentOrderStatus_friendlyText[InvestmentOrderStatus.refunded]} />
								</MenuItem>
								<MenuItem key={InvestmentOrderStatus.transferred} value={InvestmentOrderStatus.transferred}>
									<ListItemText primary={InvestmentOrderStatus_friendlyText[InvestmentOrderStatus.transferred]} />
								</MenuItem>
								<MenuItem key={InvestmentOrderStatus.sold} value={InvestmentOrderStatus.sold}>
									<ListItemText primary={InvestmentOrderStatus_friendlyText[InvestmentOrderStatus.sold]} />
								</MenuItem>
							</Select>
						</FormControl>
					),
				},
				print: false,
			},
		},
		{
			name: "province_id",
			label: "Jurisdiction",
			options: {
				filter: false,
				sort: false,
				customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
					let result = value == null || Province_idMap[value] == null ? 'Other' : Province_friendlyText[Province_idMap[value]];
					return result;
				}
			},
		},
		{
			name: "drip_registered",
			label: "Drip Registered",
			options: {
				filter: false,
				sort: true,
				customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
					let result = value == null || value !== true ? 'False' : 'True';
					return (result);
				}
			},
		},
		{
			name: "order_date",
			label: "Order Date",
			options: {
				filter: true,
				sort: true,
				customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
					if (value === null || value === undefined)
						return null;
					let result = new Date(value).toLocaleString();
					return (
						<Typography style={dateTxt}>{result}</Typography>
					);
				},
				filterType: 'custom',
				customFilterListRender: (v: any) => {
					if (v[0] && v[1]) {
						return `Start Date: ${v[0]}, End Date: ${v[1]}`;
					} else if (v[0]) {
						return `Start Date: ${v[0]}`;
					} else if (v[1]) {
						return `End Date: ${v[1]}`;
					}
					return false;
				},
				filterOptions: {
					names: [],
					logic(date: any, filters: any) {
						let check = new Date(date);
						let from = new Date(filters[0]);
						let to = new Date(filters[1]);
						from.setDate(from.getDate() + 1);
						to.setDate(to.getDate() + 1);
						from = new Date(new Date(from).setHours(0, 0, 0, 0));
						to = new Date(new Date(to).setHours(23, 59, 59, 59));

						if (filters[0] && filters[1] && check >= to && check <= from) {
							return true;
						} else if (filters[0] && check >= to) {
							return true;
						} else if (filters[1] && check <= from) {
							return true;
						}
						return false;
					},
					display: (filterList: any, onChange: any, index: any, column: any) => (
						<div>
							<FormLabel>Order Date</FormLabel>
							<FormGroup row>
								<TextField
									id="startDate"
									label="Start Date"
									type="date"
									InputLabelProps={{
										shrink: true,
									}}
									value={filterList[index][0] || ''}
									onChange={event => {
										filterList[index][0] = event.target.value;
										onChange(filterList[index], index, column);
									}}
									style={{ width: '45%', marginRight: '5%' }}
								/>
								<TextField
									id="endDate"
									label="End Date"
									type="date"
									InputLabelProps={{
										shrink: true,
									}}
									value={filterList[index][1] || ''}
									onChange={event => {
										filterList[index][1] = event.target.value;
										onChange(filterList[index], index, column);
									}}
									style={{ width: '45%', marginRight: '5%' }}
								/>
							</FormGroup>
						</div>
					),
				},
				print: false,
			},
		},
		{
			name: "resolved_trade_date",
			label: "Trade Date",
			options: {
				filter: false,
				sort: false,
				customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
					if (value === null || value === undefined)
						return null;
					let result = new Date(value).toLocaleString();
					return (
						<Typography style={dateTxt}>{result}</Typography>
					);
				},
			},
		},
		{
			name: "resolved_entity",
			label: "Account Eligibility",
			options: {
				filter: false,
				sort: false,
			},
		},
		{
			name: "entity_name",
			label: "Entity Name",
			options: {
				filter: false,
				sort: true,
			},
		},
		{
			name: "roed_name",
			label: "ROED Name",
			options: {
				filter: false,
				sort: true,
			},
		},
		{
			name: "documents",
			label: "Documents",
			options: {
				filter: false,
				sort: false,
				customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
					if (value != null && value.length > 0) {
						return (<div>{
							value.map((entry: any) => {
								let id = entry.pdf == null || entry.pdf.id == null ? 'all' : entry.pdf.id;
								return (<PdfLink key={id} pdf={entry.pdf} text='' title={entry.title} />);
							})
						}<a key='all' style={textLink} href={value[value.length - 1].docUrlLink} title="Download all" rel="noopener noreferrer" target="_blank"><ArchiveIcon /></a></div>);
					}
					return '';
				}
			},
		},
		{
			name: "id",
			label: "View",
			options: {
				filter: false,
				sort: false,
				customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
					return (
						<Link style={textLink} to={`/order/${value}`}>
							<Button style={viewButton} variant="contained" id={`view_button_${value}`} >
								View
							</Button>
						</Link>
					);
				}
			},
		},

		{
			name: "adjusted_roed_row_match",
			label: "adjusted_roed_row_match",
			options: {
				filter: false,
				sort: false,
				display: false,
				viewColumns: false
			}
		},
	];

	projects?: any[];

	/**
	 * create the component and set default values into the state
	 */
	constructor(props: IProps) {
		super(props, undefined, 'Orders', true, true);
		this.setColumns(this.columns);

		function replacer(key: string, value: any) {
			if (key == "expanded_rows_table") return undefined;
			else return value;
		}

		console.log(`orders props ${JSON.stringify(props, replacer)}`);
	}

	projectById(id: number): FundscraperApi.Project | null {
		let projs = this.projects as FundscraperApi.Project[];
		for (let index = 0; index < projs.length; index++) {
			let proj = projs[index];
			if (proj.id === id)
				return proj;
		}
		return null;
	}

	projectNameListOf(selected: any[]): string {
		let result = '';
		selected.forEach(projId => {
			if (result !== '')
				result += ', ';
			let proj = this.projectById(projId);
			result += proj?.name;
		});

		return result;
	}

	statusFriendlyTextList(selected: any[]): string {
		let result = '';
		selected.forEach(int => {
			if (result !== '')
				result += ', ';
			let status = InvestmentOrderStatus_friendlyText[int];
			result += status
		})
		return result;
	}

	/**
	 * allow derivations to insert custom pieces on the searching portion of the toolbar by overriding this
	 */
	customSearch() {
	}

	/**
	 * allow derivations to insert custom pieces on the toolbar by overriding this
	 */
	customTool() {
		let user_context = this.context;
		let ids = '';
		this.state.selected.map((selectedId: string) => {
			let encryptedId = md5(selectedId);
			if (ids !== '')
				ids += ';';
			ids += encryptedId;
		});

		let docUrlLink = `${Environment.website_base_url}/download?order-docs=${ids}&access_token=${user_context.token}`;

		if (this.state.selected.length === 0)
			return <Tooltip title="Select one or more orders to download their documents">
				<IconButton id={this.title + "_download_all"} ><ArchiveIcon />
				</IconButton>
			</Tooltip>;
		else
			return <Tooltip title="Download documents for the orders that have been selected">
				<IconButton color='secondary' id={this.title + "_download_all"} ><a style={textLink} href={docUrlLink} title="Download all" rel="noopener noreferrer" target="_blank"><ArchiveIcon /></a>
				</IconButton>
			</Tooltip>;
	}

	async getProjects(config: Configuration) {
		if (this.projects == null) {
			let api = new FundscraperApi.DefaultApi(config);
			api.projectApiFindAllByFilter(undefined, undefined, undefined, 1, -1, {
				headers: { 'Authorization': 'Bearer ' + config.accessToken }
			}).then((data: Project[]) => {
				console.log('getProjects successful call');
				this.projects = data;
			}).catch(problem => {
				console.log('getProjects failed call');
			});
		}
	}

	/**
	 * make the api call to get the orders
	 */
	callApi(config: Configuration, newSearchTerm: string, newPage: number, newPageSize: number, newSortBy: string, newSortOrder: 'asc' | 'desc' | undefined) {
		console.log('callApi enter');

		this.getProjects(config);

		let url = window.location.href;
		let urlParams = new URL(`https://1.com?${url.split("?")[1]}`);
		let filterUrl = urlParams.searchParams.get('filter');
		console.log(urlParams, filterUrl)

		let filterList = this.state.filterTerms;
		let filters = 'investment_orders.is_deleted eq 0';
		if (filterUrl != null && filterUrl.length > 0)
			filters += ' and ' + filterUrl;

		if (this.props.additional_filter != null && this.props.additional_filter.length > 0)
			filters += ' and ' + this.props.additional_filter;

		//console.log(`building filters from ${JSON.stringify(filterList)}`);
		for (let i = 0; i < filterList.length; i++) {
			if (filterList[i][0] != null || filterList[i][1] != null) {
				let value = filterList[i][0];
				let column_name = this.columns[i].name;
				if (column_name === "status") {
					let idList = filterList[i].join(',');
					filters += ` and [status] in (${idList})`;
				}
				else if (column_name === "order_date") {
					if (value != null) {
						let start_date = new Date(value);
						filters += ` and ${column_name} ge '${start_date.toLocaleDateString("en-US")}'`
					}
					if (filterList[i][1] != null) {
						let end_date = new Date(filterList[i][1]);
						filters += ` and ${column_name} le '${end_date.toLocaleDateString("en-US")}'`
					}
				}
				else if (column_name === "project.name") {
					console.log(`filter ${column_name} values =${JSON.stringify(filterList[i])}`);
					let idList = filterList[i].join(',');
					filters += ` and project_id in (${idList})`
				}
				else if (column_name === "total_amount") {
					filters += ` and investment_orders.amount eq ${value}`
				}
				else {
					filters += ` and investment_orders.${column_name} eq '${value}'`
				}
			}
		}
		console.log(`filters built ${filters}`);

		filters += (newSearchTerm != null && newSearchTerm.length > 0) ? ` and order_no like '%${newSearchTerm}%'` : '';

		let orderBy = '';
		if (newSortBy !== null && newSortBy !== undefined && newSortBy !== '') {
			newSortBy = newSortBy.trim();
			if (newSortBy === 'fullName' || newSortBy === '[fullName]') {
				orderBy = `user.last_name ${newSortOrder === 'desc' ? 'desc' : 'asc'}, user.first_name`;
			}
			else if (newSortBy === 'total_amount' || newSortBy === '[total_amount]') {
				orderBy = 'investment_orders.amount';
			}
			else if (newSortBy === 'agent_comm' || newSortBy === '[agent_comm]') {
				orderBy = 'investment_orders.agent_comm';
			}
			else if (newSortBy === 'project.name') {
				orderBy = 'project.name';
			}
			else if (newSortBy === 'number_of_shares') {
				orderBy = 'investment_orders.number_of_shares';
			}
			else if (newSortBy === 'entity_name') {
				orderBy = 'user_entity.name';
			}
			else if (newSortBy === 'roed_name') {
				orderBy = 'roed_schedule1.name';
			}
			else
				orderBy = `investment_orders.${newSortBy}`;
			if (newSortOrder === 'desc')
				orderBy += ' desc';
		}
		else {
			orderBy = 'investment_orders.order_date desc';
		}
		console.log('callApi making call');
		let api = new FundscraperApi.DefaultApi(config);
		api.investmentOrderApiFindAllByFilter(filters, 'user.pdfs, project, user_entity, roed_schedule1', orderBy, newPage + 1, newPageSize, {
			headers: { 'Authorization': 'Bearer ' + config.accessToken }
		}).then((data: InvestmentOrder[]) => {
			console.log('callApi successful call');
			if (data != null) {
				try {
					data.forEach(order => {
						let investor = order.user as any;

						//subscriber
						(order as any)['fullName'] = `${investor.first_name} ${investor.last_name}`;
						if (order.user_entity != null)
							(order as any)['entity_name'] = (order.user_entity as any).name;

						if (order.roed_schedule1 != null)
							(order as any)['roed_name'] = (order.roed_schedule1 as any).name;

						//trade date
						if (order.trade_date == null || order.trade_date == undefined)
							(order as any)['resolved_trade_date'] = order.estimated_trade_date;
						else
							(order as any)['resolved_trade_date'] = order.trade_date;
						//entity
						if (order.entity_type == 0)
							(order as any)['resolved_entity'] = order.entity_id;
						else
							(order as any)['resolved_entity'] = null;
						(order as any)['province_id'] = investor.province_id;

						//documents
						let pdfs = investor.pdfs;
						let entity_type = order.entity_type;
						let order_no = order.order_no;
						let order_id = order.id;
						let docusign_guid = order.docusign_guid;
						let result = [];

						let profile = InvestorPdfs.getPdfOfType(pdfs, UserPdfType.investor_profile);
						if (profile !== null && profile !== undefined)
							result.push({ pdf: profile, title: 'Subscriber Profile' });

						let kycPdf = InvestorPdfs.getPdfOfType(pdfs, UserPdfType.key_kyp);
						if (kycPdf !== null && kycPdf !== undefined)
							result.push({ pdf: kycPdf, title: 'KYC/KYP' });

						let accountKyc = null;
						let account = null;
						if (entity_type === EntityType.users_corporation) {
							accountKyc = InvestorPdfs.getPdfOfType(pdfs, UserPdfType.corporate_account);
							account = InvestorPdfs.getPdfOfType(pdfs, UserPdfType.corporation_documents);
						}
						else if (entity_type === EntityType.users_trust) {
							accountKyc = InvestorPdfs.getPdfOfType(pdfs, UserPdfType.trust_account);
							account = InvestorPdfs.getPdfOfType(pdfs, UserPdfType.trust_documents);
						}
						else if (entity_type === EntityType.users_beneficiary) {
							accountKyc = InvestorPdfs.getPdfOfType(pdfs, UserPdfType.beneficiary_account);
							account = InvestorPdfs.getPdfOfType(pdfs, UserPdfType.beneficiary_documents);
						}
						if (accountKyc !== null && accountKyc !== undefined)
							result.push({ pdf: accountKyc, title: 'Account KYC/KYP' });
						if (account !== null && account !== undefined)
							result.push({ pdf: account, title: 'Account' });

						let risk = InvestorPdfs.getPdfForOrderOfType(pdfs, UserOrderPdfType.risk_acknowledgements, order_no, order_id);
						if (risk !== null && risk !== undefined)
							result.push({ pdf: risk, title: 'Investor Risk Acknowledgement' });

						let orderPdf = InvestorPdfs.getPdfForOrderOfType(pdfs, UserOrderPdfType.pre_order, order_no, order_id);
						if (orderPdf !== null && orderPdf !== undefined)
							result.push({ pdf: orderPdf, title: 'Purchase Summary' });

						let additional = InvestorPdfs.getPdfForOrderOfType(pdfs, UserOrderPdfType.aditional_acknowledgements, order_no, order_id);
						if (additional !== null && additional !== undefined)
							result.push({ pdf: additional, title: 'Investor Additional Achknowledgement' });

						let confirm = InvestorPdfs.getPdfForOrderOfType(pdfs, UserOrderPdfType.trade_confirm, order_no, order_id);
						if (confirm !== null && confirm !== undefined)
							result.push({ pdf: confirm, title: 'Trade Confirmation' });

						let receipt = InvestorPdfs.getPdfForOrderOfType(pdfs, UserOrderPdfType.payment_receipt, order_no, order_id);
						if (receipt !== null && receipt !== undefined)
							result.push({ pdf: receipt, title: 'Payment Receipt' });

						let subscription = InvestorPdfs.getPdfForOrderOfType(pdfs, UserOrderPdfType.subscription_agreement, order_no, order_id);
						if (subscription !== null && subscription !== undefined)
							result.push({ pdf: subscription, title: 'Subscription Agreement' });

						let docusign = InvestorPdfs.getPdfForOrderOfType(pdfs, UserOrderPdfType.docusign, docusign_guid, order_id);
						if (docusign !== null && docusign !== undefined)
							result.push({ pdf: docusign, title: 'DocuSign Form(s)' });

						let misc = InvestorPdfs.getPdfForOrderOfType(pdfs, UserOrderPdfType.misc, order_no, order_id);
						if (misc !== null && misc !== undefined)
							result.push({ pdf: misc, title: 'Misc' });

						let user_context = this.context;
						let orderId = order.id;
						let md5Val = md5(`${orderId}`);
						let docUrlLink = `${Environment.website_base_url}/download?order-docs=${md5Val}&access_token=${user_context.token}`;
						result.push({ docUrlLink: docUrlLink });

						(order as any)['documents'] = result;

						if (order.filed_roed_row_match != null)
							(order as any)['adjusted_roed_row_match'] = order.filed_roed_row_match - 9;
					});
				}
				catch (problem) { console.log("failed") }
			}
			this.loadCallback(undefined, data, undefined);
			console.log(`data:  ${JSON.stringify(data)}`, data);
		}).catch(problem => {
			console.log('callApi failed call');
			this.loadCallback(problem, undefined, undefined);
		});
	}
}

Orders.contextType = UserContext;

export default Orders;
