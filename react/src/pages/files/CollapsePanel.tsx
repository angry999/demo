import React, { Component } from "react";

import {
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Tooltip,
    Typography,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    AccordionActions
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloudDownload from "@material-ui/icons/CloudDownload";

/**
 * @handleDownloadBundle: function for download bundle file
 * @downloadBundleDisabled: flag to enable/disable the download button.
 * enable it if the 3 required filter fields are set in Files's filter.
 */
interface IProps {
    classes: any,
    handleDownloadBundle: any,
    downloadBundleDisabled: boolean,
}

/**
 * @pattern1: first naming pattern value
 * @pattern2: second naming pattern value
 * @pattern3: last naming pattern value
 */
interface IState {
    pattern1?: string,
    pattern2?: string,
    pattern3?: string,
}

/**
 * naming pattern list. 
 * @id: field name of the UserPdf that is used in building structured files.
 * @name: naming pattern name for showing to user.
 */
const buildingPatternType = [
    { id: 'pdf_type', name: 'document type' },
    { id: 'pdf_name', name: 'document name' },
    { id: 'fullName', name: 'investor name' },
    { id: 'user.client_number', name: 'client number' },
    { id: 'order.project.name', name: 'project name' },
    { id: 'order.project.issuer.name', name: 'issuer name' },
    { id: 'order.order_no', name: 'order number' },
    { id: 'order.trade_date', name: 'trade date' },
    { id: 'filter.start_date', name: 'from date' },
    { id: 'filter.end_date', name: 'to date' },
];

/**
 * collapse panel for naming pattern.
 * set the 3 naming pattern before download bundle.
 * server create a pattern1 folder in the root directory.
 * inside pattern1 directory, create the pattern2 directory, and pattern3.pdf in pattern2 directory.
 */
class CollapsePanel extends Component<IProps, IState>
{
    /**
     * set the default naming pattern
     */
    constructor(props: IProps) {
        super(props);
        this.state = {
            pattern1: 'order.project.name',
            pattern2: 'user.client_number',
            pattern3: 'pdf_name',
        }
    };

    /**
     * change the first naming pattern 
     */
    handleChangeNaming1 = (event: React.ChangeEvent<{ value: unknown }>) => {
        this.setState({ pattern1: event.target.value as string });
    };

    /**
     * change the second naming pattern 
     */
    handleChangeNaming2 = (event: React.ChangeEvent<{ value: unknown }>) => {
        this.setState({ pattern2: event.target.value as string });
    };

    /**
     * change the last naming pattern that will be used for dest file name.
     */
    handleChangeNaming3 = (event: React.ChangeEvent<{ value: unknown }>) => {
        this.setState({ pattern3: event.target.value as string });
    };

    /**
     * download bundle file
     * access the Files class's handleDownloadBundle() function
     */
    handleDownload = () => {
        this.props.handleDownloadBundle(this.state.pattern1, this.state.pattern2, this.state.pattern3);
    }

    render() {
        const { classes } = this.props;

        return (
            <Accordion className={classes.accordionContainer}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                    <Typography data-testid="name-pattern" id="name-pattern" className={classes.accordionTitle}>Naming Pattern</Typography>
                </AccordionSummary >
                <AccordionDetails className={classes.accordionBody} >
                    <FormControl>
                        <InputLabel>Directory</InputLabel>
                        <Select
                            id="select_1"
                            data-testid="select1"
                            className={classes.accordionSelect}
                            value={this.state.pattern1}
                            onChange={this.handleChangeNaming1}
                        >
                            {buildingPatternType.map((typeItem) => {
                                return (<MenuItem key={typeItem.id + 1} value={typeItem.id}>{typeItem.name}</MenuItem>)
                            })}
                        </Select>
                    </FormControl>
                    <FormControl><p className={classes.slashP}>/</p></FormControl>
                    <FormControl>
                        <InputLabel>Directory</InputLabel>
                        <Select
                            id="select_2"
                            data-testid="select2"
                            className={classes.accordionSelect}
                            value={this.state.pattern2}
                            onChange={this.handleChangeNaming2}
                        >
                            {buildingPatternType.map((typeItem) => {
                                return (<MenuItem key={typeItem.id + 2} value={typeItem.id}>{typeItem.name}</MenuItem>)
                            })}
                        </Select>
                    </FormControl>
                    <FormControl><p className={classes.slashP}>/</p></FormControl>
                    <FormControl>
                        <InputLabel>File Name</InputLabel>
                        <Select
                            id="select_3"
                            data-testid="select3"
                            className={classes.documentSelect}
                            value={this.state.pattern3}
                            onChange={this.handleChangeNaming3}
                        >
                            {buildingPatternType.map((typeItem) => {
                                return (<MenuItem key={typeItem.id + 3} value={typeItem.id}>{typeItem.name}</MenuItem>)
                            })}
                        </Select>
                    </FormControl>
                    <FormControl><p className={classes.pdfText}>.pdf</p></FormControl>
                    <FormControl>
                        {
                            this.props.downloadBundleDisabled ?
                                <Tooltip title={"Documents must be filtered first"}>
                                    <IconButton className={classes.downloadIconDisabled}>
                                        <CloudDownload />
                                    </IconButton>
                                </Tooltip>
                                :
                                <Tooltip title={"Download all files as a bundle"}>
                                    <IconButton data-testid="download-bundle" id="download-bundle" className={classes.downloadIcon} onClick={() => this.handleDownload()}>
                                        <CloudDownload />
                                    </IconButton>
                                </Tooltip>
                        }
                    </FormControl>
                </AccordionDetails>
                <AccordionActions>
                </AccordionActions>
            </Accordion >
        );
    }
}

export default withStyles(
    {
        accordionContainer: {
            boxShadow: 'none'
        },
        accordionTitle: {
            justifyContent: 'flex-end',
            width: '100%'
        },
        accordionBody: {
            justifyContent: 'flex-end',
        },
        accordionSelect: {
            minWidth: "150px",
            marginBottom: "10px"
        },
        slashP: {
            color: '#757575',
            margin: 'auto',
            fontSize: '20px',
            fontWeight: 700,
            padding: '0 5px'
        },
        documentSelect: {
            minWidth: "150px",
            marginBottom: "10px",
            marginRight: 10
        },
        pdfText: {
            margin: 'auto',
            padding: '0 5px'
        },
        downloadIcon: {
            marginTop: '6px',
            color: '#000000c7'
        },
        downloadIconDisabled: {
            marginTop: '6px',
            color: '#302e2e80'
        }
    }
    , { withTheme: true })(CollapsePanel);

