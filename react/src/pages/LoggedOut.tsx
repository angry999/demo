import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class LoggedOut extends Component
{
	render()
	{
		let classes = (this.props as any).classes;
		return (
			<Paper>
					<Typography className={classes.h6} variant="h6">
						You are currently signed out
					</Typography>
			</Paper>
		);
	}
}

export default withStyles({}
	, { withTheme: true })(LoggedOut);
