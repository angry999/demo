import React from "react";
import Paper from '@material-ui/core/Paper';
import UserContext from '../../UserContext';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import EnhancedTableHeader from '../../widgets/EnhancedTableHeader';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import ObjectBasedComponent from '../../basePages/ObjectBasedComponent';
import { InvestmentOrderStatus_friendlyText } from 'fundscraper-model-enums';
import { InvestmentOrder } from '../../tsapi/api';

/**
 * styles
 */
const textLink: React.CSSProperties = {
	'textDecoration': 'none',
};
const viewButton: React.CSSProperties = {
	'fontSize': '0.7rem',
	'color': '#3A74B9',
	'borderRadius': '2px',
	'backgroundColor': '#ffffff',
	'border': '1px solid #3A74B9',
	'boxShadow': 'none'
};

const tagOrders: React.CSSProperties = {
	'fontSize': '0.7rem',
	'textTransform': 'uppercase',
	'color': '#ffffff',
	'background': '#969696',
	'textAlign': 'center',
	'borderRadius': '2px'
};

const dateTxt: React.CSSProperties = {
	'fontSize': '0.7rem',
};

const container: React.CSSProperties = {
	maxHeight: 800,
}

const filler: React.CSSProperties = {
	flexGrow: 1,
	width: '100%',
}

/**
 * column layout
 */
const columns = [
	{ id: 'order_no', label: 'Order Number', sortable: true, minWidth: 50 },
	{
		id: 'total_amount', label: 'Total Amount', sortable: true, align: 'right', minWidth: 50, format: function (table: any, row: any) {
			let val = table.valueForProperty(row, 'total_amount');
			let result = val.toLocaleString(undefined, { minimumFractionDigits: 2 });
			return "$" + result;
		}
	},
	{
		id: 'status', label: 'Status', sortable: true, minWidth: 50, format: function (table: any, row: any) {
			let val = table.valueForProperty(row, 'status');
			if (val === null || val === undefined)
				return null;
			return <div style={tagOrders}>{InvestmentOrderStatus_friendlyText[val]}</div>
		}
	},
	{
		id: 'order_date', label: 'Date', sortable: true, minWidth: 50, format: function (table: any, row: any) {
			let val = table.valueForProperty(row, 'order_date');
			if (val === null || val === undefined)
				return null;
			let asDate = new Date(val);
			let result = asDate.toLocaleString();
			return <Typography style={dateTxt}>{result}</Typography>;
		}
	},
	{
		id: 'view', label: 'Actions', sortable: false, minWidth: 50, format: function (table: any, row: any) {
			return (
				<Button style={viewButton} variant="contained">
					<Link style={textLink} to={`/order/${row['id']}`}>View</Link>
				</Button>
			);
		}
	},
];


interface IProps {
	orders: InvestmentOrder[]
}

interface IState {
	items: any
	, sortOrder?: 'asc' | 'desc' | undefined
	, sortBy?: string
}

/**
 *
 */
class InvestorOrders extends ObjectBasedComponent<IProps, IState>
{
	columns: any;
	title: string;
	handleRequestSort: any;

	/**
	 * create the component and set default values into the state
	 */
	constructor(props: IProps) {
		super(props);
		this.columns = columns;
		this.title = 'Other Orders';
		this.state = {
			items: props.orders
		};
	}

	render() {
		let rowId = '';
		let cellId = '';
		return (
			<div>
				<Paper>
					<Toolbar>
						<Typography style={filler} >{this.title}</Typography>
					</Toolbar>
					<TableContainer style={container}>
						<Table stickyHeader size="small" aria-label="sticky table">
							<EnhancedTableHeader
								headCells={this.columns}
								order={this.state.sortOrder}
								orderBy={this.state.sortBy}
								onRequestSort={this.handleRequestSort}
							/>
							<TableBody>
								{this.state.items.map((row: any) => {
									rowId = 'row_' + row.id;
									return (
										<TableRow key={row.id} hover role="checkbox" tabIndex={-1} id={rowId}>
											{this.columns.map((column: any) => {
												cellId = column.id + '_' + row.id;
												return (
													<TableCell key={column.id} align={column.align} id={cellId}>
														{
															column.format ? column.format(this, row) : this.valueForProperty(row, column.id)
														}
													</TableCell>);
											})}
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
			</div>);
	}
}

InvestorOrders.contextType = UserContext;

export default InvestorOrders;
