import React, { Component } from 'react';
import { FormControl, FormControlLabel, Grid, Radio, RadioGroup } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { RelativeDateRange } from 'fundscraper-model-enums';

interface IProps {
    onChange: any
}

interface IState {
    selected: string;
    start?: Date | null;
    end?: Date | null;
}

export class OrderOrderDateFilter extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        let end = new Date();
        let start = new Date();
        start.setDate(start.getDate() - 7);
        this.state = { selected: 'last_week', start: start, end: end };
        let specifics = { startingOrderOrderDate: start, endingOrderOrderDate: end };
        this.props.onChange(specifics);
    }

    handleSelectionChange(event: any, index: any) {
        let start;
        let end;
        let dateRange;

        if (index === 'specified') {
            dateRange = RelativeDateRange.specified;
            end = this.state.end;
            start = this.state.start;
        }
        else {
            switch (index) {
                case "last_week":
                    dateRange = RelativeDateRange.lastWeek;
                    break;
                case "last_4_weeks":
                    dateRange = RelativeDateRange.last_4_weeks;
                    break;
                case "last_3_months":
                    dateRange = RelativeDateRange.last_3_months;
                    break;
                case "last_12_months":
                    dateRange = RelativeDateRange.last_12_months;
                    break;
                default:
                    dateRange = RelativeDateRange.lastWeek;
            }
            let actual = RelativeDateRange.computeCurrentDates(dateRange);
            start = actual.start;
            end = actual.end;
        }
        console.log(`handleSelectionChange ${start?.toISOString()} to ${end?.toISOString()}`);
        this.setState({ selected: index, start: start, end: end });
        if (this.props.onChange !== undefined) {
            let specifics = { orderPlacedDateRange: dateRange, startingOrderOrderDate: start, endingOrderOrderDate: end };
            this.props.onChange(specifics);
        }
    }

    handleStartDateChange(date: Date | null) {
        this.setState({ start: date });
        if (this.props.onChange !== undefined) {
            let specifics = { startingOrderOrderDate: date, endingOrderOrderDate: this.state.end };
            this.props.onChange(specifics);
        }
    };

    handleEndDateChange(date: Date | null) {
        this.setState({ end: date });
        if (this.props.onChange !== undefined) {
            let specifics = { startingOrderOrderDate: this.state.start, endingOrderOrderDate: date };
            this.props.onChange(specifics);
        }
    };

    render() {
        return (
            <Grid container item xs={12} sm={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <FormControl component="fieldset">
                        <RadioGroup aria-label="gender" name="gender1" value={this.state.selected} onChange={this.handleSelectionChange.bind(this)}>
                            <FormControlLabel value="last_week" control={<Radio />} label="Last Week" />
                            <FormControlLabel value="last_4_weeks" control={<Radio />} label="Last 4 Weeks" />
                            <FormControlLabel value="last_3_months" control={<Radio />} label="Last 3 Months" />
                            <FormControlLabel value="last_12_months" control={<Radio />} label="Last 12 Months" />
                            <FormControlLabel value="specified" control={<Radio />} label="Specified" />
                        </RadioGroup>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            disabled={this.state.selected !== "specified"}
                            margin="normal"
                            id="start-date"
                            label="Starting"
                            value={this.state.start}
                            onChange={this.handleStartDateChange.bind(this)}
                            KeyboardButtonProps={{
                                'aria-label': 'starting',
                            }}
                        />
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            disabled={this.state.selected !== "specified"}
                            margin="normal"
                            id="end-date"
                            label="Ending"
                            value={this.state.end}
                            onChange={this.handleEndDateChange.bind(this)}
                            KeyboardButtonProps={{
                                'aria-label': 'ending',
                            }}
                        />
                    </FormControl>
                </MuiPickersUtilsProvider>
            </Grid>
        );
    }
}
