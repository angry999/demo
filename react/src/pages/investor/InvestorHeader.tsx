import React, { Component } from "react";
import UserContext from '../../UserContext';
import { Grid, Paper, Typography, Container } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Investor } from '../../tsapi/api';
import { InvestmentOrder } from "../../tsapi/api";
import { InvestorAccreditation_friendlyText } from "fundscraper-model-enums";

interface IProps {
	investor: Investor
	, oldestRelevantOrder?: InvestmentOrder|null
	, totalInvestedInLastYear: number
	, annualInvestmentLimits: number
}

interface IState {
}

/**
 *
 */
class InvestorHeader extends Component<IProps, IState>
{
	render() {
		console.log(this.props.investor)
		let classes = (this.props as any).classes;
		//let context = this.context;
		let address = this.props.investor.address;
		let level = this.props.investor.actual_investment_level != 0 ? InvestorAccreditation_friendlyText[this.props.investor.actual_investment_level] : 'Unknown';
		if (this.props.investor.apt_number !== null)
			address += ' ' + this.props.investor.apt_number;
		if (this.props.investor.zip !== null)
			address += ' ' + this.props.investor.zip;

		let hideInvestorLimits = this.props.annualInvestmentLimits >= 0 ? "" : "hidden";
		let nextInvDate = this.props.oldestRelevantOrder != null ? this.props.oldestRelevantOrder.order_date : new Date();
		
		if(!(nextInvDate instanceof Date))
			nextInvDate = new Date(nextInvDate);
		
		nextInvDate.setFullYear(nextInvDate.getFullYear() + 1);
		let formattedNextInvDate = nextInvDate.toLocaleString();
		let annualInvestmentLimits = this.props.annualInvestmentLimits;
		let totalInvestedInLastYear = this.props.totalInvestedInLastYear;
		let currentAvailableAmount = annualInvestmentLimits-totalInvestedInLastYear;
		let amountAvailableNext = this.props.oldestRelevantOrder != null ? currentAvailableAmount + this.props.oldestRelevantOrder.total_amount : currentAvailableAmount;

		return (
			<Paper>
				<Container maxWidth={false}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							{/* <Typography className={classes.nameTxt}>{this.props.investor.first_name} {this.props.investor.last_name} <div className={classes.usrTag}> {this.props.investor.actual_investment_level}</div></Typography> */}
							<Typography className={classes.nameTxt} id='investor_name'>{this.props.investor.first_name} {this.props.investor.last_name} <div className={classes.usrTag}> {level}</div></Typography>
							<Typography className={classes.nameLbl}>Investor Name</Typography>
						</Grid>
						<Grid item xs>
							<Typography className={classes.regTxt} id='investor_email'>{this.props.investor.email}</Typography>
							<Typography className={classes.nameLbl}>Email Address</Typography>
						</Grid>
						<Grid item xs>
							<Typography className={classes.regTxt} id='investor_phone'>{this.props.investor.phone}</Typography>
							<Typography className={classes.nameLbl}>Phone Number</Typography>
						</Grid>
						<Grid item xs>
							<Typography id='investor_client_no'>{this.props.investor.client_number}</Typography>
							<Typography className={classes.nameLbl}>Client Number</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography className={classes.regTxt} id='investor_address'>{address}</Typography>
							<Typography className={classes.nameLbl}>Address</Typography>
						</Grid>
						<Grid item></Grid>
						<Grid item className={hideInvestorLimits}>
							<Typography className={classes.nameLbl}>12 Months Projected Investment Limits</Typography>
							<Typography className={classes.regTxt}>Eligible Investor Limit: ${annualInvestmentLimits}</Typography>
							<Typography className={classes.regTxt}>Previously Invested in last 12 Months: ${totalInvestedInLastYear}</Typography>
							<Typography className={classes.regTxt}>Available Investment Room Prior to {formattedNextInvDate}: ${currentAvailableAmount}</Typography>
							<Typography className={classes.regTxt}>Available Investment Room After {formattedNextInvDate}: ${amountAvailableNext}</Typography>
						</Grid>
					</Grid>
				</Container>
			</Paper>
		);
	}
}

InvestorHeader.contextType = UserContext;

export default withStyles({
	mainContainer: {
		color: 'red'
	},
	nameTxt: {
		color: '#5154D3',
		fontSize: '1.1rem',
		fontWeight: 700,
		paddingTop: '20px'
	},
	nameLbl: {
		fontSize: '0.6rem',
		textTransform: 'uppercase',
		color: '#7E7E7E',
		paddingTop: '5px'
	},
	tag: {
		fontSize: '0.6rem',
		fontWeight: 600,
		textAlign: 'center',
		background: '#7e7e7e',
		padding: '3px 0px',
		maxWidth: '90px',
		borderRadius: '2px',
		letterSpacing: '2px',
		color: '#ffffff',
		textTransform: 'uppercase',
	},
	usrTag: {
		fontSize: '0.7rem',
		textTransform: 'uppercase',
		color: '#ffffff',
		background: '#969696',
		textAlign: 'center',
		borderRadius: '2px',
		padding: '1px 10px',
		maxWidth: '150px',
		display: 'inline-block',
		marginLeft: '30px'
	},
	usrAi: {
		background: '#31486D',
	},
	usrPc: {
		background: '#122055',
	},
	usrEi: {
		background: '#506E84',
	},
	usrIi: {
		background: '#6F919B',
	},
	regTxt: {
		color: '#122055',
		fontWeight: 400,
		fontSize: '1rem'
	}

})(InvestorHeader);
