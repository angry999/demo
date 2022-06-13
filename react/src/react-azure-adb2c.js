// note on window.msal usage. There is little point holding the object constructed by new Msal.UserAgentApplication
// as the constructor for this class will make callbacks to the acquireToken function and these occur before
// any local assignment can take place. Not nice but its how it works.
import { MsalAuthProvider, LoginType } from 'react-aad-msal';
import Environment from './Environment';

// Msal Configurations
const config = {
	auth: {
		authority: Environment.authority,
		clientId: Environment.clientId,
		validateAuthority: false,
		//redirectUri: 'https://localhost:3000'
	},
	cache: {
		cacheLocation: "localStorage",
		storeAuthStateInCookie: true
	}
};

// Authentication Parameters
const authenticationParameters = {
	scopes:
		Environment.b2cScopes
}

// Options
const options = {
	//loginType: LoginType.Popup
	loginType: LoginType.Redirect
	, tokenRefreshUri: window.location.origin + '/auth.html'
}

export const authProvider = new MsalAuthProvider(config, authenticationParameters, options)
