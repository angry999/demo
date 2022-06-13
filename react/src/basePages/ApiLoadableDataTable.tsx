import React from "react";
import MUIDataTable, { ExpandButton } from "mui-datatables";
import { Redirect } from "react-router-dom";
import Environment from '../Environment';
import { Button, CircularProgress, Container, Paper, TableRow, TableCell } from '@material-ui/core';
import UserContext from '../UserContext';
import ObjectBasedComponent from './ObjectBasedComponent';
import { authProvider } from '../react-azure-adb2c';
import { Configuration } from "../tsapi/configuration";

export interface IApiLoadableDataTable_Props {
	selectionListener?: any
	, selectionChangeListener?: any
	, show_expanded_rows?: boolean
	, expanded_rows_table?: any
}

export interface IApiLoadableDataTable_State<T> {
	page: number
	, pageSize: number
	, sortOrder: 'asc' | 'desc' | undefined
	, sortBy: string
	, itemCount: number
	, searchTerm: string
	, filterTerms: any
	, loading: boolean
	, loadError: boolean
	, loadErrorMessage: string
	, searchEnabled: any
	, showSelector: any
	, hiddenColumns: any
	// the complete list of objects that are selected across all pages
	, selected: any
	// the index of the rows in the current page that are selected
	, rowsSelected: any
	// the list of objects displayed in the current page
	, items: any
}

/**
 * wraps https://www.npmjs.com/package/mui-datatables
 */
export abstract class ApiLoadableDataTable<T, P extends IApiLoadableDataTable_Props, S extends IApiLoadableDataTable_State<T>> extends ObjectBasedComponent<P, S> {

	columns: any;
	title: string;
	customToolbar: any;
	downloadIcon: boolean;
	searchIcon: boolean;
	isTesting: boolean;

	/**
	 * create the component and set default values into the state
	 * @param array props the react component properties
	 * @param array columns the column layout
	 * @param array title the text to display as a title
	 * @param array doSearch if true, show the search box
	 * @param array showSelector if true, show a check box as the first column for selecting columns 
	 * @param array customToolbar custom component to be displayed in the toolbar
	 * @param array downloadIcon if true, show downloadIcon in toolbar
	 * @param array searchIcon if true, show searchIcon in toolbar
	 * @param array isTesting tempcode for unitTest. if true, remove the auth
	 */
	constructor(props: P, columns?: any, title = '', doSearch = true, showSelector = false, customToolbar?: any, downloadIcon = true, searchIcon = true, isTesting = false) {
		super(props);
		this.columns = columns;
		this.title = title;
		this.customToolbar = customToolbar;
		this.downloadIcon = downloadIcon;
		this.searchIcon = searchIcon;
		this.isTesting = isTesting;
		this.state = {
			page: 0
			, pageSize: 10
			, sortOrder: 'asc'
			, sortBy: ''
			, itemCount: -1
			, searchTerm: ''
			, filterTerms: new Array()
			, loading: true
			, loadError: false
			, loadErrorMessage: ''
			, searchEnabled: doSearch
			, showSelector: showSelector
			, items: new Array()
			, selected: new Array()
			, hiddenColumns: new Array()
		} as S;
	}

	setColumns(columns: any) {
		this.columns = columns;
	}

	/**
	 * set the customToolbar component that is displayed in toolbar
	 */
	setCustomToolbar(customToolbar: any) {
		this.customToolbar = customToolbar;
	}

	/**
	 * handle the component mounting for the first time. we just trigger the loading of the data
	 */
	componentDidMount() {
		this.loadData(this.state.searchTerm, this.state.page, this.state.pageSize, this.state.sortBy, this.state.sortOrder, this.state.filterTerms);
	}

	abstract callApi(config: Configuration, newSearchTerm: string, newPage: number, newPageSize: number, newSortBy: string, newSortOrder: 'asc' | 'desc' | undefined): void;

	/**
	 * get all of the objects for the current state
	 */
	loadData(newSearchTerm: string, newPage: number, newPageSize: number, newSortBy: string, newSortOrder: 'asc' | 'desc' | undefined, newfilterTerms: string[]) {

		// tempcode for unit test
		if (this.isTesting) {
			let config = new Configuration({ basePath: Environment.api_base_url, accessToken: '4dc98fd81f075a68b146a6847d7161b478643e7d' });
			this.setState({ loading: true, searchTerm: newSearchTerm, page: newPage, pageSize: newPageSize, sortOrder: newSortOrder, sortBy: newSortBy, filterTerms: newfilterTerms, itemCount: -1, items: [{}] });
			try {
				this.callApi(config, newSearchTerm, newPage, newPageSize, newSortBy, newSortOrder);
			}
			catch (problem) {
				console.log('loadData failed ' + problem);
				this.setState({ loading: false, loadError: true, loadErrorMessage: 'Unknown', itemCount: -1, items: [{}] as T[] });
			}
		} else {
			authProvider.getIdToken().then((token) => {
				let config = new Configuration({ basePath: Environment.api_base_url, accessToken: token.idToken.rawIdToken });
				this.setState({ loading: true, searchTerm: newSearchTerm, page: newPage, pageSize: newPageSize, sortOrder: newSortOrder, sortBy: newSortBy, filterTerms: newfilterTerms, itemCount: -1, items: [{}] });
				try {
					this.callApi(config, newSearchTerm, newPage, newPageSize, newSortBy, newSortOrder);
				}
				catch (problem) {
					console.log('loadData failed ' + problem);
					this.setState({ loading: false, loadError: true, loadErrorMessage: 'Unknown', itemCount: -1, items: [{}] as T[] });
				}
			});
		}

	}

	/**
	 * handle the return of the load
	 * @param string error text describing the error that has occured if any
	 * @param object data the result of the call to get data
	 * @param response error the object that describes an error that occured if any
	 */
	loadCallback(error: any, data: T[] | undefined, response: any) {
		if (data != null && data.length >= 0) {
			let newPageSelections = [] as any[];
			data.forEach((item: any, rowIndex) => {
				for (let index = 0; index < this.state.selected.length; index++) {
					if (item.id == this.state.selected[index].id) {
						newPageSelections.push(rowIndex);
						continue;
					}
				}
			});

			let newItemCount = data.length;
			this.setState({ loading: false, itemCount: newItemCount, items: data, rowsSelected: newPageSelections });
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
	 * allow derivations to insert custom pieces on the searching portion of the toolbar by overriding this
	 */
	customSearch() {
		return;
	};

	/**
	 * handle the user changing the current page in the pagination component
	 */
	handleChangePage = (newPage: number) => {
		this.loadData(this.state.searchTerm, newPage, this.state.pageSize, this.state.sortBy, this.state.sortOrder, this.state.filterTerms);
	};

	/**
	 * handle the user making a change to the rows per page field in the pagination component
	 */
	handleChangeRowsPerPage = (newPageSize: number) => {
		this.loadData(this.state.searchTerm, 0, newPageSize, this.state.sortBy, this.state.sortOrder, this.state.filterTerms);
	};

	/**
	 * handle the user changing the sorting in the paging component
	 */
	handleRequestSort = (property: string) => {
		let newOrder = (this.state.sortBy === property) ?
			(this.state.sortOrder === 'asc') ? 'desc' : 'asc'
			: 'asc' as ('asc' | 'desc' | undefined);
		if (property == 'status')
			property = '[status]';
		this.loadData(this.state.searchTerm, 0, this.state.pageSize, property, newOrder, this.state.filterTerms);
	};

	/**
	 * update the term to search by
	 */
	updateSearchTerm(searchTerm: any) {
		this.setState({ searchTerm: searchTerm });
	}

	/**
	 * execute a search
	 */
	handleSearch = () => {
		this.loadData(this.state.searchTerm, this.state.page, this.state.pageSize, this.state.sortBy, this.state.sortOrder, this.state.filterTerms);
	}

	/**
	 * handle filter
	 */
	handleFilter = (filterTerms: any) => {
		this.loadData(this.state.searchTerm, this.state.page, this.state.pageSize, this.state.sortBy, this.state.sortOrder, filterTerms);
	}

	/**
	 * retry the loading of the data
	 */
	retry() {
		this.loadData(this.state.searchTerm, this.state.page, this.state.pageSize, this.state.sortBy, this.state.sortOrder, this.state.filterTerms);
	}

	viewColumnChanged(changedColumn: string, action: string) {
		const newHiddenColumns = this.state.hiddenColumns;
		if (action == 'remove') {
			newHiddenColumns.push(changedColumn);
			for (let i = 0; i < this.columns.length; i++) {
				if (this.columns[i].name == changedColumn)
					this.columns[i].options.display = false;
			}
		}
		if (action == 'add') {
			for (let index = 0; index < newHiddenColumns.length; index++) {
				if (newHiddenColumns[index] == changedColumn)
					newHiddenColumns.splice(index, 1);
			}
			for (let i = 0; i < this.columns.length; i++) {
				if (this.columns[i].name == changedColumn)
					this.columns[i].options.display = true;
			}
		}
		this.setState({ hiddenColumns: newHiddenColumns });
	}

	/**
	 * check to see where the given object is currently in the selected list
	 * @param objectToCheck the object to search for
	 * @returns the index of the given object in the selected list
	 */
	selectedIndex(objectToCheck: any): number {
		let objectToCheckId = objectToCheck.id;
		if (this.state.selected != null) {
			for (let index = 0; index < this.state.selected.length; index++) {
				let currentObject = this.state.selected[index];
				let currentObjectId = currentObject.id;
				if (objectToCheckId === currentObjectId)
					return index;
			}
		}
		return -1;
	}

	/**
	 * handle one row changing its selection state
	 * @param rowsSelectedData an object represent the row that was affected {"index":3,"dataIndex":3}
	 * @param allRows all of the rows that are selected in this page in the form of {"index":3,"dataIndex":3} for each selection
	 * @param rowsSelected an array of numbers that indicate the index of the rows that are selected
	 */
	selectionChanged(rowsSelectedData: any, allRows: any, rowsSelected: any) {
		let newSelectedList = Object.assign([], this.state.selected);

		if (rowsSelected.length == 0) {
			newSelectedList = [];
		}
		else {
			let dataIndex = rowsSelectedData[0].dataIndex;
			let toggledObject = this.state.items[dataIndex];
			let selectedIndex = this.selectedIndex(toggledObject);
			let beingChecked = selectedIndex == -1;

			if (beingChecked) {
				newSelectedList.push(toggledObject);
			}
			else {
				newSelectedList.splice(selectedIndex, 1);
			}
		}

		if (this.props.selectionListener != null) {
			const listenersCopy = Object.assign([], newSelectedList);
			this.props.selectionListener(listenersCopy);
		}
		if (this.props.selectionChangeListener != null) {
			this.props.selectionChangeListener(rowsSelectedData);
		}

		let ids = [] as number[];
		newSelectedList.forEach((element: any) => {
			ids.push(element.id);
		});
		this.setState({ selected: newSelectedList, rowsSelected: rowsSelected });
	}

	/**
	 * render the component. this base class handles rendering the state where the data is loading and where there has been an
	 * error in loading. the componennt implementation needs to override renderData() to complete this
	 */
	render() {
		if (!this.isTesting) {	// tempcode for unit test
			let user_context = this.context;
			if (user_context.no_access === true)
				return <Redirect to='/noAccess' />
		}

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

		let rows = this.state.items[0]?.total_result_set_rows;
		const options = {
			filter: true,
			download: this.downloadIcon,
			search: this.searchIcon,
			filterType: 'dropdown' as any,
			responsive: 'standard' as any,
			expandableRows: (this.props.show_expanded_rows === true),
			expandableRowsHeader: false,
			expandableRowsOnClick: true,
			isRowExpandable: (dataIndex: any, expandedRows: any) => {
				if (dataIndex === 3 || dataIndex === 4) return false;

				// Prevent expand/collapse of any row if there are 4 rows expanded already (but allow those already expanded to be collapsed)
				if (expandedRows.data.length > 4 && expandedRows.data.filter((d: any) => d.dataIndex === dataIndex).length === 0) return false;
				return true;
			},
			renderExpandableRow: (rowData: any, rowMeta: any) => {
				//Going with the definition of "a final, hidden column contains the index of the current row on expanded_rows_table"
				let finalCol = rowData.length - 1;
				let expandedRowIdx = rowData[finalCol];

				if (this.props.expanded_rows_table != undefined) {
					let expandedRow = this.props.expanded_rows_table.props.data[expandedRowIdx] as Array<any>;
					return (
						<TableRow>
							{expandedRow.map((row: any) => {
								return (
									<TableCell>
										{row}
									</TableCell>
								);
							})}
						</TableRow>
					);
				}
			},
			onRowExpansionChange: (curExpanded: any, allExpanded: any, rowsExpanded: any) => console.log(curExpanded, allExpanded, rowsExpanded),
			enableNestedDataAccess: '.',
			serverSide: true,
			sortOrder: {
				name: this.state.sortBy as any,
				direction: this.state.sortOrder as any,
			},
			count: rows,
			page: this.state.page,
			rowsPerPage: this.state.pageSize,
			rowsPerPageOptions: [10, 15, 20, 25, 50],
			confirmFilters: true,
			onViewColumnsChange: this.viewColumnChanged.bind(this),
			onRowSelectionChange: this.selectionChanged.bind(this),
			rowsSelected: this.state.rowsSelected,
			customFilterDialogFooter: (currentFilterList: any, applyNewFilters: any) => {
				return (
					<div style={{ marginTop: '40px' }}>
						<Button data-testid="test-handleFilter" variant="contained" onClick={() => this.handleFilter(applyNewFilters())}>Apply Filters</Button>
					</div>
				);
			},
			searchProps: {
				onKeyUp: (e: any) => {
					if (e.key == 'Enter') {
						this.handleSearch();
					}
				},
			},

			/**
			 * shows custom toolbar item 
			 * if set customToolbar, it is displayed in the toolbar next to the Filter button.
			 * can show any custom component
			 */
			customToolbar: () => {
				if (this.customToolbar)
					return (this.customToolbar)
			},

			onTableChange: (action: any, tableState: any) => {
				switch (action) {
					case 'changePage':
						this.handleChangePage(tableState.page);
						break;
					case 'changeRowsPerPage':
						this.handleChangeRowsPerPage(tableState.rowsPerPage);
						break;
					case 'sort':
						this.handleRequestSort(tableState.sortOrder.name);
						break;
					case 'search':
						this.updateSearchTerm(tableState.searchText);
						break;
					default:
						console.log('action not handled.');
				}
			},
			onFilterChange: (column: any, filterList: any, type: any, columnIndex: any) => {
				if (type === 'reset') {
					var newFilters = () => (filterList);
					this.handleFilter(newFilters);
				}
			},
			onFilterConfirm: (filterList: any) => {
				console.log('confirmed');
			},
		};

		return (
			<Paper id={this.title + "_table"}>
				<MUIDataTable title={this.title} data={this.state.items} columns={this.columns} options={options} />
			</Paper>
		)

	}
}

ApiLoadableDataTable.contextType = UserContext;

export default ApiLoadableDataTable;