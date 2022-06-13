import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';

class NoAccess extends Component
{
	render()
	{
		return (
			<div>
				<div >
					We could not find any access to this system for you
				</div>

			</div>
		);
	}
}

export default  withStyles({
})(NoAccess);
