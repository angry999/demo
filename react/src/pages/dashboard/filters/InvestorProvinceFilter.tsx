import React, { Component } from 'react';
import { List, ListItem } from '@material-ui/core';

interface IProps {
    onChange: any
}

interface IState {
    selected: string[];
}

const choices = [
    'AB'
    , 'BC'
    , 'MB'
    , 'NB'
    , 'NL'
    , 'NS'
    , 'NT'
    , 'NU'
    , 'ON'
    , 'PE'
    , 'QC'
    , 'SK'
    , 'YT'
];

export var names: { [key: string]: string } = {};
names['AB'] = 'Alberta';
names['BC'] = 'British Columbia';
names['MB'] = 'Manitoba';
names['NB'] = 'New Brunswick';
names['NL'] = 'Newfoundland and Labrador';
names['NS'] = 'Nova Scotia';
names['NT'] = 'North West Territories';
names['NU'] = 'Nunavut';
names['ON'] = 'Ontario';
names['PE'] = 'Prince Edward Island';
names['QC'] = 'Quebec';
names['SK'] = 'Saskatchewan';
names['YT'] = 'Yukon';


export class InvestorProvinceFilter extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { selected: [] };
    }

    handleSelect(event: any, index: any) {
        let currentSelections = this.state.selected;
        let choice = choices[index];
        let choiceSpot = currentSelections.indexOf(choice);
        if (choiceSpot === -1)
            currentSelections.push(choice);
        else
            currentSelections.splice(choiceSpot, 1);

        this.setState({ selected: currentSelections });
        if (this.props.onChange !== undefined) {
            let specifics = { provinceCodeFilter: currentSelections };
            this.props.onChange(specifics);
        }
    }

    render() {
        return (
            <List component="nav" aria-label="Investor Province">
                {choices.map((option, index) => (
                    <ListItem
                        button
                        selected={this.state.selected.indexOf(choices[index]) !== -1}
                        onClick={(event) => this.handleSelect(event, index)}
                    >
                        {names[option]}
                    </ListItem>
                ))}
            </List>
        );
    }
}