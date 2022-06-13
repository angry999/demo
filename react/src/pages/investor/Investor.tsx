import React from "react";
import UserContext from '../../UserContext';
import InvestorHeader from './InvestorHeader';
import InvestorDocuments from './InvestorDocuments';
import InvestorOrders from './InvestorOrders';
import { ApiLoadableComponent, IApiLoadableComponent_Props, IApiLoadableComponent_State } from '../../basePages/ApiLoadableComponent';
import * as FundscraperApi from "../../tsapi/api"
import { InvestmentOrder } from "../../tsapi/api";
import { Configuration } from "../../tsapi/configuration";

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
	match: any
}

interface IState extends IApiLoadableComponent_State<FundscraperApi.Investor> {
	validOrders?: InvestmentOrder[]
	, oldestRelevantOrder?: InvestmentOrder
	, totalInvestedInLastYear?: number
	, annualInvestmentLimits?: number
}

class Investor extends ApiLoadableComponent<FundscraperApi.Investor, IProps, IState>
{
	/**
	 * make the api call to get the investor
	 */
	callApi(config: Configuration) {
		let api = new FundscraperApi.DefaultApi(config);
		api.investorApiFindAllByFilter('id eq ' + this.props.match.params.id, 'pdfs, orders', undefined, undefined, undefined, {
			headers: { 'Authorization': 'Bearer ' + config.accessToken }
		}).then((data: FundscraperApi.Investor[]) => {
			this.loadCallback(undefined, data[0], undefined);
		});

		api.investorApiGetAllNonDeletedOrders(this.props.match.params.id, {
			headers: { 'Authorization': 'Bearer ' + config.accessToken }
		}).then((data: any) => {
			this.setState({ validOrders: data });
		});

		api.investorApiGetOldestNonDeletedOrderLastYear(this.props.match.params.id, {
			headers: { 'Authorization': 'Bearer ' + config.accessToken }
		}).then((data: any) => {
			this.setState({ oldestRelevantOrder: data });
		});

		api.investorApiGetTotalAmountInvestedInLastYear(this.props.match.params.id, {
			headers: { 'Authorization': 'Bearer ' + config.accessToken }
		}).then((data: any) => {
			this.setState({ totalInvestedInLastYear: data });
		});

		api.investorApiGetAnnualInvestmentLimits(this.props.match.params.id, {
			headers: { 'Authorization': 'Bearer ' + config.accessToken }
		}).then((data: any) => {
			this.setState({ annualInvestmentLimits: data });
		});
	}

	/**
	 * render the data that has successfully loaded
	 */
	renderData() {
		let inv = this.state.data as FundscraperApi.Investor;
		let orders = (inv == null) ? [] : inv.orders;
		let validOrders = this.state.validOrders != undefined ? this.state.validOrders : new Array<InvestmentOrder>();
		let oldestRelevantOrder = this.state.oldestRelevantOrder;
		let totalInvestedInLastYear = this.state.totalInvestedInLastYear != undefined ? this.state.totalInvestedInLastYear : 0;
		let annualInvestmentLimits = this.state.annualInvestmentLimits != undefined ? this.state.annualInvestmentLimits : -1;
		return (
			<div>
				<div style={infoTab}>
					<InvestorHeader investor={inv} oldestRelevantOrder={oldestRelevantOrder} totalInvestedInLastYear={totalInvestedInLastYear} annualInvestmentLimits={annualInvestmentLimits}></InvestorHeader>
				</div>
				<div style={tabTitle}>Documents</div>
				<div style={infoTab}>
					<InvestorDocuments investor={inv}></InvestorDocuments>
				</div>
				<div style={tabTitle}>Other Orders</div>
				<div style={infoTab}>
					<InvestorOrders orders={validOrders}></InvestorOrders>
				</div>
			</div>

		);
	}
}

Investor.contextType = UserContext;

export default Investor;
