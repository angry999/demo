import React, { Component } from 'react';
import { List, ListItem } from '@material-ui/core';
import { AgeRange, AgeRange_friendlyText } from 'fundscraper-model-enums';

interface IProps {
    onChange: any
}

interface IState {
    selected: AgeRange[];
}

const choices = [
    AgeRange.under35
    , AgeRange.between_35_44
    , AgeRange.between_45_54
    , AgeRange.between_55_64
    , AgeRange.over_65
];

export class InvestorAgeRangeFilter extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { selected: [] };
    }

    handleSelect(event: any, index: any) {
        let currentSelections = this.state.selected;
        let choice = choices[index] as AgeRange;
        let choiceSpot = currentSelections.indexOf(choice);
        if (choiceSpot === -1)
            currentSelections.push(choice);
        else
            currentSelections.splice(choiceSpot, 1);

        this.setState({ selected: currentSelections });
        if (this.props.onChange !== undefined) {
            let specifics = { ageRangeFilter: currentSelections };
            this.props.onChange(specifics);
        }
    }

    render() {
        //let classes = useStyles();
        return (
            <List component="nav" aria-label="Investor Age Range">
                {choices.map((option, index) => (
                    <ListItem key={option}
                        button
                        selected={this.state.selected.indexOf(choices[index]) !== -1}
                        onClick={(event) => this.handleSelect(event, index)}
                    >
                        {AgeRange_friendlyText[option]}
                    </ListItem>
                ))}
            </List>
        );
    }
}