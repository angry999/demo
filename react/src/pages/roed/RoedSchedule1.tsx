import React from "react";
import UserContext from '../../UserContext';
import Environment from '../../Environment';
import { ApiLoadableComponent, IApiLoadableComponent_Props, IApiLoadableComponent_State } from '../../basePages/ApiLoadableComponent';
import MUIDataTable, { ExpandButton } from "mui-datatables";
import XLSX from 'xlsx';
import * as FundscraperApi from "../../tsapi/api"
import { Configuration } from "../../tsapi/configuration";
import Orders from "../Orders";
import { RoedSchedule1State, RoedSchedule1State_friendlyText } from 'fundscraper-model-enums';
import * as queryString from 'querystring';
import { Container, FormControl, Grid, IconButton, ListItemText, MenuItem, Paper, Tooltip, Typography, Select, Button, TableRow, TableCell, TableFooter } from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import CompleteIcon from '@material-ui/icons/CheckCircleOutline';
import ArchiveIcon from '@material-ui/icons/Archive';
import { withStyles } from '@material-ui/core/styles';
var md5 = require('js-md5');

/**
 * Styles
 */
const infoTab: React.CSSProperties = {
    'marginBottom': '20px',
}

const tabTitle: React.CSSProperties = {
    'paddingTop': '20px',
    'paddingBottom': '20px',
    'fontSize': '1.3rem',
    'color': '#122055'
}

const overlay: React.CSSProperties = {
    'position': 'fixed',
    'width': '100%',
    'height': '100%',
    'top': 0,
    'left': 0,
    'backgroundColor': 'rgba(0, 0, 0, 0.5)',
    'overflow': 'visible',
    'zIndex': 10000,
}

const unclickable: React.CSSProperties = {
    'pointerEvents': 'none',
}

interface IProps extends IApiLoadableComponent_Props {
    match: any
    , createNew?: boolean
}

interface IState extends IApiLoadableComponent_State<FundscraperApi.RoedSchedule1> {
    selected: any[]
    , overlay: boolean
    , dialog_open: boolean
    , uploading: boolean
    , error_message: string
    , status: number
    , markAsIgnore: any[]
    , filedData: object[]
    , summaryReportData: object[]
    , totalPurchasers: number;
    totalAmountPaid: number;
}

class RoedSchedule1 extends ApiLoadableComponent<FundscraperApi.RoedSchedule1, IProps, IState>
{
    config?: Configuration;
    uploaded_file?: boolean;
    filedDatatable: any;
    summaryReportDatatable: any;
    unmatchedOrders: FundscraperApi.InvestmentOrder[] = [];
    matchedFiledRoedRows: number[] = [];
    orders?: FundscraperApi.InvestmentOrder[];
    filedDateOfDistribution: string = "";

    /**
     * make the api call to get the schedule1 or create an empty schedule1 to be saved
     */
    callApi(config: Configuration) {
        this.config = config;
        console.log(`callApi(params=${JSON.stringify(this.props)})`);
        if (this.props.match.params.id === '0') {
            let props = this.props as any;
            let params = queryString.parse(props.location.search);
            let project_id = params['?project_id'] != null ? parseInt(params['?project_id'] as any) : 0;
            let report = {
                id: 0
                , name: `ROED Schedule 1 - Project ${project_id} - ${new Date()}`
                , project_id: project_id
                , status: RoedSchedule1State.created
            } as any;
            this.loadCallback(undefined, report, undefined);
        }
        else {
            let api = new FundscraperApi.DefaultApi(config);
            api.roedSchedule1ApiFindOneById(this.props.match.params.id, ['orders'], {
                headers: { 'Authorization': 'Bearer ' + config.accessToken }
            }).then((data: any) => {
                this.getUnmatchedOrders(data.orders);
                this.getfiledRoedDocumentData(data.document);
                this.loadCallback(undefined, data, undefined);
            }).catch(problem => {
                console.log('callApi failed call');
                this.loadCallback(problem, undefined, undefined);
            });
        }
    }

    /**
     * save selected orders to create new RoedSchedule1
     */
    save() {
        // name, orders.state., selected: []
        this.overlayOpen();
        let api = new FundscraperApi.DefaultApi(this.config);
        let newReport = this.state.data as any;
        let selectedIds = [] as any;
        this.state.selected.forEach(selectedItem => {
            selectedIds.push(selectedItem.id);
        });

        newReport.orderIds = selectedIds;
        if (this.state.status) newReport.status = this.state.status;
        if (newReport.id === 0)
            newReport.id = undefined;
        console.log(`saving ${JSON.stringify(newReport)}`);
        this.setState({ loading: true });
        api.roedSchedule1ApiCreate([newReport] as FundscraperApi.RoedSchedule1[], {
            headers: { 'Authorization': 'Bearer ' + this.config?.accessToken }
        }).then((data: any) => {
            let newRoed = this.state.data as FundscraperApi.RoedSchedule1;
            newRoed.id = data.id;
            this.loadCallback(undefined, newRoed, undefined);
        }).catch(problem => {
            console.log('callApi failed call');
            this.loadCallback(problem, undefined, undefined);
        });
        this.overlayClose();
    }

    /**
     * opens screen overlay
     */
    overlayOpen() {
        console.log("overlay opened");
        this.setState({ overlay: true });
    }

    /**
     * closes screen overlay
     */
    overlayClose() {
        console.log("overlay closed");
        this.setState({ overlay: false });
    }

    /**
     * handle selection change
     */
    selectionChanged(selected: any[]) {
        //console.log(`roed-selectionChanged size=${selected.length}`);
        //console.log(`roed-selectionChanged ${JSON.stringify(selected)}`);
        this.setState({ selected: selected });
    }

    /**
     * handles changing value of roed schedul1 status dropdown
     */
    handleStatusChange = (e: any) => {
        this.setState({ status: e.target.value })
    }

    /**
     * upload a filed roed schedule1 document 
     */
    upload(e: any) {
        console.log('uploadfiles');
        const files = Array.from(e.target.files)
        this.setState({ dialog_open: false, uploading: true, error_message: '' })

        const formData = new FormData()

        files.forEach((file: any, i: any) => {
            console.log('uploadfiles - ' + file);
            formData.append('file', file)
        })

        let schedule1 = this.state.data as FundscraperApi.RoedSchedule1;

        let scheduleId = schedule1.id;
        let projectId = schedule1.project_id;

        formData.append('id', scheduleId.toString());
        formData.append('project_id', projectId.toString());
        formData.append('status', RoedSchedule1State.returned.toString());

        let value = this.context;
        fetch(Environment.api_base_url + '/RoedSchedule1',
            {
                method: 'PUT',
                headers: new Headers({
                    'Authorization': 'Bearer ' + value.token
                }),
                body: formData
            })
            .then((res) => {
                try {
                    if (!res.ok) {
                        if (res.status === 403)
                            throw Error('You are not authorized to upload to this ROED Schedule 1');
                        throw new Error('The response was an http ' + res.status + ' and a message reading ' + res.statusText);
                    }
                    return res.json();
                }
                catch (error) {
                    this.setState({ dialog_open: true, error_message: error.message });
                }
            })
            .then(results => {
                console.log('results ' + results);
                this.setState({ uploading: false });
            }).catch((error) => {
                console.log('error ' + error);
                this.setState({ dialog_open: true, error_message: error.message });
            })
    }

    /**
     * handles selection change in the filed roed data table and marks selected rows as ignored
     */
    markSelectedAsIgnore(rowsSelectedData: any, allRows: any, rowsSelected: any) {
        this.setState({ markAsIgnore: rowsSelected })
    }

    /**
    * saves current markedAsIgnore selection 
    */
    saveMarkedAsIgnore() {
        let schedule1 = this.state.data as FundscraperApi.RoedSchedule1;
        let api = new FundscraperApi.DefaultApi(this.config);
        schedule1.filed_rows_to_ignore = JSON.stringify(this.state.markAsIgnore);

        api.roedSchedule1ApiUpdate([schedule1], {
            headers: { 'Authorization': 'Bearer ' + this.config?.accessToken },
        }).then((data: any) => {
            console.log('callApi successful call');
        }).catch(problem => {
            console.log('callApi failed call: ' + problem);
            this.loadCallback(problem, undefined, undefined);
        });
    }

    /**
     * saves matched order for filed roed datatable row
     * @param filedRowIndex - the index of the row where the match was made
     * @param orderId - the id of the order being matched 
     */
    handleMatchedOrderChange(filedRowIndex: number, orderId: number) {
        let updateOrder = [] as object;
        updateOrder = {
            id: orderId.toString()
            , filed_roed_row_match: filedRowIndex.toString()
        }

        let api = new FundscraperApi.DefaultApi(this.config);
        this.setState({ loading: true });
        api.investmentOrderApiUpdate([updateOrder] as FundscraperApi.InvestmentOrder[], {
            headers: { 'Authorization': 'Bearer ' + this.config?.accessToken },
        }).then((data: any) => {
            console.log('update successful');
            let updatedRoed = this.state.data as FundscraperApi.RoedSchedule1;
            this.loadCallback(undefined, updatedRoed, undefined);
        }).catch(problem => {
            console.log('update failed: ' + problem);
            this.loadCallback(problem, undefined, undefined);
        });
    }

    /**
     * gets the data from the uploaded filed roed document
     * @param document - the name of the filed roed document
     */
    getfiledRoedDocumentData(document: string) {
        if (document != null) {
            document = encodeURI(document);

            fetch(`${Environment.website_base_url}/external/excel/${document}`).then(res => {
                return res.arrayBuffer();
            }).then(res => {
                let workbook = XLSX.read(new Uint8Array(res), {
                    type: 'array'
                });

                let lastSheetIndex = workbook.SheetNames.length;
                let tempLastSheetName = '';
                let lastSheetName = '';
                while (lastSheetIndex > 0 && lastSheetName == '') {
                    lastSheetIndex--;
                    tempLastSheetName = workbook.SheetNames[lastSheetIndex];
                    if (!tempLastSheetName.includes('(Hidden or Read only)')) {
                        lastSheetName = tempLastSheetName;
                    }
                }

                var totalPurchasers = 0;
                var formatted = [];
                var first_worksheet = workbook.Sheets[lastSheetName];
                if (first_worksheet != null && first_worksheet['B5'] != null) {
                    var data: any[] = [];
                    data = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 });
                    this.filedDateOfDistribution = first_worksheet['B5'].w;

                    data.splice(0, 8);

                    for (var i = 0; i < data.length; i++) {
                        if (data[i] == "") {
                            data.splice(i--, 1); continue;
                        }
                        formatted.push(Object.assign({}, data[i]));
                    }

                    var summaryReport = [...data.reduce((sum: any, currentValues: any) => {
                        const key = currentValues[7] + '-' + currentValues[16];

                        const item = sum.get(key) || Object.assign({}, {
                            province: currentValues[7],
                            exemption: currentValues[16],
                            numPurchasers: 0,
                            numAmountPaid: 0
                        });

                        item.numPurchasers++;
                        item.numAmountPaid += currentValues[15];

                        return sum.set(key, item);
                    }, new Map).values()] as any;

                    var totalAmountPaid = data.reduce((sum, currentValue: any) => {
                        return sum + currentValue[15];
                    }, 0);
                    totalPurchasers = data.length;
                }
                this.setState({ filedData: formatted, totalAmountPaid: totalAmountPaid, totalPurchasers: totalPurchasers, summaryReportData: summaryReport });
            });
        }
    }

    createSummarReportDatatable() {
        var columns = [{
            name: "province",
            label: "Province or Country",
        }, {
            name: "exemption",
            label: "Exemptions Relied On",
        }, {
            name: "numPurchasers",
            label: "Number of Unique Purchasers",
        }, {
            name: "numAmountPaid",
            label: "Total Amount ($CAD)",
            options: {
                customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
                    let result = (value == null) ? '' : value.toLocaleString(undefined, { minimumFractionDigits: 2 });
                    return '$' + result;
                }
            },
        }]

        const options = {
            customFooter: () => {
                return (
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={6}>
                                Total Unique Purchasers: {this.state.totalPurchasers}.   Total Dollars of Securities Distributed: ${this.state.totalAmountPaid}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                );
            }
        }

        return <MUIDataTable title="Summary Report" data={this.state.summaryReportData} columns={columns} options={options} />
    }

    /**
     * creates a datatable using uploaded filed roed document data
     */
    createFiledDatatable() {
        let schedule1 = this.state.data as FundscraperApi.RoedSchedule1;
        let previouslySelected = JSON.parse(schedule1.filed_rows_to_ignore);

        var columns = [{
            name: "Matched",
            label: "Matched",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
                    var filedRow = tableMeta.rowIndex;

                    if (this.matchedFiledRoedRows.includes(filedRow)) {
                        return (<div>Matched</div>);
                    }
                    else
                        return (
                            <FormControl>
                                <Select
                                    labelId="match-label"
                                    id="match"
                                    defaultValue={-1}
                                    onChange={event => {
                                        value = event.target.value;
                                        if (value != -1) this.handleMatchedOrderChange(filedRow, value);
                                    }}
                                >
                                    <MenuItem key={-1} value={-1}>
                                        <ListItemText primary={"Match an Order"} />
                                    </MenuItem>
                                    {this.unmatchedOrders?.map(order => (
                                        <MenuItem key={order.id} value={order.id}>
                                            <ListItemText primary={order.order_no} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        );
                }
            },
        }, {
            name: "0",
            label: "Last Name",
        }, {
            name: "1",
            label: "First Name",
        }, {
            name: "2",
            label: "Secondary given names",
        }, {
            name: "3",
            label: "Full name of non-individual",
        }, {
            name: "4",
            label: "Street address line 1",
        }, {
            name: "5",
            label: "Street address line 2",
        }, {
            name: "6",
            label: "Municipality",
        }, {
            name: "7",
            label: "Province/State",
        }, {
            name: "8",
            label: "Postal code",
        }, {
            name: "9",
            label: "Country",
        }, {
            name: "10",
            label: "Phone #",
        }, {
            name: "11",
            label: "Email",
        }, {
            name: "12",
            label: "Date of distribution",
        }, {
            name: "13",
            label: "Number of securities",
        }, {
            name: "14",
            label: "Security code",
        }, {
            name: "15",
            label: "Amount paid (CAD $)",
        }, {
            name: "16",
            label: "Rule, section and subsection number",
        }, {
            name: "17",
            label: "If \"Other\", specify exemption relied on",
        }, {
            name: "18",
            label: "Paragraph number in the definition of accredited investor that applies to the purchaser",
        }, {
            name: "19",
            label: "Paragraph number in subsection 2.5(1) that applies to the purchaser",
        }, {
            name: "20",
            label: "Name of individual at issuer claiming a relationship to the purchase",
        }, {
            name: "21",
            label: "Position at issuer (D/O/C/F) of individual claiming a relationship to the purchaser",
        }, {
            name: "22",
            label: "Paragraph number in the definition of eligible investor that applies to the purchaser",
        }, {
            name: "23",
            label: "Is the purchaser a registrant?",
        }, {
            name: "24",
            label: "Is the purchaser an insider of the issuer?",
        }, {
            name: "25",
            label: "Full legal name of person compensated for distribution to this purchaser ",
        },
        ]

        const options = {
            disableToolbarSelect: true,
            onRowSelectionChange: this.markSelectedAsIgnore.bind(this),
            rowsSelected: this.state.markAsIgnore ? this.state.markAsIgnore : previouslySelected,
        }

        return <MUIDataTable title={schedule1.name} data={this.state.filedData} columns={columns} options={options} />
    }

    /**
     * gets the rows that are matched to orders in the filed roed document and saves orders that are not matched
     * @param orders - the orders of the schedule1
     */
    getUnmatchedOrders(orders: FundscraperApi.InvestmentOrder[]) {
        this.orders = orders;
        if (this.unmatchedOrders.length == 0 && this.matchedFiledRoedRows.length == 0) {
            console.log('getOrderMatches successful call');
            let schedule1 = this.state.data as FundscraperApi.RoedSchedule1;

            this.orders?.forEach(order => {
                if (order.filed_roed_row_match == null) {
                    this.unmatchedOrders.push(order);
                }
                else
                    this.matchedFiledRoedRows.push(order.filed_roed_row_match);
            })
        }
    }

    /**
     * Checks reconciled order's escrow and trade dates are defined and handles updates if they are not. 
     * Updates roed status to reconciled.
     */
    reconciliationConfirmation() {
        let api = new FundscraperApi.DefaultApi(this.config);
        let schedule1 = this.state.data as FundscraperApi.RoedSchedule1;
        console.log(this.filedDateOfDistribution);

        this.setState({ loading: true });
        api.roedSchedule1ApiConfirmReconciliation(schedule1, schedule1.id, this.filedDateOfDistribution, {
            headers: { 'Authorization': 'Bearer ' + this.config?.accessToken },
        }).then((data: any) => {
            console.log('update successful');
            let updatedRoed = this.state.data as FundscraperApi.RoedSchedule1;
            this.loadCallback(undefined, updatedRoed, undefined);
        }).catch(problem => {
            console.log('update failed: ' + problem);
            this.loadCallback(problem, undefined, undefined);
        });
    }

    /**
     * render the data that has successfully loaded
     */
    renderData() {
        let schedule1;
        let ordersFilter;
        let docUrlLink = '';
        if (this.props.createNew === true) {
            schedule1 = {
                project_id: 0
                , name: `something`
                , remarks: ''
                , document: ''
                , status: RoedSchedule1State.created
            };
        }
        else {
            schedule1 = this.state.data as FundscraperApi.RoedSchedule1;
            schedule1.document != null ? this.uploaded_file = true : this.uploaded_file = false;

            let scheduleId = schedule1.id;
            let md5Val = md5(`${scheduleId}`);
            let user_context = this.context;
            docUrlLink = `${Environment.website_base_url}/download?roed-schedule-1=${md5Val}&access_token=${user_context.token}`;
        }

        ordersFilter = schedule1.id == 0 || schedule1.id == null ? `roed_schedule1_id is null` : `roed_schedule1_id eq ${schedule1.id}`;

        let classes = (this.props as any).classes;

        if (schedule1.document != null) {
            this.uploaded_file = true;
            this.filedDatatable = this.createFiledDatatable(); this.summaryReportDatatable = this.createSummarReportDatatable();
        }
        else {
            this.uploaded_file = false;
            this.filedDatatable = ""; this.summaryReportDatatable = "";
        }
        return (
            <div style={this.state.overlay ? unclickable : undefined}>
                <div style={this.state.overlay ? overlay : undefined} />
                <div style={infoTab}>
                    <Paper>
                        <Container>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <a className={classes.nameTxt} id='name' href={this.uploaded_file ? docUrlLink : undefined}>{schedule1.name}</a>
                                    <Typography className={classes.nameLbl}>Name</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <FormControl>
                                        <Select
                                            labelId="status-label"
                                            id="status"
                                            defaultValue={schedule1.status}
                                            onChange={this.handleStatusChange.bind(this)}
                                        >
                                            <MenuItem value={schedule1.status}>{RoedSchedule1State_friendlyText[schedule1.status]}</MenuItem>
                                            <MenuItem style={this.state.selected == null || this.state.selected.length == 0 ? { display: 'none' } : undefined} value={RoedSchedule1State.submitted}>{RoedSchedule1State_friendlyText[RoedSchedule1State.submitted]}</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Typography className={classes.nameLbl}>State</Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Tooltip title='Save' style={schedule1.id != 0 ? { display: 'none' } : undefined}>
                                        <IconButton id='save' onClick={this.save.bind(this)} disabled={this.state.selected == null || this.state.selected.length == 0 ? true : false}><SaveIcon /></IconButton>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={1}>
                                    <Tooltip title='Download'>
                                        <IconButton id='download' href={docUrlLink}><ArchiveIcon /></IconButton>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={1}>
                                    <Button variant="contained" component="label">Upload New
                                        <input type="file" onChange={this.upload.bind(this)} style={{ display: "none" }} />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Container>
                    </Paper>
                </div>
                <div style={infoTab}>
                    <Container>
                        <Grid container spacing={3}>
                            <Grid item xs={11}><Typography style={tabTitle}>Order Table</Typography></Grid>
                            <Grid item xs={1}>
                                <Tooltip title='Reconciliate this Roed Instance'>
                                    <IconButton id='complete_reconciliation' style={schedule1.id == 0 ? { display: 'none' } : undefined} onClick={this.reconciliationConfirmation.bind(this)}>
                                        <CompleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Container>
                    <Orders selectionListener={this.selectionChanged.bind(this)} additional_filter={ordersFilter} show_expanded_rows={true} expanded_rows_table={this.filedDatatable}></Orders>
                </div>
                <div style={infoTab}>
                    <Container style={this.uploaded_file ? undefined : { display: 'none' }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}><Typography style={tabTitle}>Summary Report</Typography></Grid>
                        </Grid>
                    </Container>
                </div>
                {this.summaryReportDatatable}
                <div style={infoTab}>
                    <Container style={this.uploaded_file ? undefined : { display: 'none' }}>
                        <Grid container spacing={3}>
                            <Grid item xs={11}><Typography style={tabTitle}>Filed Roed Table</Typography></Grid>
                            <Grid item xs={1}>
                                <Tooltip title='Save Mark as Ignored Selections for Filed Document' >
                                    <IconButton id='save_ignored' onClick={this.saveMarkedAsIgnore.bind(this)}>
                                        <SaveIcon />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
                { this.filedDatatable}
            </div >
        );
    }
}

RoedSchedule1.contextType = UserContext;

export default withStyles({
    mainContainer: {
        color: 'red'
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
    usrTag: {
        fontSize: '0.7rem',
        textTransform: 'uppercase',
        color: '#ffffff',
        background: '#969696',
        textAlign: 'center',
        borderRadius: '2px',
        padding: '1px 10px',
        maxWidth: '150px',
        display: 'inline-block',
        marginLeft: '30px'
    },
    usrAi: {
        background: '#31486D',
    },
    usrPc: {
        background: '#122055',
    },
    usrEi: {
        background: '#506E84',
    },
    usrIi: {
        background: '#6F919B',
    },
    regTxt: {
        color: '#122055',
        fontWeight: 400,
        fontSize: '1rem'
    }

})(RoedSchedule1);
