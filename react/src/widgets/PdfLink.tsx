import React, { Component } from "react";
import Environment from '../Environment';
import UserContext from '../UserContext';
import SvgIcon from '@material-ui/core/SvgIcon';
import { UserPdf } from "../tsapi";
var md5 = require('js-md5');

/**
 * styles
 */
const textLink: React.CSSProperties = {
	'textDecoration': 'none',
};


function PdFIcon(props: any) {
	return (
		<SvgIcon {...props} viewBox="0 0 183.8 211.2">
			<path fill="#ED1C24" d="M118.9,168.8H135L116.8,190l-18.2,21.2L80.5,190l-18.2-21.2h16.1v-41.4h40.5V168.8z M18.2,74.2h-3v7.2h2.9
	c2.7,0,4.1-1.2,4.1-3.8C22.2,75.3,20.7,74.2,18.2,74.2z M53.3,82.7c0-5.6-1.7-8.5-6.2-8.5h-2.8v17.8H47
	C51.3,92.1,53.3,89.2,53.3,82.7z M183.8,64.9v135.3h-43.1v-20h23.1V64.9h-44.9V20H29.4v34.1h41.4c15.6,0,28.3,12.7,28.3,28.3v0
	c0,15.6-12.7,28.3-28.3,28.3H29.4v69.4H54v20H9.4v-89.4H0V54.1h9.4V0h109.5L183.8,64.9z M68.1,97.9h8V86.4h11.7v-6.1H76.1v-5.8h12.5
	v-6.1H68.1V97.9z M36.1,97.9h11.3c9.3,0,14.4-5.8,14.4-15.3c0-8.7-4.6-14.3-14.3-14.3H36.1V97.9z M19.4,68.3H7.1v29.6h8V87.3h3.7
	c6.7,0,11.5-3.2,11.5-9.6C30.4,71.4,25.3,68.3,19.4,68.3z"/>
		</SvgIcon>
	);
}

interface IProps {
	pdf?: UserPdf | null
	, text?: string
	, title?: string
	, id?: string
}

interface IState {
}

/**
 *
 */
class PdfLink extends Component<IProps, IState>
{
	render() {
		if (this.props.pdf == null)
			return '';

		let md5String = md5(`${this.props.pdf.id}`);
		let docUrlLink = `${Environment.website_base_url}/download?${this.props.pdf.pdf_type}=${md5String}`;
		if (this.context != null && this.context !== undefined)
			docUrlLink += '&access_token=' + this.context.token;

		let docUrlText = (this.props.text !== undefined) ? this.props.text : this.props.pdf.pdf_name;
		let title = (this.props.title !== undefined) ? this.props.title : '';
		let id = (this.props.pdf.id !== undefined) ? '' + this.props.pdf.id : '';
		return (
			<a key={id} style={textLink} href={docUrlLink} title={title} rel="noopener noreferrer" target="_blank"><PdFIcon /> {docUrlText}</a>
		);
	}
}

PdfLink.contextType = UserContext;

export default PdfLink;
