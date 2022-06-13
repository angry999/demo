import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from "./pages/Main";
import { AzureAD } from 'react-aad-msal';
import { authProvider } from './react-azure-adb2c';

ReactDOM.render(
	<AzureAD provider={authProvider} forceLogin={true} >
		<Main />
	</AzureAD>,
	document.getElementById('root')
);