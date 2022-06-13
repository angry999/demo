import React, { Component } from 'react';
import { List, ListItem } from '@material-ui/core';
import { IncomeRange, IncomeRange_friendlyText } from 'fundscraper-model-enums';

interface IProps {
    onChange: any
}

interface IState {
    selected: IncomeRange[];
}

const choices = [
    IncomeRange.under50
    , IncomeRange.between_50_74
    , IncomeRange.between_75_99
    , IncomeRange.between_100_124
    , IncomeRange.between_125_149
    , IncomeRange.between_150_199
    , IncomeRange.between_200_299
    , IncomeRange.between_300_399
    , IncomeRange.over400
];

export class InvestorIncomeRangeFilter extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { selected: [] };
    }

    handleSelect(event: any, index: any) {
        let currentSelections = this.state.selected;
        let choice = choices[index] as IncomeRange;
        let choiceSpot = currentSelections.indexOf(choice);
        if (choiceSpot === -1)
            currentSelections.push(choice);
        else
            currentSelections.splice(choiceSpot, 1);

        this.setState({ selected: currentSelections });
        if (this.props.onChange !== undefined) {
            let specifics = { incomeRangeFilter: currentSelections };
            this.props.onChange(specifics);
        }
    }

    render() {
        //let classes = useStyles();
        return (
            <List component="nav" aria-label="Investor Income Range">
                {choices.map((option, index) => (
                    <ListItem key={option}
                        button
                        selected={this.state.selected.indexOf(choices[index]) !== -1}
                        onClick={(event) => this.handleSelect(event, index)}
                    >
                        {IncomeRange_friendlyText[option]}
                    </ListItem>
                ))}
            </List>
        );
    }
}