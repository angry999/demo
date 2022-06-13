import React, { Component } from "react";
import { Box, Grid } from "@material-ui/core";
import UserContext from '../../UserContext';
import InvestorsTile from "./InvestorsTile";
import OrdersTile from "./OrdersTile";
import ProjectsTile from "./ProjectsTile";
import CapitalRaisedTile from "./CapitalRaisedTile";
import GenericChart from "./GenericChart";
import ApiLoadableComponent, { IApiLoadableComponent_Props, IApiLoadableComponent_State } from "../../basePages/ApiLoadableComponent";
import * as FundscraperApi from "../../tsapi/api";
import { Configuration } from "../../tsapi/configuration";

interface IProps extends IApiLoadableComponent_Props {
}

interface IState extends IApiLoadableComponent_State<FundscraperApi.AllUser> {
	data: any
}

/**
 * 
 */
class Dashboard extends ApiLoadableComponent<FundscraperApi.AllUser, IProps, IState> {
	public static preferenceName = 'dashboard.layout';

	/**
	 * make the api call to get the project
	 */
	callApi(config: Configuration) {
		let api = new FundscraperApi.DefaultApi(config);
		let user_id = this.context != null && this.context.user != null ? this.context.user.id : 0;
		if (user_id == null || user_id === 0)
			return;
		//console.log(`Settings user context = ${JSON.stringify(this.context)}`);
		console.log(`getting preferences for ${user_id}`);
		api.allUserApiGetPreference(Dashboard.preferenceName, user_id, {
			headers: { 'Authorization': 'Bearer ' + config.accessToken }
		}).then(async (data: any) => {
			console.log(`received data as ${JSON.stringify(data)}`);
			let preferences = data.value != null && data.value !== '' ? JSON.parse(data.value) : {
				tile_users: true
				, tile_orders: true
				, tile_projects: true
				, tile_capital_raised: true
				, row1_charts: '1'
				, row2_charts: '2'
				, row3_charts: '2'
			};
			this.loadCallback(undefined, preferences, undefined);
		});
	}

	/**
	 * render the data that has successfully loaded
	 */
	renderData() {
		let investorsTile = (this.state.data.tile_users !== true) ? '' :
			<Grid item xs={3} sm={3}>
				<Box boxShadow={4} marginRight={2}>
					<InvestorsTile></InvestorsTile>
				</Box>
			</Grid>;
		let ordersTile = (this.state.data.tile_orders !== true) ? '' :
			<Grid item xs={3} sm={3}>
				<Box boxShadow={4} marginRight={2}>
					<OrdersTile></OrdersTile>
				</Box>
			</Grid>;
		let projectsTile = (this.state.data.tile_projects !== true) ? '' :
			<Grid item xs={3} sm={3}>
				<Box boxShadow={4} marginRight={2}>
					<ProjectsTile></ProjectsTile>
				</Box>
			</Grid>;
		let capitalTile = (this.state.data.tile_capital_raised !== true) ? '' :
			<Grid item xs={3} sm={3}>
				<Box boxShadow={4}>
					<CapitalRaisedTile></CapitalRaisedTile>
				</Box>
			</Grid>;

		let row1 = (this.state.data.row1_charts === '1') ?
			<Grid container>
				<Grid item xs={12} sm={12}>
					<Box boxShadow={4} marginTop={2}>
						<GenericChart preferenceName='dashboard.chart-1-1'></GenericChart>
					</Box>
				</Grid>
			</Grid>
			: <Grid container>
				<Grid item xs={6} sm={6}>
					<Box boxShadow={4} marginRight={2} marginTop={2}>
						<GenericChart preferenceName='dashboard.chart-1-1'></GenericChart>
					</Box>
				</Grid>
				<Grid item xs={6} sm={6}>
					<Box boxShadow={4} marginTop={2}>
						<GenericChart preferenceName='dashboard.chart-1-2'></GenericChart>
					</Box>
				</Grid>
			</Grid>;

		let row2 = (this.state.data.row2_charts === '1') ?
			<Grid container>
				<Grid item xs={12} sm={12}>
					<Box boxShadow={4} marginTop={2}>
						<GenericChart preferenceName='dashboard.chart-2-1'></GenericChart>
					</Box>
				</Grid>
			</Grid>
			: <Grid container>
				<Grid item xs={6} sm={6}>
					<Box boxShadow={4} marginRight={2} marginTop={2}>
						<GenericChart preferenceName='dashboard.chart-2-1'></GenericChart>
					</Box>
				</Grid>
				<Grid item xs={6} sm={6}>
					<Box boxShadow={4} marginTop={2}>
						<GenericChart preferenceName='dashboard.chart-2-2'></GenericChart>
					</Box>
				</Grid>
			</Grid>;

		let row3 = (this.state.data.row3_charts === '1') ?
			<Grid container>
				<Grid item xs={12} sm={12}>
					<Box boxShadow={4} marginTop={2}>
						<GenericChart preferenceName='dashboard.chart-3-1'></GenericChart>
					</Box>
				</Grid>
			</Grid>
			: <Grid container>
				<Grid item xs={6} sm={6}>
					<Box boxShadow={4} marginRight={2} marginTop={2}>
						<GenericChart preferenceName='dashboard.chart-3-1'></GenericChart>
					</Box>
				</Grid>
				<Grid item xs={6} sm={6}>
					<Box boxShadow={4} marginTop={2}>
						<GenericChart preferenceName='dashboard.chart-3-2'></GenericChart>
					</Box>
				</Grid>
			</Grid>;

		return (
			<Grid container>
				<Grid container item xs={12} sm={12}>
					{investorsTile}
					{ordersTile}
					{projectsTile}
					{capitalTile}
				</Grid>
				{row1}
				{row2}
				{row3}
			</Grid>
		);
	}
}
Dashboard.contextType = UserContext;

export default Dashboard;
