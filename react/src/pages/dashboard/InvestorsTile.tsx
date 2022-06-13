import React from "react";
import UserContext from '../../UserContext';
import AbstractTile from "./AbstractTile";
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import * as FundscraperApi from "../../tsapi/api";
import { Configuration } from "../../tsapi/configuration";
import { MetricDataType } from "fundscraper-model-enums";
import { Theme } from "@material-ui/core/styles";
import withStyles from "@material-ui/styles/withStyles";

/**
 * 
 */
class InvestorsTile extends AbstractTile {
    /**
     * make the api call to get the investor
     */
    callApi(config: Configuration) {
        //console.log('user count callApi started');
        let api = new FundscraperApi.DefaultApi(config);
        let request = { dataType: MetricDataType.investor_signups };
        api.metricsApiFindOneById(request, {
            headers: { 'Authorization': 'Bearer ' + config.accessToken }
        }).then((data: any) => {
            //console.log(`user count callApi succeeded with ${data[0]}`);
            let boundData = (data !== undefined || data.isArray()) ? data[0] : 'Error';
            this.loadCallback(undefined, boundData, undefined);
        });
    }

    /**
     * get the icon to show
     */
    getIcon(): JSX.Element {
        let classes = (this.props as any).classes;
        return <PeopleAltIcon className={classes.titleIcon}></PeopleAltIcon>
    }

    getTitle(): string {
        return 'Investor Signups';
    }

    getToolTip(): string {
        return 'The total number of investors that have created accounts';
    }
}
InvestorsTile.contextType = UserContext;

export default withStyles((theme: Theme) => ({
    titleIcon: {
        float: 'right'
    },
    titleTxt: {
        fontSize: '1.2rem',
        float: 'left',
        color: theme.palette.text.primary
    },
    bodyTxt: {
        fontSize: '1.0rem',
        textAlign: 'center',
        color: '#5154D3'
    }
}), { withTheme: true })(InvestorsTile);
