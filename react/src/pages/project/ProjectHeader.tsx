import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import UserContext from '../../UserContext';
import { Typography, Container } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ProjectStage_friendlyText } from 'fundscraper-model-enums';
import { Project } from '../../tsapi/api';

interface IProps {
	project: Project
}

interface IState {
}

/**
 *
 */
class ProjectHeader extends Component<IProps, IState>
{
	render() {
		let classes = (this.props as any).classes;

		// name
		console.log(this.props, 'props')
		// raising
		let raising = this.props.project.offering_amount;
		let raisingFormatted = '$' + raising.toLocaleString(undefined, { minimumFractionDigits: 0 });

		// min
		let share_price = this.props.project.share_price;
		let min_share = this.props.project.min_share;
		let min = share_price * min_share;
		let minFormatted = '$' + min.toLocaleString(undefined, { minimumFractionDigits: 0 });

		return (
			<div>
				<div className={classes.tabTitle}>Project Details</div>
				<Paper>
					<Container maxWidth={false} >
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<Typography className={classes.nameTxt}>{this.props.project.name}</Typography>
								<Typography className={classes.nameLbl}>Project Name</Typography>
							</Grid>
							<Grid item xs={2}>
								<Typography>{raisingFormatted}</Typography>
								<Typography className={classes.nameLbl}>Raising</Typography>
							</Grid>
							<Grid item xs={2}>
								<Typography>{minFormatted}</Typography>
								<Typography className={classes.nameLbl}>Minimum Investment</Typography>
							</Grid>
							<Grid item xs={2}>
								<Typography>{this.props.project.annual_irr}</Typography>
								<Typography className={classes.nameLbl}>Projected IRR</Typography>
							</Grid>
							<Grid item xs={2}>
								<Typography className={classes.tag}>{ProjectStage_friendlyText[this.props.project.project_stage]}</Typography>
								<Typography className={classes.nameLbl}>Status</Typography>
							</Grid>
						</Grid>
					</Container>
				</Paper>
				<div className={classes.tabTitle}>Description</div>
				<Paper>
					<Container>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<Typography>{this.props.project.contents}</Typography>
							</Grid>
						</Grid>
					</Container>
				</Paper>
			</div>

		);
	}
}

ProjectHeader.contextType = UserContext;

export default withStyles({
	tabTitle: {
		paddingTop: '40px',
		paddingBottom: '20px',
		fontSize: '1.3rem',
		color: '#122055'
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
})(ProjectHeader);
