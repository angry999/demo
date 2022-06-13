import React, { Component } from "react";
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import UserContext from '../UserContext';

const visuallyHidden: React.CSSProperties = {
	border: 0,
	clip: 'rect(0 0 0 0)',
	height: 1,
	margin: -1,
	overflow: 'hidden',
	padding: 0,
	position: 'absolute',
	top: 20,
	width: 1,
}

interface IProps {
	order?: 'asc' | 'desc' | undefined
	, headCells: any
	, orderBy?: string
	, showRowSelector?: boolean
	, onRequestSort?: any
}

interface IState {
	order:  'asc' | 'desc' | undefined
	, orderBy?: string
	, showRowSelector?: boolean
}

class EnhancedTableHeader extends Component<IProps, IState>
{
	constructor(props: IProps)
	{
		super(props);
		this.state = {
			order: this.props.order
			, orderBy: this.props.orderBy
			, showRowSelector: this.props.showRowSelector
		};
	}

	createSortHandler = (property: any) => (event: any) =>
	{
		this.props.onRequestSort(event, property);
	};

	render()
	{
		return (
			<TableHead>
				<TableRow key='header'>
					{
						this.state.showRowSelector === true &&                       
						(<TableCell padding="checkbox">
						</TableCell>)
					}
					{this.props.headCells.map((headCell: any) =>
						{
							if (headCell.sortable === true)
								return (
									<TableCell
										key={headCell.id}
										align={headCell.numeric ? 'right' : 'left'}
										padding={headCell.disablePadding ? 'none' : 'default'}
										sortDirection={this.state.orderBy === headCell.id ? this.state.order : false}>
										<TableSortLabel
												active={this.state.orderBy === headCell.id}
												direction={this.state.orderBy === headCell.id ? this.state.order : 'asc'}
												onClick={this.createSortHandler(headCell.id)}>
											{headCell.label}
												{this.state.orderBy === headCell.id ? (
												<span style={visuallyHidden}>
														{this.state.order === 'desc' ? 'sorted descending' : 'sorted ascending'}
												</span>
											) : null}
										</TableSortLabel>
									</TableCell>);


							return (
								<TableCell
									key={headCell.id}
									align={headCell.numeric ? 'right' : 'left'}
									padding={headCell.disablePadding ? 'none' : 'default'}>
									{headCell.label}
								</TableCell>);
						}
					)}
				</TableRow>
			</TableHead>
		);
	}
}

EnhancedTableHeader.contextType = UserContext;

export default EnhancedTableHeader;
