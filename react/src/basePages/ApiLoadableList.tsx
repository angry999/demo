import React from "react";
import { Redirect } from "react-router-dom";
import Environment from '../Environment';
import { Checkbox, CircularProgress, Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, TextField, Toolbar, Typography } from '@material-ui/core';
import { MoreVert as MoreVertIcon, Search as SearchIcon } from '@material-ui/icons';
import EnhancedTableHeader from '../widgets/EnhancedTableHeader';
import UserContext from '../UserContext';
import ObjectBasedComponent from './ObjectBasedComponent';
import { authProvider } from '../react-azure-adb2c';
import { Configuration } from "../tsapi/configuration";

/**
 * styles
 */
const container: React.CSSProperties = {
	maxHeight: 800,
}

const filler: React.CSSProperties = {
	flexGrow: 1,
	width: '100%',
}

const inputRoot: React.CSSProperties = {
	paddingLeft: '4px'
}

export interface IApiLoadableList_Props {
}

export interface IApiLoadableList_State<T> {
	page: number
	, pageSize: number
	, sortOrder: 'asc' | 'desc' | undefined
	, sortBy: string
	, itemCount: number
	, searchTerm: string
	, loading: boolean
	, loadError: boolean
	, loadErrorMessage: string
	, searchEnabled: any
	, showSelector: any
	, selected: any
	, items: T[]
}

/**
 * base point of inheritence for components that have to make an api call to load their data
 */
export abstract class ApiLoadableList<T, P extends IApiLoadableList_Props, S extends IApiLoadableList_State<T>> extends ObjectBasedComponent<P, S> {
	/**
	 * the textual prefix for the DOM id of the per row check boxes
	 */
	rowCheckPrefix = 'rowCheckid-';

	columns: any;
	title: string;

	/**
	 * create the component and set default values into the state
	 * @param array props the react component properties
	 * @param array columns the column layout
	 * @param array title the text to display as a title
	 * @param array doSearch if true, show the search box
	 * @param array showSelector if true, show a check box as the first column for selecting columns 
	 */
	constructor(props: P, columns: any, title = '', doSearch = true, showSelector = false) {
		super(props);
		this.columns = columns;
		this.title = title;
		this.state = {
			page: 0
			, pageSize: 10
			, sortOrder: 'desc'
			, sortBy: ''
			, itemCount: -1
			, searchTerm: ''
			, loading: true
			, loadError: false
			, loadErrorMessage: ''
			, searchEnabled: doSearch
			, showSelector: showSelector
			, items: [] as T[]
			, selected: []
		} as S;
		this.search = this.search.bind(this);
		this.updateSearchTerm = this.updateSearchTerm.bind(this);
		console.log(`ApiLoadableList props ${JSON.stringify(this.props)}`);
	}

	/**
	 * handle the component mounting for the first time. we just trigger the loading of the data
	 */
	componentDidMount() {
		console.log('componentDidMount');
		this.loadData(this.state.searchTerm, this.state.page, this.state.pageSize, this.state.sortBy, this.state.sortOrder);
	}

	abstract callApi(config: Configuration, newSearchTerm: string, newPage: number, newPageSize: number, newSortBy: string, newSortOrder: 'asc' | 'desc' | undefined): void;

	/**
	 * get all of the objects for the current state
	 */
	loadData(newSearchTerm: string, newPage: number, newPageSize: number, newSortBy: string, newSortOrder: 'asc' | 'desc' | undefined) {
		console.log('loadData(' + newSearchTerm + ', ' + newPage + ', ' + newPageSize + ', ' + newSortBy + ', ' + newSortOrder + ')');

		authProvider.getIdToken().then((token) => {
			let config = new Configuration({ basePath: Environment.api_base_url, accessToken: token.idToken.rawIdToken });
			this.setState({ loading: true, searchTerm: newSearchTerm, page: newPage, pageSize: newPageSize, sortOrder: newSortOrder, sortBy: newSortBy, itemCount: -1, items: [{}] as T[], selected: [] });
			try {
				this.callApi(config, newSearchTerm, newPage, newPageSize, newSortBy, newSortOrder);
			}
			catch (problem) {
				console.log('loadData failed ' + problem);
				this.setState({ loading: false, loadError: true, loadErrorMessage: 'Unknown', itemCount: -1, items: [{}] as T[] });
			}
		});
	}

	/**
	 * handle the return of the load
	 * @param string error text describing the error that has occured if any
	 * @param object data the result of the call to get data
	 * @param response error the object that describes an error that occured if any
	 */
	loadCallback(error: any, data: T[] | undefined, response: any) {
		console.log('loadCallback');
		if (data != null && data.length >= 0) {
			console.log('loadData ok with ' + data.length + ' rows as a result');
			let newItemCount = (data.length < this.state.pageSize) ? this.state.page * this.state.pageSize + data.length : -1;
			this.setState({ loading: false, itemCount: newItemCount, items: data });
		}
		else if (response instanceof Error) {
			console.log('loadData failed ' + error);
			this.setState({ loading: false, loadError: true, loadErrorMessage: error, itemCount: -1, items: [{}] as T[] });
		}
		else {
			console.log('loadData failed ');
			this.setState({ loading: false, loadError: true, loadErrorMessage: 'Unknown', itemCount: -1, items: [{}] as T[] });
		}
	}

	/**
	 * handle the user changing the sorting in the paging component
	 */
	handleRequestSort = (event: any, property: string) => {
		let newOrder = (this.state.sortBy === property) ?
			(this.state.sortOrder === 'asc') ? 'desc' : 'asc'
			: 'asc' as ('asc' | 'desc' | undefined);
		console.log('handleRequestSort');
		this.loadData(this.state.searchTerm, 0, this.state.pageSize, property, newOrder);
	};

	/**
	 * handle the user changing the current page in the pagination component
	 */
	handleChangePage = (event: any, newPage: number) => {
		this.loadData(this.state.searchTerm, newPage, this.state.pageSize, this.state.sortBy, this.state.sortOrder);
	};

	/**
	 * handle the user making a change to the rows per page field in the pagination component
	 */
	handleChangeRowsPerPage = (event: { target: { value: string; }; }) => {
		this.loadData(this.state.searchTerm, 0, parseInt(event.target.value, 10), this.state.sortBy, this.state.sortOrder);
	};

	/**
	 * set whether or not a given row is selected
	 * @param rowId the id of the row that the selection is for
	 * @param checked true if the row should be selected 
	 */
	setChecked(rowId: number, checked: boolean) {
		if (checked) {
			if (!this.state.selected.includes(rowId)) {
				const myClonedArray = Object.assign([], this.state.selected);
				myClonedArray.push(rowId);
				this.setState({ selected: myClonedArray });
			}
		}
		else {
			var index = this.state.selected.indexOf(rowId);
			if (index > -1) {
				const myClonedArray = Object.assign([], this.state.selected);
				myClonedArray.splice(index, 1);
				this.setState({ selected: myClonedArray });
			}
		}
	}

	/**
	 * handle one of the selection boxes changing
	 */
	handleSelect = (event: { target: { id: any; checked: boolean; }; }) => {
		let elementId = event.target.id;
		let objectId = elementId.substr(this.rowCheckPrefix.length);
		this.setChecked(objectId, event.target.checked);
	};

	/**
	 * retry the loading of the data
	 */
	retry() {
		this.loadData(this.state.searchTerm, this.state.page, this.state.pageSize, this.state.sortBy, this.state.sortOrder);
	}

	/**
	 * execute a search
	 */
	search() {
		console.log('search ' + this.state.searchTerm);
		this.loadData(this.state.searchTerm, this.state.page, this.state.pageSize, this.state.sortBy, this.state.sortOrder);
	}

	/**
	 * update the term to search by
	 */
	updateSearchTerm(evt: any) {
		this.setState({ searchTerm: evt.target.value });
	}

	/**
	 * allow derivations to insert custom pieces on the searching portion of the toolbar by overriding this
	 */
	customSearch() {
		return;
	}

	/**
	 * allow derivations to insert custom pieces on the toolbar by overriding this
	 */
	customTool() {
		return;
	}

	/**
	 * render the component. this base class handles rendering the state where the data is loading and where there has been an
	 * error in loading. the componennt implementation needs to override renderData() to complete this
	 */
	render() {
		let user_context = this.context;
		if (user_context.no_access === true)
			return <Redirect to='/noAccess' />

		if (this.state.loading === true)
			return (
				<Container>
					<CircularProgress />
				</Container>
			);

		if (this.state.loadError === true)
			return (
				<Container>
					<p>Error loading data</p>
					<p>Message: {this.state.loadErrorMessage}</p>
					<button onClick={this.retry.bind(this)}>
						Retry
					</button>
				</Container>
			);

		let rowId = '';
		let cellId = '';
		return (
			<Paper>
				<Toolbar>
					<Typography id={this.title + "_header"} style={filler} >{this.title}</Typography>
					{this.customSearch()}
					<TextField
						id={this.title + "_search_field"}
						label="Search"
						placeholder="Search…"
						style={inputRoot}
						inputProps={{ 'aria-label': 'search' }}
						onChange={this.updateSearchTerm}
						disabled={!this.state.searchEnabled}
						value={this.state.searchTerm}
					/>
					<IconButton id={this.title + "_search_button"} disabled={!this.state.searchEnabled} onClick={this.search}><SearchIcon /></IconButton>
					{this.customTool()}
					<IconButton><MoreVertIcon /></IconButton>
				</Toolbar>
				<TableContainer style={container}>
					<Table id={this.title + "_table"} stickyHeader size="small" aria-label="sticky table">
						<EnhancedTableHeader
							headCells={this.columns}
							order={this.state.sortOrder}
							orderBy={this.state.sortBy}
							onRequestSort={this.handleRequestSort}
							showRowSelector={this.state.showSelector}
						/>
						<TableBody id={this.title + "_tableBody"}>
							{this.state.items.map((row: any) => {
								rowId = 'row_' + row.id;
								const checkId = `${this.rowCheckPrefix}${row.id}`;
								return (
									<TableRow key={row.id} hover role="checkbox" tabIndex={-1} id={rowId}>
										{
											this.state.showSelector === true &&
											(<TableCell padding="checkbox">
												<Checkbox id={checkId} onChange={this.handleSelect} />
											</TableCell>)
										}
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
				<TablePagination
					id="pagination"
					rowsPerPageOptions={[10, 15, 20, 25, 50]}
					component="div"
					count={this.state.itemCount}
					rowsPerPage={this.state.pageSize}
					page={this.state.page}
					onChangePage={this.handleChangePage}
					onChangeRowsPerPage={this.handleChangeRowsPerPage}
					backIconButtonProps={{
						'id': 'paginationBack',
					}}
					nextIconButtonProps={{
						'id': 'paginationNext',
					}}
				/>
			</Paper>
		);
	}
}

ApiLoadableList.contextType = UserContext;

export default ApiLoadableList;
