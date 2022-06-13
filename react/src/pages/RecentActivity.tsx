import React from "react";
import { Link } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import UserContext from '../UserContext';
import { ApiLoadableList, IApiLoadableList_Props, IApiLoadableList_State } from '../basePages/ApiLoadableList';
import { EventType_friendlyText } from 'fundscraper-model-enums';
import * as FundscraperApi from "../tsapi/api"
import { Configuration } from "../tsapi/configuration";
import { EventType } from 'fundscraper-model-enums';

/**
 * styles
 */
const textLink: React.CSSProperties = {
	'textDecoration': 'none',
};

const nameTxt: React.CSSProperties = {
	'color': '#5154D3',
	'fontSize': '0.9rem',
	'fontWeight': 500,
};

const orderTxt: React.CSSProperties = {
	'color': '#5154D3',
	'fontSize': '0.9rem',
	'fontWeight': 500,
};

const otherTxt: React.CSSProperties = {
	'color': '#5D5D5D',
	'fontSize': '0.7rem !important',
};

const dateTxt: React.CSSProperties = {
	'fontSize': '0.7rem',
};


/**
 * column layout
 * when
 * who (first initial, last name)
 * investor name (link to investor)
 * order number (link to order)
 * description
 */
const columns = [
	{
		id: 'when', label: 'When', sortable: true, minWidth: 50, format: function (table: any, row: any) {
			let val = row['createtime'];
			if (val == null)
				return null;
			let result = new Date(val).toLocaleString();
			return <Typography style={dateTxt}>{result}</Typography>;
		}
	},
	{
		id: 'by', label: 'User', sortable: false, minWidth: 50, format: function (table: any, row: any) {
			let first_name = table.valueForProperty(row, 'last_changed_by.first_name');
			let initial = first_name != null && first_name.length > 0 ? first_name.substring(0, 1) : '';
			let last_name = table.valueForProperty(row, 'last_changed_by.last_name');
			return (<Typography style={otherTxt} variant="caption" >{initial} {last_name}</Typography>
			);
		}
	},
	{
		id: 'investor', label: 'Investor', sortable: false, minWidth: 50, format: function (table: any, row: any) {
			let first_name = table.valueForProperty(row, 'user.first_name');
			let initial = first_name != null && first_name.length > 0 ? first_name.substring(0, 1) : '';
			let last_name = table.valueForProperty(row, 'user.last_name');
			return (<div><Link style={textLink} to={`/investor/${row['user_id']}`}>
				<Typography style={nameTxt} variant="caption" >{initial} {last_name}</Typography>
			</Link>
			</div>
			);
		}
	},
	{
		id: 'order', label: 'Order', sortable: false, minWidth: 50, format: function (table: any, row: any) {
			let orderNo = table.valueForProperty(row, 'investment_order.order_no');
			if (orderNo === '' || orderNo === undefined)
				orderNo = 'no number';
			return (<div><Link style={textLink} to={`/order/${row['investment_order_id']}`}>
				<Typography style={orderTxt} variant="caption" >{orderNo}</Typography>
			</Link>
			</div>
			);
		}
	},
	{
		id: 'description', label: 'Description', sortable: true, minWidth: 50, format: function (table: any, row: any) {
			let type = row['type'] as string;
			let description = '';
			if (type === EventType.kyc_done)
				description = 'KYC questions completed by investor';
			else if (type === EventType.level_chng)
				description = 'Accreditation level changed';
			else if (type === EventType.strt_invst)
				description = `Order started in ${table.valueForProperty(row, 'project.name')}`;
			else if (type === EventType.inv_cancel)
				description = `Order ${table.valueForProperty(row, 'investment_order.order_no')} cancelled`;
			else if (type === EventType.ivst_cnfrm)
				description = `Order ${table.valueForProperty(row, 'investment_order.order_no')} confirmed`;
			else if (type === EventType.trd_exectd)
				description = `Order ${table.valueForProperty(row, 'investment_order.order_no')} executed`;
			else if (type === EventType.esc_upd)
				description = `Order ${table.valueForProperty(row, 'investment_order.order_no')} escrow updated`;
			else if (type === EventType.inv_funded)
				description = `Order ${table.valueForProperty(row, 'investment_order.order_no')} funded`;
			else if (type === EventType.doc_upld)
				description = `User document ${table.valueForProperty(row, 'user_pdf.pdf_name')} uploaded`;
			else if (type === EventType.kyc_cnfrm)
				description = `User KYC confirmed`;
			else {
				Object.keys(EventType).forEach(element => {
					if (type === element)
						description = EventType_friendlyText[element];

				});
			}

			return (
				<Typography style={otherTxt} variant="caption" >{description}</Typography>
			);
		}
	},
];

/**
 * a list of recent activity that has occured
 */
class RecentActivity extends ApiLoadableList<FundscraperApi.Event, IApiLoadableList_Props, IApiLoadableList_State<FundscraperApi.Event>>
{
	/**
	 * create the component and set default values into the state
	 */
	constructor(props: IApiLoadableList_Props) {
		super(props, columns, 'Recent Activity', false);
	}

	/**
	 * make the api call to get the investors
	 */
	callApi(config: Configuration, newSearchTerm: string, newPage: number, newPageSize: number, newSortBy: string, newSortOrder: 'asc' | 'desc' | undefined) {
		let filter = `[type] in ("${EventType.kyc_done}", "${EventType.level_chng}", "${EventType.strt_invst}", "${EventType.inv_cancel}", "${EventType.ivst_cnfrm}", "${EventType.trd_exectd}", "${EventType.esc_upd}", "${EventType.inv_funded}", "${EventType.doc_upld}", "${EventType.kyc_cnfrm}")`;
		let orderBy = '';
		if (newSortBy !== null && newSortBy !== undefined && newSortBy !== '') {
			if (newSortBy === 'when')
				orderBy = 'createtime';
			else if (newSortBy === 'description')
				orderBy = 'type';
			else
				orderBy = newSortBy;
			if (newSortOrder === 'desc')
				orderBy += ' desc';
		}

		let api = new FundscraperApi.DefaultApi(config);
		api.eventApiFindAllByFilter(filter, 'last_changed_by, user, investment_order, project, user_pdf', orderBy, newPage + 1, newPageSize, {
			headers: { 'Authorization': 'Bearer ' + config.accessToken }
		}).then((data: FundscraperApi.Event[]) => {
			console.log('callApi successful call');
			this.loadCallback(undefined, data, undefined);
		}).catch(problem => {
			console.log('callApi failed call');
			this.loadCallback(problem, undefined, undefined);
		});
	}
}

RecentActivity.contextType = UserContext;

export default RecentActivity;
