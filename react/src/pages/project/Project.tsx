import React from "react";
import ProjectHeader from './ProjectHeader';
import ProjectDocuments from './ProjectDocuments';
import UserContext from '../../UserContext';
import Orders from '../Orders';
import { ApiLoadableComponent, IApiLoadableComponent_Props, IApiLoadableComponent_State } from '../../basePages/ApiLoadableComponent';
import { Typography } from '@material-ui/core';
import * as FundscraperApi from "../../tsapi/api"
import { Configuration } from "../../tsapi/configuration";
import RoedSchedule1s from "../RoedSchedule1s";

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

interface IState extends IApiLoadableComponent_State<FundscraperApi.Project> {
	data: FundscraperApi.Project
}

/**
 * component for showing a single project
 */
class Project extends ApiLoadableComponent<FundscraperApi.Project, IProps, IState>
{
	/**
	 * make the api call to get the project
	 */
	callApi(config: Configuration) {
		let api = new FundscraperApi.DefaultApi(config);
		api.projectApiFindAllByFilter('id eq ' + this.props.match.params.id, 'pdfs', undefined, undefined, undefined, {
			headers: { 'Authorization': 'Bearer ' + config.accessToken }
		}).then((data: FundscraperApi.Project[]) => {
			this.loadCallback(undefined, data[0], undefined);
		});
	}

	/**
	 * render the data that has successfully loaded
	 */
	renderData() {
		let additional_filter = 'project_id eq ' + this.props.match.params.id;
		return (
			<div>
				<div style={infoTab}>
					<ProjectHeader project={this.state.data} />
				</div>
				<div style={infoTab}>
					<Typography style={tabTitle}>Project Specific Documents</Typography>
					<ProjectDocuments project={this.state.data} />
				</div>
				<div style={infoTab}>
					<Typography style={tabTitle}>ROED Schedule 1 Filings</Typography>
					<RoedSchedule1s project={this.state.data} />
				</div>
				<div style={infoTab}>
					<Orders additional_filter={additional_filter} />
				</div>
			</div>
		);
	}
}

Project.contextType = UserContext;

export default Project;
