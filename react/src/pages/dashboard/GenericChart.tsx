import React from "react";
import MUIDataTable from "mui-datatables";
import { Backdrop, Box, Button, Fade, Grid, IconButton, Menu, MenuItem, Modal, Toolbar, Tooltip, Typography } from '@material-ui/core';
import * as FundscraperApi from "../../tsapi/api"
import { Configuration } from "../../tsapi/configuration";
import UserContext from "../../UserContext";
import ApiLoadableComponent, { IApiLoadableComponent_Props, IApiLoadableComponent_State } from "../../basePages/ApiLoadableComponent";
import withStyles from "@material-ui/styles/withStyles";
import { Theme } from "@material-ui/core/styles";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Redirect } from "react-router-dom";
import { MetricDataType, MetricDataType_chartable, MetricDataType_friendlyText, MetricFilterType, MetricFilterType_friendlyText, MetricDataType_groupings, InvestorAccreditation_friendlyText, AgeRange_friendlyText, FinancialRange_friendlyText, IncomeRange_friendlyText, Province_friendlyText, UserState_friendlyText, InvestmentOrderStatus_friendlyText, ProjectStage_friendlyText, ProvinceCode } from "fundscraper-model-enums";
import { InvestorSignupStatusFilter } from "./filters/InvestorSignupStatusFilter";
import { InvestorAccreditationLevelFilter } from "./filters/InvestorAccreditationLevelFilter";
import { InvestorAgeRangeFilter } from "./filters/InvestorAgeRangeFilter";
import { InvestorCobrandedFilter } from "./filters/InvestorCobrandedFilter";
import { InvestorAssetRangeFilter } from "./filters/InvestorAssetRangeFilter";
import { InvestorIncomeRangeFilter } from "./filters/InvestorIncomeRangeFilter";
import { InvestorProvinceFilter } from "./filters/InvestorProvinceFilter";
import { InvestorExperienceFilter } from "./filters/InvestorExperienceFilter";
import { OrderPurchaseDateFilter } from "./filters/OrderPurchaseDateFilter";
import { OrderStatusFilter } from "./filters/OrderStatusFilter";
import { ProjectStatusFilter } from "./filters/ProjectStatusFilter";
import { InvestorSignupDateFilter } from "./filters/InvestorSignupDateFilter";
import { OrderOrderDateFilter } from "./filters/OrderOrderDateFilter";

am4core.addLicense("CH259386214");
am4core.useTheme(am4themes_animated);

interface IProps extends IApiLoadableComponent_Props {
    preferenceName: string
}

interface IState extends IApiLoadableComponent_State<any> {
    anchor1El?: Element
    , anchor2El?: Element
    , anchor3El?: Element
    , primaryData: MetricDataType
    , secondaryData?: MetricDataType
    , filters: MetricFilterType[]
    , requestFilters: FundscraperApi.MetricsRequest
    , periodic: boolean
    , viewAs: 'bar' | 'table' | 'pie' | 'other'
    , filterOpen: boolean
    , filterBeingEditted: MetricFilterType
}

const mappableFilterTypes = [
    MetricFilterType.none
    , MetricFilterType.investor_age_range
    , MetricFilterType.investor_signup_status
    , MetricFilterType.investor_signup_date
    , MetricFilterType.investor_cobranded
    , MetricFilterType.investor_accreditation_level
    , MetricFilterType.investor_asset_range
    , MetricFilterType.investor_income_range
    , MetricFilterType.investor_province
    , MetricFilterType.order_status
    , MetricFilterType.order_order_date
    , MetricFilterType.order_purchase_date
    , MetricFilterType.project_status
];

/**
 * a wiget displaying simple stat's about an issuers orders
 */
class GenericChart extends ApiLoadableComponent<any, IProps, IState> {
    static chartCount = 1;
    private chart?: am4charts.Chart;
    private chartName = `chart-${GenericChart.chartCount++}`;
    private tempRequestFilters = {} as any;
    private initializing = true;
    private currentChartView?: string;

    /**
     * the configuration to use for the api
     */
    apiConfig?: Configuration;

    constructor(props: IProps) {
        super(props, {
            loading: true
            , loadError: false
            , loadErrorMessage: ''
            , data: null
            , primaryData: MetricDataType.orders_amount
            , secondaryData: MetricDataType.orders_amount
            , requestFilters: {}
            , filters: []
            , periodic: false
            , viewAs: 'bar'
            , filterOpen: false
            , filterBeingEditted: MetricFilterType.none
        } as IState);
    }

    /**
     * make the api call to get the investor
     */
    callApi(config: Configuration, stateChanges?: IState) {
        // console.log(`${this.chartName} callApi`);
        this.apiConfig = config;
        let request: any;
        if (this.initializing) {
            request = {};
            this.initializing = false;
        }
        else {
            request = { dataType: this.state.primaryData, groupByDay: this.state.periodic };
            this.copyRequestFilters(this.state.requestFilters, request);
            if (stateChanges != null) {
                if (stateChanges.requestFilters != null) {
                    //console.log(`${this.chartName} filter state changes before ${JSON.stringify(request)}`);
                    this.copyRequestFilters(stateChanges, request);
                    //console.log(`${this.chartName} filter state changes after ${JSON.stringify(request)}`);
                }
            }
            request.viewAs = this.state.viewAs;
        }

        // console.log(`${this.chartName} callApi started ${JSON.stringify(request)}`);
        let api = new FundscraperApi.DefaultApi(config);
        api.metricsApiSavePreferenceAnGet(request, this.props.preferenceName, {
            headers: { 'Authorization': 'Bearer ' + config.accessToken }
        }).then((data: any) => {
            //debugger;
            if (data == null) {
                console.log(`${this.chartName} get metrics succeeded with no data`);
            }
            else {
                // console.log(`${this.chartName} get metrics succeeded with ${JSON.stringify(data)}`);
                this.currentChartView = '';
                this.setState({
                    loading: false
                    , loadError: false
                    , data: data.values
                    , primaryData: data.request.dataType
                    , periodic: data.request.groupByDay
                    , requestFilters: data.request
                    , viewAs: data.request.viewAs
                });
            }
        });
    }

    async savePreference(optionalViewAs?: any) {
        // console.log(`${this.chartName} savePreference`);
        let user_context = this.context;
        let user_id = user_context.user.id;
        let token = (this.apiConfig == null) ? '' : this.apiConfig.accessToken;
        let api = new FundscraperApi.DefaultApi(this.apiConfig);

        let value = { dataType: this.state.primaryData, groupByDay: this.state.periodic } as any;
        this.copyRequestFilters(this.state.requestFilters, value);
        if (optionalViewAs == null)
            value.viewAs = this.state.viewAs;
        else
            value.viewAs = optionalViewAs;
        let valueAsString = JSON.stringify(value);
        let preference = { name: this.props.preferenceName, value: valueAsString } as any;

        api.allUserApiSetPreference({ preference }, user_id, {
            headers: { 'Authorization': 'Bearer ' + token }
        });
    }

    componentDidMount() {
        // console.log(`${this.chartName} componentDidMount`);
        this.loadData();

        if (this.state.viewAs !== 'table') {
            this.asBarTotalChart();
        }
    }

    componentWillUnmount() {
        // console.log(`${this.chartName} componentWillUnmount`);
        this.currentChartView = '';
        try {
            if (this.chart) {
                this.chart.dispose();
            }
        }
        catch (problem) {
            // console.log(`componentWillUnmount failure ${problem}`);
        }
    }

    /**
     * this gets called when state changes
     * reasons for state change include: showing/hiding buttons and menu's
     */
    componentDidUpdate(oldProps: any) {
        // console.log(`${this.chartName} componentDidUpdate viewAs=${this.state.viewAs} currentView=${this.currentChartView}`);
        if (this.state.data != null) {
            let values = this.state.data;

            if (this.state.viewAs == 'pie')
                this.asPieChart();
            else if (this.state.viewAs == 'table') {
                //this.asTable();
            }
            else if (this.state.viewAs == 'bar') {
                if (this.state.periodic)
                    this.asPeriodicBarChart();
                else
                    this.asBarTotalChart();
            }
            else {
                if (this.state.periodic)
                    this.asPeriodicLineChart();
                else
                    this.asFunnelChart();
            }

            if (this.chart != null) {
                let areDifferent = this.chart.data == null;
                if (!areDifferent) {
                    if (this.state.data.length !== this.chart.data.length)
                        areDifferent = true;
                    else {
                        let index = 0;
                        while (index < this.state.data.length && !areDifferent) {
                            let current = this.chart.data[index];
                            let state = this.state.data[index];
                            areDifferent = current.value !== state.value || current.label !== state.label;
                            index++;
                        }
                    }
                }

                if (areDifferent) {
                    this.chart.data = values;
                    // console.log(`${this.chartName} componentDidUpdate set values`);
                }
            }
        }
    }

    makeChartPeriodic(chart: am4charts.XYChart) {
        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.minGridDistance = 40;
        dateAxis.renderer.fullWidthTooltip = true;
        dateAxis.groupData = false;
        dateAxis.groupCount = 30;

        dateAxis.groupIntervals.setAll([
            { timeUnit: "day", count: 1 },
            { timeUnit: "week", count: 1 },
            { timeUnit: "month", count: 1 },
            { timeUnit: "year", count: 1 }
        ]);

        let earliest = (new Date('2017-01-01')).getTime();
        let filters = this.state.requestFilters as any;
        let startingOrderPurchaseDate = (typeof filters.startingOrderPurchaseDate === 'string') ? new Date(filters.startingOrderPurchaseDate) : filters.startingOrderPurchaseDate;
        if (startingOrderPurchaseDate != null && startingOrderPurchaseDate.getTime() > earliest)
            earliest = startingOrderPurchaseDate.getTime();

        let startingOrderOrderDate = (typeof filters.startingOrderOrderDate === 'string') ? new Date(filters.startingOrderOrderDate) : filters.startingOrderOrderDate;
        if (startingOrderOrderDate != null && startingOrderOrderDate.getTime() > earliest)
            earliest = startingOrderOrderDate.getTime();

        let startingSignupDate = (typeof filters.startingSignupDate === 'string') ? new Date(filters.startingSignupDate) : filters.startingSignupDate;
        if (startingSignupDate != null && startingSignupDate.getTime() > earliest)
            earliest = startingSignupDate.getTime();
        dateAxis.min = earliest;

        let today = new Date();
        let latest = (new Date(today.getFullYear(), today.getMonth(), today.getDate())).getTime();
        let endingOrderPurchaseDate = (typeof filters.endingOrderPurchaseDate === 'string') ? new Date(filters.endingOrderPurchaseDate) : filters.endingOrderPurchaseDate;
        if (endingOrderPurchaseDate != null && endingOrderPurchaseDate.getTime() < latest)
            latest = endingOrderPurchaseDate.getTime();

        let endingOrderOrderDate = (typeof filters.endingOrderOrderDate === 'string') ? new Date(filters.endingOrderOrderDate) : filters.endingOrderOrderDate;
        if (endingOrderOrderDate != null && endingOrderOrderDate.getTime() < latest)
            latest = endingOrderOrderDate.getTime();

        let endingSignupDate = (typeof filters.endingSignupDate === 'string') ? new Date(filters.endingSignupDate) : filters.endingSignupDate;
        if (endingSignupDate != null && endingSignupDate.getTime() < latest)
            latest = endingSignupDate.getTime();
        dateAxis.max = latest;
    }

    asBarTotalChart() {
        if (this.currentChartView !== 'asBarTotalChart') {
            // console.log(`${this.chartName} asBarTotalChart`);
            this.componentWillUnmount();

            let chart = am4core.create(this.chartName, am4charts.XYChart);
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "label";
            chart.yAxes.push(new am4charts.ValueAxis());
            var mainSeries = chart.series.push(new am4charts.ColumnSeries());
            mainSeries.nonScaling = true;
            mainSeries.dataFields.valueY = "value";
            mainSeries.dataFields.categoryX = "label";
            mainSeries.tooltipText = "{valueY}";
            mainSeries.name = "Value";
            chart.cursor = new am4charts.XYCursor();
            chart.legend = new am4charts.Legend();
            chart.legend.fontSize = "10";
            this.chart = chart;
            this.currentChartView = 'asBarTotalChart';
        }
    }

    asPieChart() {
        if (this.currentChartView !== 'asPieChart') {
            // console.log(`${this.chartName} asPieChart`);
            this.componentWillUnmount();

            let chart = am4core.create(this.chartName, am4charts.PieChart);
            var pieSeries = chart.series.push(new am4charts.PieSeries());
            pieSeries.dataFields.value = "value";
            pieSeries.dataFields.category = "label";
            pieSeries.labels.template.disabled = true;
            chart.legend = new am4charts.Legend();
            chart.legend.position = "right";
            chart.legend.fontSize = "10";
            this.chart = chart;
            this.currentChartView = 'asPieChart';
        }
    }

    asFunnelChart() {
        if (this.currentChartView !== 'asFunnelChart') {
            // console.log(`${this.chartName} asFunnelChart`);
            this.componentWillUnmount();

            let chart = am4core.create(this.chartName, am4charts.SlicedChart);
            var mainSeries = chart.series.push(new am4charts.FunnelSeries());
            mainSeries.dataFields.value = "value";
            mainSeries.dataFields.category = "label";
            chart.legend = new am4charts.Legend();
            chart.legend.position = "right";
            chart.legend.fontSize = "10";
            this.chart = chart;
            this.currentChartView = 'asFunnelChart';
        }
    }

    asPeriodicBarChart() {
        if (this.currentChartView !== 'asPeriodicBarChart') {
            // console.log(`${this.chartName} asPeriodicBarChart`);
            this.componentWillUnmount();

            let chart = am4core.create(this.chartName, am4charts.XYChart);
            chart.scrollbarX = new am4core.Scrollbar();
            this.makeChartPeriodic(chart);

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.title.text = "Value";

            let grouping = MetricDataType_groupings[this.state.primaryData];
            if (grouping == null) {
                var mainSeries = chart.series.push(new am4charts.ColumnSeries());
                mainSeries.dataFields.valueY = "value";
                mainSeries.groupFields.valueY = "sum";
                mainSeries.dataFields.dateX = "date";
                mainSeries.yAxis = valueAxis;
                mainSeries.tooltipText = "{valueY}";
                mainSeries.name = "Values"; // the enum or other value to stack
                mainSeries.stacked = true;
            }
            else {
                let keys = Object.keys(grouping);
                for (let index = 0; index < keys.length; index++) {
                    let key = keys[index] as any;
                    let group = grouping[key];
                    var itemSeries = chart.series.push(new am4charts.ColumnSeries());
                    itemSeries.dataFields.valueY = group;
                    itemSeries.groupFields.valueY = "sum";
                    itemSeries.dataFields.dateX = "date";
                    itemSeries.yAxis = valueAxis;
                    itemSeries.tooltipText = `{valueY} ${group}`;
                    itemSeries.name = group; // the enum or other value to stack
                    itemSeries.stacked = true;
                }
                var unknownSeries = chart.series.push(new am4charts.ColumnSeries());
                unknownSeries.dataFields.valueY = 'Unknown';
                unknownSeries.groupFields.valueY = "sum";
                unknownSeries.dataFields.dateX = "date";
                unknownSeries.yAxis = valueAxis;
                unknownSeries.tooltipText = `{valueY} Unknown`;
                unknownSeries.name = 'Unknown'; // the enum or other value to stack
                unknownSeries.stacked = true;
            }

            chart.cursor = new am4charts.XYCursor();
            chart.legend = new am4charts.Legend();
            chart.legend.fontSize = "10";
            this.chart = chart;
            this.currentChartView = 'asPeriodicBarChart';
        }
    }

    asPeriodicLineChart() {
        if (this.currentChartView !== 'asPeriodicLineChart') {
            // console.log(`${this.chartName} asPeriodicLineChart`);
            this.componentWillUnmount();

            let chart = am4core.create(this.chartName, am4charts.XYChart);
            this.makeChartPeriodic(chart);

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.title.text = "Value";
            var mainSeries = chart.series.push(new am4charts.LineSeries());
            mainSeries.dataFields.valueY = "value";
            mainSeries.groupFields.valueY = "sum";
            mainSeries.dataFields.dateX = "date";
            mainSeries.yAxis = valueAxis;
            mainSeries.tooltipText = "{valueY}";
            mainSeries.name = "Values";
            chart.cursor = new am4charts.XYCursor();
            chart.legend = new am4charts.Legend();
            chart.legend.fontSize = "10";
            this.chart = chart;
            this.currentChartView = 'asPeriodicLineChart';
        }
    }

    asTable() {
        if (this.currentChartView !== 'asTable') {
            // console.log(`${this.chartName} asTable`);
            this.componentWillUnmount();
            let columns;
            if (this.state.periodic === true)
                columns = [
                    {
                        name: "date",
                        label: "Date",
                        options: {
                            filter: true,
                            sort: true,
                        }
                    },
                    {
                        name: "label",
                        label: "Label",
                        options: {
                            filter: false,
                            sort: false,
                        }
                    },
                    {
                        name: "value",
                        label: "Values",
                        options: {
                            filter: true,
                            sort: true,
                        }
                    },
                ];
            else
                columns = [
                    {
                        name: "label",
                        label: "Label",
                        options: {
                            filter: false,
                            sort: false,
                        }
                    },
                    {
                        name: "value",
                        label: "Values",
                        options: {
                            filter: true,
                            sort: true,
                        }
                    },
                ];

            const options = {
                pagination: true,
                tableBodyHeight: "130px",
            };

            this.currentChartView = 'asTable';
            return <div style={{ width: "100%", height: "250px" }}>
                <MUIDataTable title={"Table"} data={this.state.data} columns={columns} options={options} />
            </div>;
        }
    }

    handlePrimaryDataMenuClick(event: any) {
        //console.log(`${this.chartName} click`);
        this.setState({ anchor1El: event.currentTarget });
    };

    handlePrimaryDataMenuItemClick(event: any, index: any) {
        // console.log(`${this.chartName} primary menu click ${index}`);
        this.setState({ primaryData: MetricDataType_chartable[index], anchor1El: undefined });
        this.loadData();
    }

    handlePrimaryDataMenuClose() {
        this.setState({ anchor1El: undefined });
    };

    handleSecondaryDataMenuClick(event: any) {
        // console.log(`${this.chartName} click`);
        this.setState({ anchor2El: event.currentTarget });
    };

    handleSecondaryDataMenuItemClick(event: any, index: any) {
        // console.log(`${this.chartName} secondary menu click`);
        let secondaryData;
        if (index === 0)
            secondaryData = undefined;
        else
            secondaryData = MetricDataType_chartable[index - 1];
        this.setState({ secondaryData: secondaryData, anchor2El: undefined });
        this.loadData();
    }

    handleSecondaryDataMenuClose() {
        this.setState({ anchor2El: undefined });
    };

    handleFilterDataMenuClick(event: any) {
        // console.log(`${this.chartName} click`);
        this.setState({ anchor3El: event.currentTarget });
    };

    handleFilterDataMenuItemClick(event: any, index: any) {
        // console.log(`${this.chartName} handleFilterDataMenuItemClick`);
        let newFilters = this.state.filters;
        let requestFilters = this.state.requestFilters;;
        let choice = mappableFilterTypes[index] as MetricFilterType;
        let addedOne = false;

        if (choice === MetricFilterType.none) {
            newFilters = [];
            requestFilters = {
                'signupDateRange': null
                , 'startingSignupDate': null
                , 'endingSignupDate': null
                , 'accreditationFilter': null
                , 'ageRangeFilter': null
                , 'assetRangeFilter': null
                , 'cobrandedFilter': null
                , 'incomeRangeFilter': null
                , 'provinceCodeFilter': null
                , 'signupStatusFilter': null
                , 'orderStatusFilter': null
                , 'orderPlacedDateRange': null
                , 'startingOrderOrderDate': null
                , 'endingOrderOrderDate': null
                , 'orderPurchaseDateRange': null
                , 'startingOrderPurchaseDate': null
                , 'endingOrderPurchaseDate': null
                , 'projectStatusFilter': null
            } as any;
        }
        else {
            let filterIndex = this.state.filters.indexOf(choice);
            if (filterIndex === -1) {
                newFilters.push(choice);
            }
            addedOne = true;
        }

        // if we select none here, then it means we have changed the filter values. other than that, we wait for the dialog to complete
        if (choice === MetricFilterType.none && this.state.filters.length > 0) {
            // console.log(`${this.chartName} handleFilterDataMenuItemClick reloading data ${JSON.stringify(requestFilters)}`);
            this.tempRequestFilters = {};
            this.loadData({ filters: newFilters, requestFilters: requestFilters, filterOpen: addedOne, filterBeingEditted: choice, anchor3El: undefined } as IState);
        }
        else
            this.setState({ filters: newFilters, requestFilters: requestFilters, filterOpen: addedOne, filterBeingEditted: choice, anchor3El: undefined });
    }

    handleFilterDataMenuClose() {
        this.setState({ anchor3El: undefined, requestFilters: this.tempRequestFilters });
    };

    setTotals() {
        // console.log(`${this.chartName} setTotals`);
        this.loadData({ periodic: false } as IState);
        /*
        if (this.state.viewAs === 'bar')
            this.asBarTotalChart();
        else
            this.asPieChart();
        this.setState({ periodic: false });
        */
    }

    setPeriodic() {
        // console.log(`${this.chartName} setPeriodic`);
        this.loadData({ periodic: true, viewAs: 'bar' } as IState);
        /*
        if (this.state.viewAs === 'bar' || this.state.viewAs === 'pie')
            this.asPeriodicBarChart();
        else
            this.asPeriodicLineChart();
        this.setState({ periodic: true, viewAs: 'bar' });
            */
    }

    setAsTotalsBar() {
        // console.log(`${this.chartName} setAsTotalsBar`);
        //this.asBarTotalChart();
        this.setState({ viewAs: 'bar' });
        this.savePreference('bar');
    }

    setAsPie() {
        // console.log(`${this.chartName} setAsPie`);
        //this.asPieChart();
        this.setState({ viewAs: 'pie' });
        this.savePreference('pie');
    }

    setAsFunnel() {
        // console.log(`${this.chartName} setAsFunnel`);
        //this.asFunnelChart();
        this.setState({ viewAs: 'other' });
        this.savePreference('other');
    }

    setAsPeriodicbar() {
        // console.log(`${this.chartName} setAsPeriodicbar`);
        //this.asPeriodicBarChart();
        this.setState({ viewAs: 'bar' });
        this.savePreference('bar');
    }

    setAsLine() {
        // console.log(`${this.chartName} setAsLine`);
        //this.asPeriodicLineChart();
        this.setState({ viewAs: 'other' });
        this.savePreference('other');
    }

    setAsTable() {
        this.setState({ viewAs: 'table' });
        this.savePreference('table');
    }

    handleFilterClose() {
        // console.log(`${this.chartName} handleFilterClose temp filter ${JSON.stringify(this.tempRequestFilters)}`);
        // NOTE: this is when the filters get copied
        //this.setState({ filterOpen: false, requestFilters: this.tempRequestFilters });
        this.loadData({ filterOpen: false, requestFilters: this.tempRequestFilters } as IState);
    }

    copyRequestFilters(source: any, target: any) {
        let itemsSet = Object.keys(source);

        if (itemsSet.indexOf('signupDateRange') !== -1)
            target['signupDateRange'] = source.signupDateRange;
        if (itemsSet.indexOf('startingSignupDate') !== -1)
            target['startingSignupDate'] = source.startingSignupDate;
        if (itemsSet.indexOf('endingSignupDate') !== -1)
            target['endingSignupDate'] = source.endingSignupDate;

        if (itemsSet.indexOf('accreditationFilter') !== -1)
            target['accreditationFilter'] = source.accreditationFilter;
        if (itemsSet.indexOf('ageRangeFilter') !== -1)
            target['ageRangeFilter'] = source.ageRangeFilter;
        if (itemsSet.indexOf('assetRangeFilter') !== -1)
            target['assetRangeFilter'] = source.assetRangeFilter;
        if (itemsSet.indexOf('cobrandedFilter') !== -1)
            target['cobrandedFilter'] = source.cobrandedFilter;
        if (itemsSet.indexOf('incomeRangeFilter') !== -1)
            target['incomeRangeFilter'] = source.incomeRangeFilter;
        if (itemsSet.indexOf('provinceCodeFilter') !== -1)
            target['provinceCodeFilter'] = source.provinceCodeFilter; 
        if (itemsSet.indexOf('signupStatusFilter') !== -1)
            target['signupStatusFilter'] = source.signupStatusFilter;
        if (itemsSet.indexOf('orderStatusFilter') !== -1)
            target['orderStatusFilter'] = source.orderStatusFilter;

        if (itemsSet.indexOf('orderPlacedDateRange') !== -1)
            target['orderPlacedDateRange'] = source.orderPlacedDateRange;
        if (itemsSet.indexOf('startingOrderOrderDate') !== -1)
            target['startingOrderOrderDate'] = source.startingOrderOrderDate;
        if (itemsSet.indexOf('endingOrderOrderDate') !== -1)
            target['endingOrderOrderDate'] = source.endingOrderOrderDate;

        if (itemsSet.indexOf('orderPurchaseDateRange') !== -1)
            target['orderPurchaseDateRange'] = source.orderPurchaseDateRange;
        if (itemsSet.indexOf('startingOrderPurchaseDate') !== -1)
            target['startingOrderPurchaseDate'] = source.startingOrderPurchaseDate;
        if (itemsSet.indexOf('endingOrderPurchaseDate') !== -1)
            target['endingOrderPurchaseDate'] = source.endingOrderPurchaseDate;

        if (itemsSet.indexOf('projectStatusFilter') !== -1)
            target['projectStatusFilter'] = source.projectStatusFilter;
    }

    handleFilterSpecifics(specifics: any) {
        // console.log(`${this.chartName} handleFilterSpecifics in specifics ${JSON.stringify(specifics)} temp filter ${JSON.stringify(this.tempRequestFilters)}`);
        this.copyRequestFilters(specifics, this.tempRequestFilters);
    }

    // not required since we are overriding render
    renderData() { }

    /**
     * produce the text of a default title
     */
    defaultTitle(): string {
        return MetricDataType_friendlyText[this.state.primaryData];
    }

    translateFilterArrayToString(filters: any, friendlyText: any): string {
        let result = '';
        //debugger;
        for (let index = 0; index < filters.length; index++) {
            let filter = filters[index];
            if (result !== '')
                result += ', ';
            result += friendlyText[filter];
        }

        return result;
    }

    dateFilterToText(date: any): string {
        let dateToConvert = typeof date === 'string' ? new Date(date) : date;
        return dateToConvert.toLocaleDateString();
    }

    /**
     * produce the text of annotations to be included asside a title
     */
    defaultTitleAnnotations(): string {
        let pieces = [];

        let source = this.state.requestFilters as any;
        let itemsSet = Object.keys(source);

        if (itemsSet.indexOf('signupDateRange') !== -1 && source.signupDateRange != null)
            pieces.push(`Signup is ${this.translateFilterArrayToString([source.signupDateRange], RelativeDateRange_friendlyText)}`);
        else {
            if (itemsSet.indexOf('startingSignupDate') !== -1 && source.startingSignupDate != null)
                pieces.push(`Signup After ${this.dateFilterToText(source.startingSignupDate)}`);
            if (itemsSet.indexOf('endingSignupDate') !== -1 && source.endingSignupDate != null)
                pieces.push(`Signup Before ${this.dateFilterToText(source.endingSignupDate)}`);
        }
        if (itemsSet.indexOf('orderPlacedDateRange') !== -1 && source.orderPlacedDateRange != null)
            pieces.push(`Order Placed is ${this.translateFilterArrayToString([source.orderPlacedDateRange], RelativeDateRange_friendlyText)}`);
        else {
            if (itemsSet.indexOf('startingOrderOrderDate') !== -1 && source.startingOrderOrderDate != null)
                pieces.push(`Order Placed After ${this.dateFilterToText(source.startingOrderOrderDate)}`);
            if (itemsSet.indexOf('endingOrderOrderDate') !== -1 && source.endingOrderOrderDate != null)
                pieces.push(`Order Placed Before ${this.dateFilterToText(source.endingOrderOrderDate)}`);
        }
        if (itemsSet.indexOf('orderPurchaseDateRange') !== -1 && source.orderPurchaseDateRange != null)
            pieces.push(`Order Purchased is ${this.translateFilterArrayToString([source.orderPurchaseDateRange], RelativeDateRange_friendlyText)}`);
        else {
            if (itemsSet.indexOf('startingOrderPurchaseDate') !== -1 && source.startingOrderPurchaseDate != null)
                pieces.push(`Order Purchased After ${this.dateFilterToText(source.startingOrderPurchaseDate)}`);
            if (itemsSet.indexOf('endingOrderPurchaseDate') !== -1 && source.endingOrderPurchaseDate != null)
                pieces.push(`Order Purchased Before ${this.dateFilterToText(source.endingOrderPurchaseDate)}`);
        }

        if (itemsSet.indexOf('accreditationFilter') !== -1 && source.accreditationFilter != null)
            pieces.push(`Accreditation is ${this.translateFilterArrayToString(source.accreditationFilter, InvestorAccreditation_friendlyText)}`);
        if (itemsSet.indexOf('ageRangeFilter') !== -1 && source.ageRangeFilter != null)
            pieces.push(`Age Range is ${this.translateFilterArrayToString(source.ageRangeFilter, AgeRange_friendlyText)}`);
        if (itemsSet.indexOf('assetRangeFilter') !== -1 && source.assetRangeFilter != null)
            pieces.push(`Asset Range is ${this.translateFilterArrayToString(source.assetRangeFilter, FinancialRange_friendlyText)}`);
        if (itemsSet.indexOf('incomeRangeFilter') !== -1 && source.incomeRangeFilter != null)
            pieces.push(`Income Range is ${this.translateFilterArrayToString(source.incomeRangeFilter, IncomeRange_friendlyText)}`);
        if (itemsSet.indexOf('signupStatusFilter') !== -1 && source.signupStatusFilter != null)
            pieces.push(`Signup Status is ${this.translateFilterArrayToString(source.signupStatusFilter, UserState_friendlyText)}`);
        if (itemsSet.indexOf('orderStatusFilter') !== -1 && source.orderStatusFilter != null)
            pieces.push(`Order Status is ${this.translateFilterArrayToString(source.orderStatusFilter, InvestmentOrderStatus_friendlyText)}`);
        if (itemsSet.indexOf('projectStatusFilter') !== -1 && source.projectStatusFilter != null)
            pieces.push(`Project Status is ${this.translateFilterArrayToString(source.projectStatusFilter, ProjectStage_friendlyText)}`);
        if (itemsSet.indexOf('provinceCodeFilter') !== -1 && source.provinceCodeFilter != null) {
            let numericalFilters = [] as string[];
            (source.provinceCodeFilter as ProvinceCode[]).forEach(filter => {
                //debugger;
                let provId = ProvinceCode[filter];
                numericalFilters.push(provId);
            });
            pieces.push(`Province is ${this.translateFilterArrayToString(numericalFilters, Province_friendlyText)}`);
        } 

        if (itemsSet.indexOf('cobrandedFilter') !== -1 && source.cobrandedFilter != null) {
            let text = source.cobrandedFilter === true ? 'Cobranded' : 'Not Cobranded';
            pieces.push(text);
        }

        if (pieces.length === 0)
            return 'Unfiltered';

        let result = '';
        pieces.forEach((piece) => {
            if (result !== '')
                result += ', ';
            result += piece;
        });

        return result;
    }

    render() {
        let classes = (this.props as any).classes;
        // console.log(`${this.chartName} render`);

        let user_context = this.context;
        if (user_context.no_access === true)
            return <Redirect to='/noAccess' />

        if (this.state.loadError === true)
            return this.rendrError();

        let extraBody;
        if (this.state.loading === true)
            return this.renderLoading();
        else if (this.state.data === null || this.state.data === undefined)
            extraBody = this.renderDoesNotExist();
        else
            extraBody = '';

        let periodicButton = (this.state.periodic === true) ?
            <Tooltip title="View data as totals">
                <IconButton id="totals_Chart"
                    onClick={this.setTotals.bind(this)}>
                    <img alt='Totals' src='generic-chart/table.png'></img>
                </IconButton>
            </Tooltip>
            : <Tooltip title="View data across time">
                <IconButton id="periodic_chart"
                    onClick={this.setPeriodic.bind(this)}>
                    <img alt='Over time' src='generic-chart/table-clock.png'></img>
                </IconButton>
            </Tooltip>;

        let chartTypeButton;
        let secondChartTypeButton;
        if (this.state.periodic === false) {
            if ((this.state.viewAs === 'bar')) {
                chartTypeButton = <Tooltip title="View as pie chart">
                    <IconButton id="view_as_pie_chart"
                        onClick={this.setAsPie.bind(this)}>
                        <img alt='Pie chart' src='generic-chart/chart-pie.png'></img>
                    </IconButton>
                </Tooltip>;
                secondChartTypeButton = <Tooltip title="View as funnel chart">
                    <IconButton id="view_as_funnel_chart"
                        onClick={this.setAsFunnel.bind(this)}>
                        <img src='generic-chart/funnel.png'></img>
                    </IconButton>
                </Tooltip>;
            }
            else if ((this.state.viewAs == 'pie')) {
                chartTypeButton = <Tooltip title="View as bar chart">
                    <IconButton id="view_as_total_bar_chart"
                        onClick={this.setAsTotalsBar.bind(this)}>
                        <img alt='Bar Chart' src='generic-chart/chart-bar.png'></img>
                    </IconButton>
                </Tooltip>;
                secondChartTypeButton = <Tooltip title="View as funnel chart">
                    <IconButton id="view_as_funnel_chart"
                        onClick={this.setAsFunnel.bind(this)}>
                        <img src='generic-chart/funnel.png'></img>
                    </IconButton>
                </Tooltip>;
            }
            else {
                chartTypeButton = <Tooltip title="View as pie chart">
                    <IconButton id="view_as_pie_chart"
                        onClick={this.setAsPie.bind(this)}>
                        <img src='generic-chart/chart-pie.png'></img>
                    </IconButton>
                </Tooltip>;
                secondChartTypeButton = <Tooltip title="View as bar chart">
                    <IconButton id="view_as_total_bar_chart"
                        onClick={this.setAsTotalsBar.bind(this)}>
                        <img src='generic-chart/chart-bar.png'></img>
                    </IconButton>
                </Tooltip>;
            }
        }
        else {
            if (this.state.viewAs === 'bar')
                chartTypeButton = <Tooltip title="View as line chart">
                    <IconButton id="view_as_line_chart"
                        onClick={this.setAsLine.bind(this)}>
                        <img alt='Line Chart' src='generic-chart/chart-line.png'></img>
                    </IconButton>
                </Tooltip>;
            else
                chartTypeButton = <Tooltip title="View as bar chart">
                    <IconButton id="view_as_periodic_bar_chart"
                        onClick={this.setAsPeriodicbar.bind(this)}>
                        <img alt='Bar Chart' src='generic-chart/chart-bar.png'></img>
                    </IconButton>
                </Tooltip>;
        }

        let asTable = (this.state.viewAs !== 'table') ?
            <Tooltip title="View data as a table">
                <IconButton id="table"
                    onClick={this.setAsTable.bind(this)}>
                    <img alt='As Table' src='generic-chart/table.png'></img>
                </IconButton>
            </Tooltip>
            : '';
        let filterComponent;
        switch (this.state.filterBeingEditted) {
            case MetricFilterType.investor_age_range:
                filterComponent = <InvestorAgeRangeFilter onChange={this.handleFilterSpecifics.bind(this)} />;
                break;
            case MetricFilterType.investor_signup_status:
                filterComponent = <InvestorSignupStatusFilter onChange={this.handleFilterSpecifics.bind(this)} />;
                break;
            case MetricFilterType.investor_signup_date:
                filterComponent = <InvestorSignupDateFilter onChange={this.handleFilterSpecifics.bind(this)} />;
                break;
            case MetricFilterType.investor_cobranded:
                filterComponent = <InvestorCobrandedFilter onChange={this.handleFilterSpecifics.bind(this)} />;
                break;
            case MetricFilterType.investor_accreditation_level:
                filterComponent = <InvestorAccreditationLevelFilter onChange={this.handleFilterSpecifics.bind(this)} />;
                break;
            case MetricFilterType.investor_asset_range:
                filterComponent = <InvestorAssetRangeFilter onChange={this.handleFilterSpecifics.bind(this)} />;
                break;
            case MetricFilterType.investor_income_range:
                filterComponent = <InvestorIncomeRangeFilter onChange={this.handleFilterSpecifics.bind(this)} />;
                break;
            case MetricFilterType.investor_province:
                filterComponent = <InvestorProvinceFilter onChange={this.handleFilterSpecifics.bind(this)} />;
                break; 
            case MetricFilterType.order_status:
                filterComponent = <OrderStatusFilter onChange={this.handleFilterSpecifics.bind(this)} />;
                break;
            case MetricFilterType.order_order_date:
                filterComponent = <OrderOrderDateFilter onChange={this.handleFilterSpecifics.bind(this)} />;
                break;
            case MetricFilterType.order_purchase_date:
                filterComponent = <OrderPurchaseDateFilter onChange={this.handleFilterSpecifics.bind(this)} />;
                break;
            case MetricFilterType.project_status:
                filterComponent = <ProjectStatusFilter onChange={this.handleFilterSpecifics.bind(this)} />;
                break;
        }

        let content = (this.state.viewAs === 'table') ? this.asTable() :
            <div id={this.chartName} style={{ width: "100%", height: "250px" }}></div>;

        return (
            <Grid container>
                <Grid container item xs={12} sm={12}>
                    <div className={classes.titleBox}>
                        <Typography className={classes.titleTxt}>{this.defaultTitle()}</Typography><Typography className={classes.titleTxtAnnotation}> ({this.defaultTitleAnnotations()})</Typography>
                    </div>
                </Grid>
                {extraBody}
                {content}

                <Grid item xs={12} sm={12} id='chart_settings' >
                    <Grid container item xs={2} sm={2}>
                        <Toolbar>
                            <Tooltip title="Set what is shown as primary data in the chart">
                                <IconButton id="data1_settings" onClick={this.handlePrimaryDataMenuClick.bind(this)} >
                                    <img alt='Primary Data' src='generic-chart/database-cog.png'></img>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                id="customized-menu1"
                                anchorEl={this.state.anchor1El}
                                keepMounted
                                open={Boolean(this.state.anchor1El)}
                                onClose={this.handlePrimaryDataMenuClose.bind(this)} >
                                {MetricDataType_chartable.map((option, index) => (
                                    <MenuItem
                                        key={option}
                                        selected={MetricDataType_chartable[index] === this.state.primaryData}
                                        onClick={(event) => this.handlePrimaryDataMenuItemClick(event, index)}
                                    >
                                        {MetricDataType_friendlyText[option]}
                                    </MenuItem>
                                ))}
                            </Menu>
                            {periodicButton}
                            {chartTypeButton}
                            {secondChartTypeButton}
                            {asTable}
                            <Tooltip title="Set what filters are applied to focus the data shown">
                                <IconButton id="filter_settings" onClick={this.handleFilterDataMenuClick.bind(this)} >
                                    <img alt='Filters' src='generic-chart/filter-menu.png'></img>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                id="customized-menu3"
                                anchorEl={this.state.anchor3El}
                                keepMounted
                                open={Boolean(this.state.anchor3El)}
                                onClose={this.handleFilterDataMenuClose.bind(this)} >
                                {mappableFilterTypes.map((option, index) => (
                                    <MenuItem
                                        key={option}
                                        selected={index !== 0 && this.state.filters.indexOf(mappableFilterTypes[index]) !== -1}
                                        onClick={(event) => this.handleFilterDataMenuItemClick(event, index)}
                                    >
                                        {MetricFilterType_friendlyText[mappableFilterTypes[index]]}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Toolbar>
                    </Grid>
                </Grid>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={this.state.filterOpen}
                    onClose={this.handleFilterClose.bind(this)}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={this.state.filterOpen}>
                        <Box className={classes.modalPaper} boxShadow={4}>
                            <Typography className={classes.titleTxt}>{MetricFilterType_friendlyText[this.state.filterBeingEditted]}</Typography>
                            {filterComponent}
                            <Button className={classes.closeButton} type="button" onClick={this.handleFilterClose.bind(this)}>
                                Close
                            </Button>
                        </Box>
                    </Fade>
                </Modal>
            </Grid >
        );
    }
}
/*
this is the section to add the secondary chart data menu
turn off for the moment

                            <Tooltip title="Set what is shown as secondary data in the chart">
                                <IconButton id="data2_settings" onClick={this.handleSecondaryDataMenuClick.bind(this)} >
                                    <img alt='Secondary Data' src='generic-chart/database-cog-outline.png'></img>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                id="customized-menu2"
                                anchorEl={this.state.anchor2El}
                                keepMounted
                                open={Boolean(this.state.anchor2El)}
                                onClose={this.handleSecondaryDataMenuClose.bind(this)} >
                                <MenuItem
                                    key='None'
                                    selected={undefined === this.state.secondaryData}
                                    onClick={(event) => this.handleSecondaryDataMenuItemClick(event, 0)}
                                >
                                    {'None'}
                                </MenuItem>
                                {MetricDataType_chartable.map((option, index) => (
                                    <MenuItem
                                        key={option}
                                        selected={MetricDataType_chartable[index] === this.state.secondaryData}
                                        onClick={(event) => this.handleSecondaryDataMenuItemClick(event, index)}
                                    >
                                        {MetricDataType_friendlyText[option]}
                                    </MenuItem>
                                ))}
                            </Menu>
*/
GenericChart.contextType = UserContext;

export default withStyles((theme: Theme) => ({
    titleIcon: {
        textAlign: 'center',
        float: 'right'
    },
    titleBox: {
        width: '100%'
        , textAlign: 'center'
    },
    titleTxt: {
        fontSize: '1.2rem',
        display: 'inline-block',
        width: 'fit-content',
        textAlign: 'center',
        color: theme.palette.text.primary
    },
    titleTxtAnnotation: {
        fontSize: '.8rem',
        display: 'inline-block',
        width: 'fit-content',
        textAlign: 'left',
        color: theme.palette.text.primary,
        marginLeft: '5px',
    },
    bodyTxt: {
        fontSize: '1.0rem',
        textAlign: 'center',
        color: '#5154D3'
    }
    , modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
    , modalPaper: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
    }
    , closeButton: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
}), { withTheme: true })(GenericChart);
function RelativeDateRange_friendlyText(signupDateRange: any, RelativeDateRange_friendlyText: any) {
    throw new Error("Function not implemented.");
}

