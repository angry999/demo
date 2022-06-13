import React from "react";
import OrderHeader from './OrderHeader';
import OrderSubscriberDocuments from './OrderSubscriberDocuments';
import OrderPurchaseDocuments from './OrderPurchaseDocuments';
import { Typography } from '@material-ui/core';
import UserContext from '../../UserContext';
import { ApiLoadableComponent, IApiLoadableComponent_Props, IApiLoadableComponent_State } from '../../basePages/ApiLoadableComponent';
import * as FundscraperApi from "../../tsapi/api"
import { Configuration } from "../../tsapi/configuration";
import { InvestmentOrder } from "../../tsapi/api";

/**
 * component for showing a single order
 */

/**
* Styles
*/
const infoTab: React.CSSProperties = {
	'marginBottom': '20px',
}

const tabTitle: React.CSSProperties = {
	'paddingTop': '40px',
	'paddingBottom': '20px',
	'fontSize': '1.3rem',
	'color': '#122055'
}

interface IProps extends IApiLoadableComponent_Props {
	match: any;
}

interface IState extends IApiLoadableComponent_State<InvestmentOrder> {
}

/**
 * component for showing a single order
 */
class Order extends ApiLoadableComponent<InvestmentOrder, IProps, IState>
{
	/**
	 * make the api call to get the order
	 */
	callApi(config: Configuration) {
		let api = new FundscraperApi.DefaultApi(config);
		api.investmentOrderApiFindAllByFilter('id eq ' + this.props.match.params.id, 'user, project, user.pdfs', undefined, undefined, undefined, {
			headers: { 'Authorization': 'Bearer ' + config.accessToken }
		}).then((data: InvestmentOrder[]) => {
			this.loadCallback(undefined, data[0], undefined);
		});
	}

	/**
	 * render the data that has successfully loaded
	 */
	renderData() {
		let order = this.state.data as InvestmentOrder;
		return (
			<div>
				<div style={infoTab}>
					<OrderHeader order={order} />
				</div>

				<div style={infoTab}>
					<Typography style={tabTitle}>Subscriber Documents</Typography>
					<OrderSubscriberDocuments order={order} />
				</div>

				<div style={infoTab}>
					<Typography style={tabTitle}>Purchase Order Documents</Typography>
					<OrderPurchaseDocuments order={order} />
				</div>
			</div>
		);
	}
}

Order.contextType = UserContext;

export default Order;
