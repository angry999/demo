import React, { Component } from 'react';
import { List, ListItem } from '@material-ui/core';
import { FinancialRange, FinancialRange_friendlyText } from 'fundscraper-model-enums';

interface IProps {
    onChange: any
}

interface IState {
    selected: FinancialRange[];
}

const choices = [
    FinancialRange.under100000
    , FinancialRange.between_100000_200000
    , FinancialRange.between_200000_300000
    , FinancialRange.between_300000_400000
    , FinancialRange.between_400000_500000
    , FinancialRange.between_500000_750000
    , FinancialRange.between_750000_1000000
    , FinancialRange.between_1000000_1500000
    , FinancialRange.between_1500000_2000000
    , FinancialRange.between_2000000_3000000
    , FinancialRange.between_3000000_4000000
    , FinancialRange.between_4000000_5000000
    , FinancialRange.over5000000
];

export class InvestorAssetRangeFilter extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { selected: [] };
    }

    handleSelect(event: any, index: any) {
        let currentSelections = this.state.selected;
        let choice = choices[index] as FinancialRange;
        let choiceSpot = currentSelections.indexOf(choice);
        if (choiceSpot === -1)
            currentSelections.push(choice);
        else
            currentSelections.splice(choiceSpot, 1);

        this.setState({ selected: currentSelections });
        if (this.props.onChange !== undefined) {
            let specifics = { assetRangeFilter: currentSelections };
            this.props.onChange(specifics);
        }
    }

    render() {
        //let classes = useStyles();
        return (
            <List component="nav" aria-label="Investor Asset Range">
                {choices.map((option, index) => (
                    <ListItem key={option}
                        button
                        selected={this.state.selected.indexOf(choices[index]) !== -1}
                        onClick={(event) => this.handleSelect(event, index)}
                    >
                        {FinancialRange_friendlyText[option]}
                    </ListItem>
                ))}
            </List>
        );
    }
}