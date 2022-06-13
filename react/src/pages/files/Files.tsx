import React from "react";
import UserContext from '../../UserContext';
import { Checkbox, FormControl, FormGroup, FormLabel, InputLabel, ListItemText, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { ApiLoadableDataTable, IApiLoadableDataTable_Props, IApiLoadableDataTable_State } from '../../basePages/ApiLoadableDataTable';
import { UserPdfType, UserPdfType_friendlyText } from 'fundscraper-model-enums';
import { UserOrderPdfType, UserOrderPdfType_friendlyText } from 'fundscraper-model-enums';
import * as FundscraperApi from "../../tsapi/api"
import { Configuration } from "../../tsapi/configuration";
import { InvestmentOrder, Project } from "../../tsapi/api";
import CollapsePanel from "./CollapsePanel";
import { FILES_DATA, PROJECTS } from "../../tests/mock.files.data";

/**
 * styles
 */
const dateTxt: React.CSSProperties = {
	'fontSize': '0.7rem',
};

interface IProps extends IApiLoadableDataTable_Props {
	isTesting: boolean		// tempcode for unit test
};

interface IState extends IApiLoadableDataTable_State<InvestmentOrder> {
	filters: string | null,
	downloadBundleDisabled: boolean,
	columns: any
};

interface DocumentType {
	id: string,
	name: string
}

// pdf type user_frindly_name list merged with UserOrderPdfType and UserPdfType
const documentType: DocumentType[] = [
	{ id: UserOrderPdfType.pre_order, name: UserOrderPdfType_friendlyText[UserOrderPdfType.pre_order] },
	{ id: UserOrderPdfType.risk_acknowledgements, name: UserOrderPdfType_friendlyText[UserOrderPdfType.risk_acknowledgements] },
	{ id: UserOrderPdfType.aditional_acknowledgements, name: UserOrderPdfType_friendlyText[UserOrderPdfType.aditional_acknowledgements] },
	{ id: UserOrderPdfType.order, name: UserOrderPdfType_friendlyText[UserOrderPdfType.order] },
	{ id: UserOrderPdfType.trade_confirm, name: UserOrderPdfType_friendlyText[UserOrderPdfType.trade_confirm] },
	{ id: UserOrderPdfType.suitability, name: UserOrderPdfType_friendlyText[UserOrderPdfType.suitability] },
	{ id: UserOrderPdfType.docusign, name: UserOrderPdfType_friendlyText[UserOrderPdfType.docusign] },
	{ id: UserOrderPdfType.payment_receipt, name: UserOrderPdfType_friendlyText[UserOrderPdfType.payment_receipt] },
	{ id: UserOrderPdfType.misc, name: UserOrderPdfType_friendlyText[UserOrderPdfType.misc] },
	{ id: UserOrderPdfType.subscription_agreement, name: UserOrderPdfType_friendlyText[UserOrderPdfType.subscription_agreement] },
	{ id: UserOrderPdfType.ffba_document, name: UserOrderPdfType_friendlyText[UserOrderPdfType.ffba_document] },
	{ id: UserOrderPdfType.om_document, name: UserOrderPdfType_friendlyText[UserOrderPdfType.om_document] },
	{ id: UserOrderPdfType.unit_certificate, name: UserOrderPdfType_friendlyText[UserOrderPdfType.unit_certificate] },
	{ id: UserOrderPdfType.borrowing_ack, name: UserOrderPdfType_friendlyText[UserOrderPdfType.borrowing_ack] },
	{ id: UserPdfType.assets, name: UserPdfType_friendlyText[UserPdfType.assets] },
	{ id: UserPdfType.key_kyp, name: UserPdfType_friendlyText[UserPdfType.key_kyp] },
	{ id: UserPdfType.corporate_account, name: UserPdfType_friendlyText[UserPdfType.corporate_account] },
	{ id: UserPdfType.trust_account, name: UserPdfType_friendlyText[UserPdfType.trust_account] },
	{ id: UserPdfType.beneficiary_account, name: UserPdfType_friendlyText[UserPdfType.beneficiary_account] },
	{ id: UserPdfType.corporation_documents, name: UserPdfType_friendlyText[UserPdfType.corporation_documents] },
	{ id: UserPdfType.trust_documents, name: UserPdfType_friendlyText[UserPdfType.trust_documents] },
	{ id: UserPdfType.beneficiary_documents, name: UserPdfType_friendlyText[UserPdfType.beneficiary_documents] },
	{ id: UserPdfType.personal_statement, name: UserPdfType_friendlyText[UserPdfType.personal_statement] },
	{ id: UserPdfType.payment_history, name: UserPdfType_friendlyText[UserPdfType.payment_history] },
	{ id: UserPdfType.earnings_history, name: UserPdfType_friendlyText[UserPdfType.earnings_history] },
	{ id: UserPdfType.periodic_statement, name: UserPdfType_friendlyText[UserPdfType.periodic_statement] },
	{ id: UserPdfType.investor_profile, name: UserPdfType_friendlyText[UserPdfType.investor_profile] },
	{ id: UserPdfType.misc, name: UserPdfType_friendlyText[UserPdfType.misc] },
	{ id: UserPdfType.t5013_tax_slip, name: UserPdfType_friendlyText[UserPdfType.t5013_tax_slip] },
	{ id: UserPdfType.inv_det_notes, name: UserPdfType_friendlyText[UserPdfType.inv_det_notes] },
];
class Files extends ApiLoadableDataTable<any, IProps, IState>
{
	projects?: FundscraperApi.Project[];
	config?: Configuration;

	/**
	 * create the component and set default values into the state
	 */
	constructor(props: IProps, state: IState) {
		super(props, undefined, 'Files', true, true, null, false, false, props.isTesting);
	};

	componentDidUpdate(prevProps: any, prevState: any) {
		this.setCustomToolbar(<CollapsePanel handleDownloadBundle={this.downloadBundle} downloadBundleDisabled={this.state.downloadBundleDisabled} />);

		const filteredColumns = [
			{
				name: 'order.project.name',
				label: "Project Name",
				options: {
					filter: true,
					sort: false,
					display: true,
					filterList: (this.state.filterTerms && this.state.filterTerms[0]) ? this.state.filterTerms[0] : null,
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
									<InputLabel htmlFor='select-multiple-chip'>Project Name</InputLabel>
									<Select
										multiple
										value={filterList[index]}
										renderValue={selected =>
											this.projectNameListOf(selected as any[])
										}
										onChange={event => {
											filterList[index] = event.target.value;
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
				name: "user.client_number",
				label: "Client Number",
				options: {
					filter: true,
					sort: false,
					filterList: (this.state.filterTerms && this.state.filterTerms[1]) ? this.state.filterTerms[1] : null,
					filterType: 'textField',
				}
			},
			{
				name: "fullName",
				label: "Invester Name",
				options: {
					filter: true,
					sort: false,
					filterType: 'custom',
					filterList: (this.state.filterTerms && this.state.filterTerms[2]) ? this.state.filterTerms[2] : null,
					customFilterListRender: (v: any) => {
						if (v[0] && v[1]) {
							return `First Name: ${v[0]}, Last Name: ${v[1]}`;
						} else if (v[0]) {
							return `First Name: ${v[0]}`;
						} else if (v[1]) {
							return `Last Name: ${v[1]}`;
						}
						return false;
					},
					filterOptions: {
						names: [],
						logic(date: any, filters: any) {

							if (filters[0] && filters[1]) {
								return true;
							} else if (filters[0]) {
								return true;
							} else if (filters[1]) {
								return true;
							}
							return false;
						},
						display: (filterList: any, onChange: any, index: any, column: any) => (
							<div>
								<FormLabel>Invester Name</FormLabel>
								<FormGroup row>
									<TextField
										id="firstName"
										label="First Name*"
										value={filterList[index][0] || ''}
										onChange={event => {
											filterList[index][0] = event.target.value;
											onChange(filterList[index], index, column);
										}}
										style={{ width: '45%', marginRight: '5%' }}
									/>
									<TextField
										id="lastName"
										label="Last Name*"
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
				}
			},
			{
				name: "order.order_no",
				label: "Order Number",
				options: {
					filter: true,
					sort: false,
					filterType: 'textField',
					filterList: (this.state.filterTerms && this.state.filterTerms[3]) ? this.state.filterTerms[3] : null,
				}
			},
			{
				name: "order.trade_date",
				label: "Trade Date",
				options: {
					filter: true,
					sort: false,
					customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
						if (value === null || value === undefined)
							return null;
						let result = new Date(value).toLocaleString();
						return (
							<Typography style={dateTxt}>{result}</Typography>
						);
					},
					filterType: 'custom',
					filterList: (this.state.filterTerms && this.state.filterTerms[4]) ? this.state.filterTerms[4] : null,
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
								<FormLabel>Trade Date</FormLabel>
								<FormGroup row>
									<TextField
										id="startDate"
										label="From Date"
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
										label="To Date"
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
				name: "document_type",
				label: "Document Type",
				options: {
					filter: true,
					sort: true,
					filterType: 'custom',
					filterList: (this.state.filterTerms && this.state.filterTerms[5]) ? this.state.filterTerms[5] : null,
					filterOptions: {
						logic: (location: any, filters: any, row: any) => {
							if (filters.length)
								return !filters.includes(location);
							return false;
						},
						display: (filterList: any, onChange: any, index: any, column: any) => {
							return (
								<FormControl>
									<InputLabel htmlFor='select-multiple-chip'>Document Type*</InputLabel>
									<Select
										multiple
										value={filterList[index]}
										renderValue={selected =>
											this.documentTypeListOf(selected as any[])
										}
										onChange={event => {
											filterList[index] = event.target.value;
											onChange(filterList[index], index, column);
										}}
									>
										{documentType?.map(item => (
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
				name: "pdf_name",
				label: "Document Name",
				options: {
					filter: true,
					sort: false,
					filterType: 'custom',
					filterList: (this.state.filterTerms && this.state.filterTerms[6]) ? this.state.filterTerms[6] : null,
					filterOptions: {
						display: (filterList: any, onChange: any, index: any, column: any) => {
							return (
								<div>
									<TextField
										id="pdf_name"
										value={filterList[index][0] || ''}
										onChange={event => {
											filterList[index][0] = event.target.value;
											onChange(filterList[index], index, column);
										}}
										label="Document Name*"
										style={{ width: '100%' }}
									/>
								</div>
							)
						},
					},
				}
			},
			{
				name: "order.project.issuer.name",
				label: "Issuer Name",
				options: {
					filter: true,
					sort: false,
					filterType: 'textField',
					filterList: (this.state.filterTerms && this.state.filterTerms[7]) ? this.state.filterTerms[7] : null,
				}
			},
			{
				name: "createtime",
				label: "Create Date",
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
					filterList: (this.state.filterTerms && this.state.filterTerms[8]) ? this.state.filterTerms[8] : null,
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
								<FormLabel>Create Date</FormLabel>
								<FormGroup row>
									<TextField
										id="startDate"
										label="From Date"
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
										label="To Date"
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
		]
		this.setColumns(filteredColumns);
	}

	/**
	 * get project element by id
	 */
	projectById(id: number): FundscraperApi.Project | null {
		if (this.projects) {
			for (let index = 0; index < this.projects.length; index++) {
				let proj = this.projects[index];
				if (proj.id === id)
					return proj;
			}
		}
		return null;
	};

	/**
	 * get projects name list
	 */
	projectNameListOf(selected: number[]): string {
		let result = '';
		selected.forEach(projId => {
			if (result !== '')
				result += ', ';
			let proj = this.projectById(projId);
			result += proj?.name;
		});

		return result;
	};

	/**
	 * get documentType element by id
	 */
	documentTypeById(id: string): DocumentType | null {
		for (let index = 0; index < documentType.length; index++) {
			let docType = documentType[index];
			if (docType.id === id)
				return docType;
		}
		return null;
	};

	/**
	 * get selected pdf type user_friendly_name
	 */
	documentTypeListOf(selected: string[]): string {
		let result = '';
		selected.forEach(projId => {
			if (result !== '')
				result += ', ';
			let proj = this.documentTypeById(projId);
			result += proj?.name;
		});

		return result;
	};

	/**
	 * get all project list via api
	 */
	async getProjects(config: Configuration) {
		if (!this.projects) {
			if (this.props.isTesting) {
				this.projects = PROJECTS as any;
			} else {
				let api = new FundscraperApi.DefaultApi(config);
				api.projectApiFindAllByFilter(undefined, undefined, undefined, 1, -1, {
					headers: { 'Authorization': 'Bearer ' + config.accessToken }
				}).then((data: Project[]) => {
					this.projects = data;
				}).catch(problem => {
					console.log('getProjects failed call');
				});
			}
		}
	};

	/**
	 * make the api call to get the orders
	 */
	callApi(config: Configuration, newSearchTerm: string, newPage: number, newPageSize: number, newSortBy: string, newSortOrder: 'asc' | 'desc' | undefined) {

		this.getProjects(config);
		if (!this.config) this.config = config;

		let url = window.location.href;
		let urlParams = new URL(`https://1.com?${url.split("?")[1]}`);
		let filterUrl = urlParams.searchParams.get('filter');

		let filterList = this.state.filterTerms;
		let filters = 'users_pdf.is_deleted = 0';
		if (filterUrl != null && filterUrl.length > 0)
			filters += ' and ' + filterUrl;

		for (let i = 0; i < filterList.length; i++) {
			if (filterList[i][0] != null || filterList[i][1] != null) {
				let value = filterList[i][0];
				let column_name = this.columns[i].name;
				if (column_name === "document_type") {
					let idList = filterList[i].join(',').replace(/,/g, "','");
					filters += ` and users_pdf.pdf_type in ('${idList}')`;
				}
				else if (column_name === "pdf_name") {
					filters += ` and users_pdf.pdf_name like '%${value}%'`;
				}
				else if (column_name === "fullName") {
					if (value != null) {
						filters += ` and user.first_name like '%${value}%'`;
					}
					if (filterList[i][1] != null) {
						filters += ` and user.last_name like '%${filterList[i][1]}%'`;
					}
				}
				else if (column_name === "user.client_number") {
					if (value != null) {
						filters += ` and user.client_number like '%${value}%'`;
					}
				}
				else if (column_name === "order.project.name") {
					let idList = filterList[i].join(',');
					filters += ` and order.project_id in (${idList})`;
				}
				else if (column_name === "order.project.issuer.name") {
					if (value != null) {
						filters += ` and order.project.issuer.name like '%${value}%'`;
					}
				}
				else if (column_name === "createtime") {
					if (value != null) {
						let start_date = new Date(value);
						filters += ` and users_pdf.createtime ge '${start_date.toLocaleDateString("en-US")}'`;
					}
					if (filterList[i][1] != null) {
						let end_date = new Date(filterList[i][1]);
						filters += ` and users_pdf.createtime le '${end_date.toLocaleDateString("en-US")}'`;
					}
				}
				else if (column_name === "order.trade_date") {
					if (value != null) {
						let start_date = new Date(value);
						filters += ` and order.trade_date ge '${start_date.toLocaleDateString("en-US")}'`;
					}
					if (filterList[i][1] != null) {
						let end_date = new Date(filterList[i][1]);
						filters += ` and order.trade_date le '${end_date.toLocaleDateString("en-US")}'`;
					}
				}
				else if (column_name === "order.order_no") {
					filters += ` and order.order_no = '${value}'`;
				}
			}
		}

		if (filters !== "users_pdf.is_deleted = 0") {
			this.setState({ downloadBundleDisabled: false });
		} else {
			this.setState({ downloadBundleDisabled: true });
		}
		this.setState({ filters: filters });

		filters += (newSearchTerm != null && newSearchTerm.length > 0) ? ` and users_pdf.pdf_name like '%${newSearchTerm}%'` : '';
		let orderBy = 'users_pdf.createtime desc';
		let expand = "user, order.project.issuer";
		let api = new FundscraperApi.DefaultApi(config);

		if (this.props.isTesting) {
			this.loadCallback(undefined, FILES_DATA, undefined);
		} else
			api.userPdfApiFindAllByFilter(filters, expand, orderBy, newPage + 1, newPageSize, {
				headers: { 'Authorization': 'Bearer ' + config.accessToken }
			}).then((data: FundscraperApi.UserPdf[]) => {
				if (data != null) {
					try {
						data.forEach(ifile => {
							let invester = ifile.user as unknown as FundscraperApi.Investor;
							let documentType = this.documentTypeById(ifile.pdf_type);
							(ifile as any)['fullName'] = `${invester.first_name} ${invester.last_name}`;
							(ifile as any)['document_type'] = documentType ? documentType.name : '';
						});
					}
					catch (problem) { console.log("failed"); }
				}
				this.loadCallback(undefined, data, undefined);
			}).catch(problem => {
				this.loadCallback(problem, undefined, undefined);
			});

	}

	/**
	 * download bundle file after filter the UserPdf and set the naming pattern
	 * all search results are structured according to the naming pattern and downloaded as zip file.
	 * first and second patterns are for directory and third naming pattern is for pdf file name. 
	 * if pattern1 is "order.project.name", pattern2 is "user.client_number", pattern3 is "pdf_name", 
	 * then you would create a root directory from the property users_pdf.order.project.name, 
	 * inside of that create a directory from the property users_pdf.user.client_number, 
	 * and in that create a file name users_pdf.pdf_name with a ".pdf" suffix.
	 * after that zip all of them and download as bundle file.
	 */
	downloadBundle = (pattern1: string, pattern2: string, pattern3: string) => {

		const filters = this.state.filters;
		const patterns = pattern1 + ',' + pattern2 + ',' + pattern3;

		if (this.config && filters && this.state.items.length > 0) {
			let api = new FundscraperApi.DefaultApi(this.config);

			api.userPdfApiDownloadBundle(filters, patterns, {
				headers: { 'Authorization': 'Bearer ' + this.config.accessToken }
			}).then((data: Blob) => {
				let url = window.URL.createObjectURL(data);
				let a = document.createElement('a');
				a.style.display = 'none';
				a.href = url;
				a.download = 'bundle.zip';
				document.body.appendChild(a);
				a.click();
				window.URL.revokeObjectURL(url);
				return data;
			}).catch(problem => {
				console.log('callApi failed call');
			});
		}
	}

}

Files.contextType = UserContext;

export default Files;