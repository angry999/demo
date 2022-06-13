import React, { Component } from "react";
import { Container, 
		 Avatar, 
		 Card, 
		 CardActions, 
		 CardContent, 
		 Button, 
		 Link,
		 Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import { Theme } from "@material-ui/core/styles";

class Contact extends Component
{
	render()
	{
		let classes = (this.props as any).classes;
		return (
			<div>
				<div className={classes.cardGrid}>
				<Grid item xs={12}>
					<Grid container>
						<Grid item>
							<Typography className={classes.h6} variant="h6">
								Your dedicated dealing representatives
							</Typography>
						</Grid>
					</Grid>
				</Grid>
				<Grid container className={classes.root} spacing={2}>
					<Grid item xs={12}>
						<Grid container justify="center" spacing={2}>
						<Grid item xs={12} md={4}>
							<Card className={classes.cardContainer}>
								<CardContent>
									<Avatar 
										alt="Gregory Colford" 
										src="https://my.fundscraper.com/external/pages/dp_gregory_7.jpg" 
										className={classes.large}
									/>
									<Typography className={classes.repName}>Gregory M. COLFORD, B.A., J.D., C.I.M.®</Typography>
									<Typography className={classes.repTitle}>Principal Broker, Exec. VP and CCO</Typography>
									<Typography className={classes.subTitle}>Br. Lic.: M08001575 | FSRA #12859</Typography>
									
									<Typography className={classes.phone}>
										<PhoneIcon className={classes.icon}> </PhoneIcon>416.315.7141</Typography>
									<Typography className={classes.email}>
										<EmailIcon className={classes.icon}> </EmailIcon>gregory.colford@fundscraper.com
									</Typography>

								</CardContent>
								<CardActions className={classes.buttonCenter}>
									<Link href="https://app.hubspot.com/meetings/gregory-colford" target="_blank">
										<Button size="small" color="primary">
											Book a Call with Gregory
										</Button>
									</Link>
								</CardActions>
							</Card>
						</Grid>
						<Grid item xs={12} md={4}>
							<Card className={classes.cardContainer}>
								<CardContent>
									<Avatar 
										alt="Luan Ha" 
										src="https://my.fundscraper.com/external/pages/dp_luan_3.jpg" 
										className={classes.large}
									/>
									<Typography className={classes.repName}>Luan Ha, MBA</Typography>
									<Typography className={classes.repTitle}>CEO</Typography>	
									<Typography className={classes.subTitle}>&nbsp;</Typography>
									<Typography className={classes.phone}>
										<PhoneIcon className={classes.icon}> </PhoneIcon>647.924.4313</Typography>
									<Typography className={classes.email}>
										<EmailIcon className={classes.icon}> </EmailIcon>lh@fundscraper.com
									</Typography>

								</CardContent>
								<CardActions className={classes.buttonCenter}>
									<Button size="small" color="primary" href="https://app.hubspot.com/meetings/lh1" target="_blank">
										Book a Call with Luan
									</Button>
								</CardActions>
							</Card>
						</Grid>
						<Grid item xs={12} md={4}>
							<Card className={classes.cardContainer}>
								<CardContent>
									<Container>
										<Avatar 
											alt="Terence Cheng" 
											src="https://my.fundscraper.com/external/pages/dp_terence_1.jpg" 
											className={classes.large}
										/>
										<Typography className={classes.repName}>Terence Cheng</Typography>
										<Typography className={classes.repTitle}>VP Operations</Typography>	
										<Typography className={classes.subTitle}>&nbsp;</Typography>
										<Typography className={classes.phone}>
											<PhoneIcon className={classes.icon}> </PhoneIcon>647.205.7484</Typography>
										<Typography className={classes.email}>
											<EmailIcon className={classes.icon}> </EmailIcon>tc@fundscraper.com
										</Typography>

									</Container>
								</CardContent>
								<CardActions className={classes.buttonCenter}>
									<Button size="small" color="primary" href="https://app.hubspot.com/meetings/tc4" target="_blank">
										Book a Call with Terence
									</Button>
								</CardActions>
							</Card> 
						</Grid>
						</Grid>
					</Grid>
				</Grid>
				{}
				</div>
			</div>
		);
	}
}

export default  withStyles((theme: Theme) => ({
	cardGrid: {
		// display: 'flex'
	},
	avatar: {
		margin: '0 auto'
	},
	large: {
		width: theme.spacing(10),
		height: theme.spacing(10),
		margin: '0 auto 20px auto',
	},
	repName: {
		fontWeight: 'bold',
		fontSize: '1rem',
		textAlign: 'center',
		marginBottom: '10px'
	},
	repTitle: {
		fontSize: '0.8rem',
		textAlign: 'center',
	}, 
	subTitle: {
		fontSize: '0.8rem',
		textAlign: 'center',
		marginBottom: '10px'
	},
	h6: {
		marginBottom: '20px',
		fontWeight: 500,
		color: '#122055'
	},
	cardContainer: {
		marginRight: '10px',
		// minWidth: '345px',
		display: 'flex',
		flexDirection: 'column'
	},
	phone: {
		fontSize: '0.8rem',
		marginBottom: '10px',
		textAlign: 'center',
		marginTop: '20px'
	},
	email: {
		fontSize: '0.8rem',
		marginBottom: '10px',
		textAlign: 'center'
	},
	icon: {
		fontSize: '1rem',
		marginRight: '15px'
	},
	buttonCenter: {
		textAlign: 'center',
		margin: '0 auto'
	}
}))(Contact);
