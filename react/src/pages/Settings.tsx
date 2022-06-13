import React from "react";
import {
	Grid,
	FormControl,
	FormLabel,
	FormGroup,
	FormControlLabel,
	Switch,
	RadioGroup,
	Box
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Theme } from "@material-ui/core/styles";
import { Radio } from "@material-ui/core";
import { ApiLoadableComponent, IApiLoadableComponent_Props, IApiLoadableComponent_State } from "../basePages/ApiLoadableComponent";
import * as FundscraperApi from "../tsapi/api";
import { Configuration } from "../tsapi/configuration";
import UserContext from "../UserContext";
import Dashboard from "./dashboard/Dashboard";

interface IProps extends IApiLoadableComponent_Props {
}

interface IState extends IApiLoadableComponent_State<FundscraperApi.AllUser> {
	data: any
}

class Settings extends ApiLoadableComponent<FundscraperApi.AllUser, IProps, IState> {
	/**
	 * the configuration to use for the api
	 */
	apiConfig?: Configuration;

	/**
	 * make the api call to get the project
	 */
	callApi(config: Configuration) {
		this.apiConfig = config;
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
			if (preferences.tile_users === undefined)
				preferences.tile_users = true;
			if (preferences.tile_orders === undefined)
				preferences.tile_orders = true;
			if (preferences.tile_projects === undefined)
				preferences.tile_projects = true;
			if (preferences.tile_capital_raised === undefined)
				preferences.tile_capital_raised = true;
			if (preferences.row1_charts === undefined)
				preferences.row1_charts = '1';
			if (preferences.row2_charts === undefined)
				preferences.row2_charts = '2';
			if (preferences.row3_charts === undefined)
				preferences.row3_charts = '2';
			this.loadCallback(undefined, preferences, undefined);
		});
	}

	/**
	 * update the preferences on the server
	 */
	async updatePreferences() {
		// TODO: this needs to check the token before the call, much like callApi
		let api = new FundscraperApi.DefaultApi(this.apiConfig);
		let user_id = this.context != null && this.context.user != null ? this.context.user.id : 0;
		let token = this.apiConfig == null ? null : this.apiConfig.accessToken;
		let preference = { name: Dashboard.preferenceName, value: JSON.stringify(this.state.data) };
		api.allUserApiSetPreference(preference, user_id, {
			headers: { 'Authorization': 'Bearer ' + token }
		}).then((data: any) => {
			// nothing
		});
	}

	/**
	 * handle the users switch changing
	 */
	async handleTileChange(event: any) {
		let preferences = this.state.data;
		console.log(`initial preferences = ${JSON.stringify(this.state)}`);
		preferences[event.target.name] = event.target.checked;
		console.log(`updated preferences = ${JSON.stringify(this.state)}`);
		this.setState({ data: preferences });
		await this.updatePreferences();
	}

	/**
	 * handle the users switch changing
	 */
	async handleRowLayoutChange(event: any) {
		let preferences = this.state.data;
		console.log(`radio ${event.target.name} = ${event.target.value}`);
		preferences[event.target.name] = event.target.value;
		this.setState({ data: preferences });
		//console.log(JSON.stringify(this.state));
		await this.updatePreferences();
	}

	renderData() {
		let classes = (this.props as any).classes;
		//user_context.user.preferences_as_json
		return (
			<FormControl component="fieldset">
				<Grid item xs={12} spacing={3}>
					<Grid item>
						<Typography variant="h3">
							User Settings
							</Typography>
					</Grid>
					<Grid container item spacing={2}>
						<Grid item xs={12}>
							<Typography variant="h4" className={classes.h4}>
								<FormLabel component="legend">Dashboard tiles displayed</FormLabel>
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Box boxShadow={4} className={classes.formArea}>
								<FormGroup>
									<FormControlLabel
										control={<Switch checked={this.state.data.tile_users} onChange={this.handleTileChange.bind(this)} name="tile_users" />}
										label="User"
									/>
									<FormControlLabel
										control={<Switch checked={this.state.data.tile_orders} onChange={this.handleTileChange.bind(this)} name="tile_orders" />}
										label="Orders"
									/>
									<FormControlLabel
										control={<Switch checked={this.state.data.tile_projects} onChange={this.handleTileChange.bind(this)} name="tile_projects" />}
										label="Project"
									/>
									<FormControlLabel
										control={<Switch checked={this.state.data.tile_capital_raised} onChange={this.handleTileChange.bind(this)} name="tile_capital_raised" />}
										label="Dollars Raised"
									/>
								</FormGroup>
							</Box>
						</Grid>
					</Grid>
					<Grid container item spacing={2}>
						<Grid item xs={12}>
							<Typography variant="h4" className={classes.h4}>
								<FormLabel component="legend">Dashboard Chart Layout</FormLabel>
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Box boxShadow={4} className={classes.formArea}>
								<Grid container item xs={12}>
									<Typography variant="h5" className={classes.h5}>
										<FormLabel component="legend">Dashboard Chart Row 1 Layout</FormLabel>
									</Typography>
								</Grid>
								<RadioGroup defaultValue="two" aria-label="row1_charts" value={this.state.data.row1_charts} onChange={this.handleRowLayoutChange.bind(this)} name="row1_charts">
									<Grid container item xs={12}>
										<Grid item xs={3}>
											<FormControlLabel value="1" control={<Radio />} label="One" />
										</Grid>
										<Grid item xs={3}>
											<img src="/grid-1.png" alt="1 tile" className={classes.gridImage} />
										</Grid>
										<Grid item xs={3}>
											<FormControlLabel value="2" control={<Radio />} label="Two" />
										</Grid>
										<Grid item xs={3}>
											<img src="/grid-2.png" alt="2 tiles" className={classes.gridImage} />
										</Grid>
									</Grid>
								</RadioGroup>
								<Grid container item xs={12}>
									<Typography variant="h5" className={classes.h5}>
										<FormLabel component="legend">Dashboard Chart Row 2 Layout</FormLabel>
									</Typography>
								</Grid>
								<RadioGroup defaultValue="two" aria-label="row2_charts" value={this.state.data.row2_charts} onChange={this.handleRowLayoutChange.bind(this)} name="row2_charts">
									<Grid container item xs={12}>
										<Grid item xs={3}>
											<FormControlLabel value="1" control={<Radio />} label="One" />
										</Grid>
										<Grid item xs={3}>
											<img src="/grid-1.png" alt="1 tile" className={classes.gridImage} />
										</Grid>
										<Grid item xs={3}>
											<FormControlLabel value="2" control={<Radio />} label="Two" />
										</Grid>
										<Grid item xs={3}>
											<img src="/grid-2.png" alt="2 tiles" className={classes.gridImage} />
										</Grid>
									</Grid>
								</RadioGroup>
								<Grid container item xs={12}>
									<Typography variant="h5" className={classes.h5}>
										<FormLabel component="legend">Dashboard Chart Row 3 Layout</FormLabel>
									</Typography>
								</Grid>
								<RadioGroup defaultValue="two" aria-label="row3_charts" value={this.state.data.row3_charts} onChange={this.handleRowLayoutChange.bind(this)} name="row3_charts">
									<Grid container item xs={12}>
										<Grid item xs={3}>
											<FormControlLabel value="1" control={<Radio />} label="One" />
										</Grid>
										<Grid item xs={3}>
											<img src="/grid-1.png" alt="1 tile" className={classes.gridImage} />
										</Grid>
										<Grid item xs={3}>
											<FormControlLabel value="2" control={<Radio />} label="Two" />
										</Grid>
										<Grid item xs={3}>
											<img src="/grid-2.png" alt="2 tiles" className={classes.gridImage} />
										</Grid>
									</Grid>
								</RadioGroup>
							</Box>
						</Grid>
					</Grid>
				</Grid>
			</FormControl>
		);
	}
}
Settings.contextType = UserContext;

export default withStyles((theme: Theme) => ({
	formArea: {
		padding: theme.spacing(3),
	},
	h4: {
		fontSize: '1.2rem',
		padding: theme.spacing(2),
	},
	h5: {
		fontSize: '1.1rem',
		padding: theme.spacing(1),
	},
	gridImage: {
		paddingTop: '8px',
		width: '60px',
	},
	icon: {
		fontSize: '1rem',
		marginRight: '15px'
	},
}))(Settings);
