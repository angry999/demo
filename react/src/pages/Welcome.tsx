import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import UserContext from '../UserContext';

class Welcome extends Component
{
	render()
	{
		console.log('render');
		let user_context = this.context;
		if (user_context.user !== null && user_context.user !== undefined)
			return <Redirect to='/orders' />;
		if (user_context.no_access === true)
			return <Redirect to='/noAccess' />;

		return (
			<Container>
				<Typography variant="h6">
					Welcome, please wait while we gather some data
				</Typography>
			</Container>
		);
	}
}

Welcome.contextType = UserContext;

export default Welcome;
