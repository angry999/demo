import React, { Component } from "react";
import Environment from '../Environment';
import UserContext from '../UserContext';
var md5 = require('js-md5');

/**
 * styles
 */
const textLink: React.CSSProperties = {
	'textDecoration': 'none',
};

interface IProps {
	report: any
	, start_date?: any
	, end_date?: any
	, text?: string
	, title?: string
	, id?: string
}

interface IState {
}

/**
 *
 */
class ExcelReportLink extends Component<IProps, IState>
{
	render() {
		if (this.props.report === null || this.props.report === undefined)
			return '';

		let md5String = md5(`${this.props.report.id}`);
		let docUrlLink = `${Environment.website_base_url}/download?${this.props.report.type}=${md5String}`;

		if (this.props.start_date !== null && this.props.start_date !== undefined && this.props.start_date !== '')
			docUrlLink += '&start-date=' + this.props.start_date;

		if (this.props.end_date !== null && this.props.end_date !== undefined && this.props.end_date !== '')
			docUrlLink += '&end-date=' + this.props.end_date;

		if (this.context != null && this.context !== undefined)
			docUrlLink += '&access_token=' + this.context.token;

		let docUrlText = (this.props.text !== undefined) ? this.props.text : this.props.report.name;
		let title = (this.props.title !== undefined) ? this.props.title : '';
		let id = (this.props.id !== undefined) ? this.props.id : '';
		return (
			<a style={textLink} href={docUrlLink} title={title} rel="noopener noreferrer" target="_blank" id={id}> {docUrlText}</a>
		);
	}
}

ExcelReportLink.contextType = UserContext;

export default ExcelReportLink;
