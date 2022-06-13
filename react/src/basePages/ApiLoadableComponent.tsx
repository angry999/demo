import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Environment from '../Environment';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import UserContext from '../UserContext';
import { authProvider } from '../react-azure-adb2c';
import { Configuration } from "../tsapi/configuration";

export interface IApiLoadableComponent_Props {
}

export interface IApiLoadableComponent_State<T> {
	loading: boolean
	, loadError: boolean
	, loadErrorMessage?: string
	, data: T | null
}

/**
 * base point of inheritence for components that have to make an api call to load their data
 */
export abstract class ApiLoadableComponent<T, P extends IApiLoadableComponent_Props, S extends IApiLoadableComponent_State<T>> extends Component<P, S> {

	constructor(props: P, overloadState?: S) {
		super(props);
		if (overloadState === undefined)
			this.state = {
				loading: true
				, loadError: false
				, loadErrorMessage: ''
				, data: null
			} as S;
		else
			this.state = overloadState;
	}

	/**
	 * handle the component mounting for the first time. we just trigger the loading of the data
	 */
	componentDidMount() {
		this.loadData();
	}

	abstract callApi(config: Configuration, stateChanges?: S): any;
	abstract renderData(): any;

	/**
	 * get all of the data for the current state
	 */
	protected loadData(stateChanges?: S) {
		console.log(`loadData(${JSON.stringify(stateChanges)})`);
		authProvider.getIdToken().then((token) => {
			let config = new Configuration({ basePath: Environment.api_base_url, accessToken: token.idToken.rawIdToken });
			if (stateChanges == null)
				stateChanges = {} as S;
			stateChanges.loading = true;
			this.setState(stateChanges);
			this.callApi(config, stateChanges);
		});
	}

	/**
	 * handle the return of the load
	 * @param string error text describing the error that has occured if any
	 * @param object data the result of the call to get data
	 * @param response error the object that describes an error that occured if any
	 */
	protected loadCallback(error: any, data: T | undefined, response: any) {
		console.log(`loadData error=${JSON.stringify(error)} response=${JSON.stringify(response)}`)
		if (response instanceof Error) {
			console.log('loadData failed ' + error);
			this.setState({ loading: false, loadError: true, loadErrorMessage: error, data: null });
		}
		else if (data !== null && data !== undefined && Array.isArray(data) && data.length >= 0) {
			console.log('loadData success');
			this.setState({ loading: false, loadError: false, data: data[0] });
		}
		else if (data !== null && data !== undefined) {
			console.log('loadData success');
			this.setState({ loading: false, loadError: false, data: data });
		}
		else {
			console.log('loadData failed with out specified error');
			this.setState({ loading: false, loadError: true, loadErrorMessage: 'Unknown', data: null });
		}
	}

	/**
	 * retry the loading of the data
	 */
	retry() {
		this.loadData();
	}

	protected renderLoading() {
		return (
			<Container>
				<CircularProgress />
			</Container>
		);
	}

	protected rendrError() {
		return (<Container>
			<p>Error loading data</p>
			<p>Message: {this.state.loadErrorMessage}</p>
			<button onClick={this.retry.bind(this)}>
				Retry
			</button>
		</Container>);
	}

	protected renderDoesNotExist() {
		return (
			<Container>
				<p>The item does not exist</p>
			</Container>);
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
			return this.renderLoading();

		if (this.state.loadError === true)
			return this.rendrError();

		if (this.state.data === null || this.state.data === undefined)
			return this.renderDoesNotExist();

		return this.renderData();
	}
}

ApiLoadableComponent.contextType = UserContext;

export default ApiLoadableComponent;
