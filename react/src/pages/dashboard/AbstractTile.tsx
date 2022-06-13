import React from "react";
import { Grid, Tooltip, Typography } from "@material-ui/core";
import UserContext from '../../UserContext';
import ApiLoadableComponent, { IApiLoadableComponent_Props, IApiLoadableComponent_State } from "../../basePages/ApiLoadableComponent";

interface IProps extends IApiLoadableComponent_Props {
}

interface IState extends IApiLoadableComponent_State<any> {
}

const bodyTxt: React.CSSProperties = {
    fontSize: '1.0rem',
    textAlign: 'center',
    color: '#5154D3'
};

/**
 * 
 */
abstract class AbstractTile extends ApiLoadableComponent<any, IProps, IState> {
    /**
     * get the icon to show
     */
    abstract getIcon(): JSX.Element;

    /**
     * get the title
     */
    abstract getTitle(): string;

    /**
     * get the tool tip text
     */
    abstract getToolTip(): string;

    renderData() {
        let classes = (this.props as any).classes;
        let value = this.state.data.value as number;
        let valueFormatted = value.toLocaleString();
        return (
            <Grid container>
                <Grid item xs={4} sm={4}>
                    {this.getIcon()}
                </Grid>
                <Grid item xs={8} sm={8}>
                    <Typography className={classes.titleTxt}>{this.getTitle()}</Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Tooltip title={this.getToolTip()}>
                        <Typography className={classes.bodyTxt}>{valueFormatted}</Typography>
                    </Tooltip>
                </Grid>
            </Grid>
        );
    }
}
AbstractTile.contextType = UserContext;

export default AbstractTile;