import React from "react";
import { Link } from "react-router-dom";
import Environment from '../Environment';
import Button from '@material-ui/core/Button';
import ArchiveIcon from '@material-ui/icons/Archive';
import UserContext from '../UserContext';
import { ApiLoadableList, IApiLoadableList_Props, IApiLoadableList_State } from '../basePages/ApiLoadableList';
import Typography from '@material-ui/core/Typography';
import * as FundscraperApi from "../tsapi/api"
import { Configuration } from "../tsapi/configuration";
import { Project } from "../tsapi/api";
import { ProjectStage_friendlyText } from 'fundscraper-model-enums';
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

/**
 * column layout
 */
const columns = [
	{
		id: 'name', label: 'Name', sortable: true, minWidth: 100, format: function (table: any, row: any) {
			return (<div><Link style={textLink} to={`/project/${row['id']}`}><Typography style={nameTxt} variant="body2">{row['first_name']} {row['name']}</Typography></Link>
			</div>
			);
		}
	},
	{
		id: 'offering_amount', label: 'Offering Amount', sortable: true, align: 'right', minWidth: 50, format: function (table: any, row: any) {
			let value = table.valueForProperty(row, 'offering_amount');
			let result = value.toLocaleString(undefined, { minimumFractionDigits: 0 });
			return '$' + result;
		}
	},
	{ id: 'annual_irr', label: 'Annual IRR', sortable: true, minWidth: 50 },
	{
		id: 'min_amount', label: 'Minimum', sortable: true, align: 'right', minWidth: 50, format: function (table: any, row: any) {
			let share_price = table.valueForProperty(row, 'share_price');
			let min_share = table.valueForProperty(row, 'min_share');
			let min = share_price * min_share;
			let result = min.toLocaleString(undefined, { minimumFractionDigits: 0 });
			return '$' + result;
		}
	},
	{
		id: 'project_stage', label: 'Status', sortable: true, minWidth: 50, format: function (table: any, row: any) {
			let value = ProjectStage_friendlyText[table.valueForProperty(row, 'project_stage')];
			return value;
		}
	},
	{
		id: 'view_counts', label: 'Views', sortable: true, align: 'right', minWidth: 50, format: function (table: any, row: any) {
			let value = table.valueForProperty(row, 'view_counts');
			let result = value.toLocaleString(undefined, { minimumFractionDigits: 0 });
			return result;
		}
	},
	{
		id: 'documents', label: 'Documents', sortable: false, minWidth: 50, format: function (table: any, row: any) {
			let projectId = table.valueForProperty(row, 'id');
			let md5ProjectId = md5(`${projectId}`);
			let docUrlLink = `${Environment.website_base_url}/download?project-docs=${md5ProjectId}&access_token=${table.context.token}`;
			return (
				<a style={textLink} href={docUrlLink} title="Download all" rel="noopener noreferrer" target="_blank"><ArchiveIcon /></a>
			);
		}
	},
	{
		id: 'view', label: 'Actions', sortable: false, minWidth: 50, format: function (table: any, row: any) {
			return (
				<Link style={textLink} to={`/project/${row['id']}`}>
					<Button style={viewButton} variant="contained">
						View
					</Button>
				</Link>
			);
		}
	},
];

/**
 * component for displaying projects
 */
class Projects extends ApiLoadableList<Project, IApiLoadableList_Props, IApiLoadableList_State<Project>>
{
	/**
	 * create the component and set default values into the state
	 */
	constructor(props: IApiLoadableList_Props) {
		super(props, columns);
	}

	/**
	 * make the api call to get the projects
	 */
	callApi(config: Configuration, newSearchTerm: string, newPage: number, newPageSize: number, newSortBy: string, newSortOrder: 'asc' | 'desc' | undefined) {
		let filter = 'is_deleted eq 0';
		if (newSearchTerm !== '' && newSearchTerm !== undefined && newSearchTerm !== null)
			filter += ' and name like "%' + newSearchTerm + '%")';
		let orderBy = '';
		if (newSortBy != null && newSortBy !== '') {
			orderBy = newSortBy;
			if (newSortOrder === 'desc')
				orderBy += ' desc';
		}
		let api = new FundscraperApi.DefaultApi(config);
		api.projectApiFindAllByFilter(filter, 'pdfs', orderBy, newPage + 1, newPageSize, {
			headers: { 'Authorization': 'Bearer ' + config.accessToken }
		}).then((data: Project[]) => {
			console.log('callApi successful call');
			this.loadCallback(undefined, data, undefined);
		}).catch(problem => {
			console.log('callApi failed call');
			this.loadCallback(problem, undefined, undefined);
		});
	}
}

Projects.contextType = UserContext;

export default Projects;
