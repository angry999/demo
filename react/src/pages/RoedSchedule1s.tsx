import React from "react";
import { Link, NavLink, Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button';
import UserContext from '../UserContext';
import { ApiLoadableList } from '../basePages/ApiLoadableList';
import Typography from '@material-ui/core/Typography';
import * as FundscraperApi from "../tsapi/api"
import { Configuration } from "../tsapi/configuration";
import { RoedSchedule1 } from "../tsapi/api";
import { RoedSchedule1State_friendlyText } from 'fundscraper-model-enums';
import { IApiLoadableDataTable_Props, IApiLoadableDataTable_State } from "../basePages/ApiLoadableDataTable";
import { IconButton, Tooltip, withStyles } from "@material-ui/core";
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
			return (<div><Link style={textLink} to={`/roed/${row['id']}`}><Typography style={nameTxt} variant="body2">{row['name']}</Typography></Link>
			</div>
			);
		}
	},
	{
		id: 'status', label: 'Status', sortable: true, minWidth: 50, format: function (table: any, row: any) {
			let value = RoedSchedule1State_friendlyText[table.valueForProperty(row, 'status')];
			return value;
		}
	},
	{
		id: 'view', label: 'Actions', sortable: false, minWidth: 50, format: function (table: any, row: any) {
			return (
				<Link style={textLink} to={`/roed/${row['id']}`}>
					<Button style={viewButton} variant="contained">
						View
					</Button>
				</Link>
			);
		}
	},
];

interface IProps extends IApiLoadableDataTable_Props {
	additional_filter?: string
	, project?: FundscraperApi.Project
	, classes: any
}

interface IState extends IApiLoadableDataTable_State<RoedSchedule1> {
}

/**
 * component for displaying projects
 */
class RoedSchedule1s extends ApiLoadableList<RoedSchedule1, IProps, IState>
{
	/**
	 * create the component and set default values into the state
	 */
	constructor(props: IProps) {
		super(props, columns);
	}

	/**
	 * allow derivations to insert custom pieces on the toolbar by overriding this
	 */
	customTool() {
		const { classes } = this.props;
		return <NavLink to={`/roed/0?project_id=${this.props.project?.id}`} className={classes.navLink}>
			<img alt='Create new' src='text-box-plus-outline.png'></img>
		</NavLink>
	}

	/**
	 * make the api call to get the projects
	 */
	callApi(config: Configuration, newSearchTerm: string, newPage: number, newPageSize: number, newSortBy: string, newSortOrder: 'asc' | 'desc' | undefined) {
		console.log(`callApi(additional=${this.props.additional_filter}, project=${JSON.stringify(this.props.project?.id)})`);
		let filter = `is_deleted eq 0`;
		if (this.props.additional_filter != null)
			filter += ` and ${this.props.additional_filter}`;
		if (this.props.project != null)
			filter += ` and project_id eq ${this.props.project.id}`;
		if (newSearchTerm !== '' && newSearchTerm !== undefined && newSearchTerm !== null)
			filter += ` and name like "%${newSearchTerm}%")`;
		let orderBy = '';
		if (newSortBy != null && newSortBy !== '') {
			orderBy = newSortBy;
			if (newSortOrder === 'desc')
				orderBy += ' desc';
		}
		let api = new FundscraperApi.DefaultApi(config);
		api.roedSchedule1ApiFindAllByFilter(filter, undefined, orderBy, newPage + 1, newPageSize, {
			headers: { 'Authorization': 'Bearer ' + config.accessToken }
		}).then((data: RoedSchedule1[]) => {
			console.log('callApi successful call');
			this.loadCallback(undefined, data, undefined);
		}).catch(problem => {
			console.log('callApi failed call');
			this.loadCallback(problem, undefined, undefined);
		});
	}
}

RoedSchedule1s.contextType = UserContext;

export default withStyles(
	{
		navLink: {
			textDecoration: 'none',
		},
		navIcon: {
			paddingRight: '5px',
		},
	}
	, { withTheme: true })(RoedSchedule1s);
