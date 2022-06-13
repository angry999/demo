import React, { Component } from "react";
import Environment from '../Environment';
import { Route, NavLink, HashRouter } from "react-router-dom";
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import theme from '../theme/muiTheme';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import LocationCityIcon from '@material-ui/icons/LocationCityOutlined';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import OrdersButton from '@material-ui/icons/AttachMoney';
import HelpIcon from '@material-ui/icons/Help';
import HistoryIcon from '@material-ui/icons/History';
import Dashboard from "./dashboard/Dashboard";
import Investors from "./Investors";
import Investor from "./investor/Investor";
import Projects from "./Projects";
import Files from "./files/Files";
import Project from "./project/Project";
import Orders from "./Orders";
import Order from "./order/Order";
import Contact from "./Contact";
import Welcome from "./Welcome";
import LoggedOut from "./LoggedOut";
import NoAccess from "./NoAccess";
import UserContext from '../UserContext';
import RecentActivity from './RecentActivity';
import GenericQuestions from './genericquestions/GenericQuestions';
import { authProvider } from '../react-azure-adb2c';
import * as FundscraperApi from "../tsapi/api"
import SettingsIcon from '@material-ui/icons/Settings';
import Settings from "./Settings";
import RoedSchedule1 from "./roed/RoedSchedule1";
import { UserType } from 'fundscraper-model-enums';
import { AdminAccountAvailability } from 'fundscraper-model-enums';
import InsertDriveFileOutlined from '@material-ui/icons/InsertDriveFileOutlined';

const title: React.CSSProperties = {
	flexGrow: 1,
};

interface IProps {
	classes: any
}

interface IState {
	user: any
	, user_name: string
	, email: string
	, logo: string
	, context: any
	, no_access: boolean
}

class Main extends Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			user: null
			, user_name: ''
			, email: ''
			, logo: '/logo192.png'
			, context: { user: null, msal: authProvider.getAccountInfo(), token: null, no_access: null }
			, no_access: false
		};
	}

	loadUser() {
		console.log('calling dalAllUserDalFindAllBy at ' + Environment.api_base_url);

		//console.log('authentication account = ' + JSON.stringify(authProvider.getAccountInfo()));
		/* account,jwtIdToken */
		//console.log('jwtIdToken keys=' + Object.keys(authProvider.jwtIdToken));

		const accountInfo = authProvider.getAccountInfo();
		/* accountIdentifier,homeAccountIdentifier,userName,name,idToken,idTokenClaims,sid,environment */
		const account = (accountInfo == null) ? null : accountInfo.account;

		authProvider.getIdToken().then((token) => {
			let email = (account == null) ? 'xxxxxxxx' : account.idTokenClaims.emails[0];
			let api = new FundscraperApi.DefaultApi({ basePath: Environment.api_base_url, accessToken: token.idToken.rawIdToken });
			api.allUserApiFindAllByFilter(`email eq "${email}" and is_deleted eq 0 and user_type in ("${UserType.issuer_admin}", "${UserType.admin_user}") and [status] = ${AdminAccountAvailability.active}`, 'cobranded_client_of'
				, undefined, undefined, undefined, {
				headers: { 'Authorization': 'Bearer ' + token.idToken.rawIdToken }
			}
			).then((data: any) => {
				if (data != null && data.length > 0) {
					//console.log(`dalAllUserDalFindAllBy loaded user details ${JSON.stringify(data[0])}`);
					let data1 = []; let issuer_admin = -1; let admin_user = -1;
					for (var i = 0; i < data.length; i++) {
						data[i].user_type == `${UserType.issuer_admin}` ? issuer_admin = i : admin_user = i;
					}
					issuer_admin !== -1 ? data1 = data[issuer_admin] : data1 = data[admin_user];

					let logo;
					if (data1.cobranded_client_of != null && data1.cobranded_client_of.image != null)
						logo = Environment.website_base_url + '/external/profiles/' + data1.cobranded_client_of.image;
					else
						logo = this.state.logo;
					this.setState({
						user: data1
						, user_name: data1.first_name
						, email: data1.email
						, logo: logo
						, context: { user: data1, msal: authProvider.getAccountInfo(), token: token.idToken.rawIdToken }
					});
				}
			});
		});
	}

	componentDidMount() {
		//console.log('componentDidMount');
		this.loadUser();
	}

	isLoggedIn() {
		console.log('isLoggedIn');
		//return this.state.context.msal != null;
		return true;
	}

	logOut() {
		if (this.isLoggedIn()) {
			console.log('logging out');
			authProvider.logout();
		}
	}

	render() {
		//console.log('render');
		const { classes } = this.props;
		let userNameText = (this.state.user_name === '') ? '...' : this.state.user_name;
		//console.log(`main user context = ${JSON.stringify(this.state.context)}`);
		let logoPath = (this.state.logo) ? this.state.logo : '/defaultLogo.jpg';
		return (
			<MuiThemeProvider theme={theme}>
				<HashRouter>
					<UserContext.Provider value={this.state.context}>
						<div>
							<AppBar id="header_bar" position="static" color={'primary'}>
								<Toolbar>
									<img alt="FUNDSCRAPER" src="/logo-fs-white.png" className={classes.mainLogo} />
									<Typography style={title}>
									</Typography>
									<NavLink to="/LoggedOut">
										<Button id="logout_text"
											variant='contained'
											color='primary'
											endIcon={<ExitToAppIcon />}
											onClick={this.logOut.bind(this)}
										>
											Sign out
											</Button>
									</NavLink>
									<NavLink to="/Settings">
										<Button id="settings_text"
											variant='contained'
											color='primary'
											endIcon={<SettingsIcon />}
										>
										</Button>
									</NavLink>
								</Toolbar>
							</AppBar>
						</div>
						<Grid container xs={12} spacing={0} className={classes.drawerContainer}>
							<Hidden smDown>
								<Grid item md={2} className={classes.drawer}>
									<img alt="FUNDSCRAPER" src={logoPath} className={classes.issuerLogo} />
									<Container>
										<Typography className={classes.welcomeName} color='secondary'>Welcome {userNameText}!
									</Typography>
									</Container>
									<List>
										<NavLink to='/' className={classes.navLink}>
											<ListItem divider={true} button key="Home" className={classes.listItem}>
												<HomeIcon className={classes.navIcon} />
												<ListItemText id="home_item" primary="Home" />
											</ListItem>
										</NavLink>
										<NavLink to='/dashboard' className={classes.navLink}>
											<ListItem divider={true} button key="Dashboard (soon)">
												<AssessmentIcon className={classes.navIcon} />
												<ListItemText id="dasboard_item" primary="Dashboard" /></ListItem>
										</NavLink>
										<NavLink to='/investors' className={classes.navLink}>
											<ListItem divider={true} button key="Investors">
												<PeopleIcon className={classes.navIcon} />
												<ListItemText id="investors_item" primary="Investors" /></ListItem>
										</NavLink>
										<NavLink to='/orders' className={classes.navLink}>
											<ListItem divider={true} button key="Orders">
												<OrdersButton className={classes.navIcon} />
												<ListItemText id="orders_item" primary="Orders" />
											</ListItem>
										</NavLink>
										<NavLink to='/projects' className={classes.navLink}>
											<ListItem divider={true} button key="Projects">
												<LocationCityIcon className={classes.navIcon} />
												<ListItemText id="projects_item" primary="Projects" />
											</ListItem>
										</NavLink>
										<NavLink to='/files' className={classes.navLink}>
											<ListItem divider={true} button key="Files">
												<InsertDriveFileOutlined className={classes.navIcon} />
												<ListItemText id="files_item" primary="Files" />
											</ListItem>
										</NavLink>
										<NavLink to='/activity' className={classes.navLink}>
											<ListItem divider={true} button key="Recent Activity">
												<HistoryIcon className={classes.navIcon} />
												<ListItemText id="activity_item" primary="Recent Activity" />
											</ListItem>
										</NavLink>
										<NavLink to='/contact' className={classes.navLink}>
											<ListItem button key="Contact Us">
												<HelpIcon className={classes.navIcon} />
												<ListItemText id="contact_item" primary="Contact Us" />
											</ListItem>
										</NavLink>
									</List>
								</Grid>
							</Hidden>
							<Grid item md={10} xs={12} className={classes.rightContainer}>
								<Container maxWidth={false} className={classes.mainContainer}>
									<Route exact path="/" component={Welcome} />
									<Route exact path="/dashboard" component={Dashboard} />
									<Route exact path="/investors" component={Investors} />
									<Route exact path="/projects" component={Projects} />
									<Route exact path="/orders" component={Orders} />
									<Route exact path="/files" component={Files} />
									<Route exact path="/activity" component={RecentActivity} />
									<Route exact path="/settings" component={Settings} />
									<Route exact path="/generic-questions" component={GenericQuestions} />
									<Route path="/contact" component={Contact} />
									<Route path="/loggedOut" component={LoggedOut} />
									<Route path="/noAccess" component={NoAccess} />
									<Route path="/investor/:id" component={Investor} />
									<Route path="/order/:id" component={Order} />
									<Route path="/project/:id" component={Project} />
									<Route path="/roed/:id" component={RoedSchedule1} />
								</Container>
							</Grid>
						</Grid>
					</UserContext.Provider>
				</HashRouter>
			</MuiThemeProvider>
		);
	}
}

export default withStyles(
	{
		mainLogo: {
			width: '100px',
		},
		drawerContainer: {
			minHeight: 'calc(100vh - 64px)',
		},
		drawer: {
			background: '#ffffff',
			borderRight: '1px solid #EEEEEE'
		},
		welcomeName: {
			fontSize: '1rem !important',
			textAlign: 'center',
			//textTransform: 'capitalize',
			fontWeight: 600,
			paddingBottom: '20px'
		},
		issuerLogo: {
			maxWidth: '130px',
			padding: '20px',
			maxHeight: '50px',
			margin: '0 auto',
			display: 'block',
		},
		rightContainer: {
			background: '#F5F6F8'
		},
		navLink: {
			textDecoration: 'none',
		},
		navIcon: {
			paddingRight: '5px',
		},
		mainContainer: {
			padding: '20px 20px',
		},
		viewButton: {
			color: 'red'
		}

	}
	, { withTheme: true })(Main);
