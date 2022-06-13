import React, { Component } from "react";
import Environment from '../../Environment';
import UserContext from '../../UserContext';
import { Grid, Paper, Typography, Container } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { InvestmentOrderStatus_friendlyText } from 'fundscraper-model-enums';
import { Investor, InvestmentOrder } from '../../tsapi/api';
import * as FundscraperApi from "../../tsapi/api"

interface IProps {
	order: InvestmentOrder
}

interface IState {
	estTradeDate: any
}

/**
 * a header for an order
 */
class OrderHeader extends Component<IProps, IState>
{
	constructor(props: IProps) {
		super(props);
		this.state = {
			estTradeDate: this.props.order.estimated_trade_date
		};
	}

	/**
	 * handle the est trade date changing
	 */
	handleEstTradeDateChange = (date: any) => {
		let value = this.context;
		this.props.order.estimated_trade_date = date;
		fetch(Environment.website_base_url + '/api/InvestmentOrder/' + this.props.order.id + '?action=update',
			{
				method: 'POST',
				headers: new Headers({
					'Authorization': 'Bearer ' + value.token
				}),
				body: JSON.stringify(this.props.order)
			})
			.then((res) => {
				try {
					if (!res.ok) {
						if (res.status === 403)
							throw Error('You are not authorized to update to this order');
						throw new Error('The response was an http ' + res.status + ' and a message reading ' + res.statusText);
					}
					return res.json();
				}
				catch (error) {
				}
			})
			.then(results => {
				console.log('results ' + results);
				this.setState({ estTradeDate: date });
			}).catch((error) => {
				console.log('error ' + error);
			})
	};

	render() {
		let classes = (this.props as any).classes;
		//let context = this.context;
		let asCreateDate = new Date(this.props.order.createtime);
		let investor = this.props.order.user as Investor;
		let project = this.props.order.project;
		let createDate = asCreateDate.toLocaleString();
		let tradeDate = '-';
		if (this.props.order.trade_date !== null && this.props.order.trade_date !== undefined) {
			let asTradeDate = new Date(this.props.order.trade_date);
			tradeDate = asTradeDate.toLocaleString();
		}
		let amount = '$0.00';
		if (this.props.order.total_amount !== null && this.props.order.total_amount !== undefined)
			amount = '$' + this.props.order.total_amount.toLocaleString(undefined, { minimumFractionDigits: 2 });
		let status = '-';
		if (InvestmentOrderStatus_friendlyText[this.props.order.status] != null)
			status = InvestmentOrderStatus_friendlyText[this.props.order.status];
		return (
			<div>
				<Paper>
					<Container maxWidth={false}>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<Grid container spacing={3}>
								<Grid item xs={2} sm={2}>
									<Typography className={classes.nameTxt}>{investor.first_name} {investor.last_name}</Typography>
									<Typography className={classes.nameLbl}>Subscriber Name</Typography>
								</Grid>
								<Grid item xs={8} sm={10}>
									<Typography className={classes.nameTxt}>{this.props.order.order_no}</Typography>
									<Typography className={classes.nameLbl}>Order Number</Typography>
								</Grid>
								<Grid item xs={2} sm={2}>
									<Typography>{amount}</Typography>
									<Typography className={classes.nameLbl}>Amount</Typography>
								</Grid>
								<Grid item xs={2} sm={2}>
									<Typography>{createDate}</Typography>
									<Typography className={classes.nameLbl}>Date Placed</Typography>
								</Grid>
								<Grid item xs={2} sm={2}>
									<Typography className={classes.tag}>{status}</Typography>
									<Typography className={classes.nameLbl}>Status</Typography>
								</Grid>
								<Grid item xs={2} sm={2}>
									<KeyboardDatePicker
										disableToolbar
										variant="inline"
										format="MM/dd/yyyy"
										margin="none"
										id="est-trade-date"
										value={this.state.estTradeDate}
										onChange={this.handleEstTradeDateChange.bind(this)}
										KeyboardButtonProps={{ 'aria-label': 'change date' }}
									/>
									<Typography className={classes.nameLbl}>Est. Trade Date</Typography>
								</Grid>
								<Grid item xs={2} sm={2}>
									<Typography>{tradeDate}</Typography>
									<Typography className={classes.nameLbl}>Trade Date</Typography>
								</Grid>
								<Grid item xs={2} sm={2}>
									<Typography>{(project as FundscraperApi.Project).name}</Typography>
									<Typography className={classes.nameLbl}>Project Name</Typography>
								</Grid>
							</Grid>
						</MuiPickersUtilsProvider>
					</Container>
				</Paper>
			</div>
		);
	}
}

OrderHeader.contextType = UserContext;

export default withStyles({
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
	dateLabel: {
		marginTop: '0px'
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
	}
})(OrderHeader);
