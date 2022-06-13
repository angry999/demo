import React, { Component } from 'react';
import { List, ListItem } from '@material-ui/core';

interface IProps {
    onChange: any
}

interface IState {
    selected: string;
}

const choices = [
    'Yes'
    , 'No'
    , 'Either'
];

export class InvestorCobrandedFilter extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { selected: 'Either' };
    }

    handleSelect(event: any, index: any) {
        let newlySelected = choices[index];
        this.setState({ selected: newlySelected });
        if (this.props.onChange !== undefined) {
            let cobranded = newlySelected === 'Yes' ? true : newlySelected === 'No' ? false : undefined;
            let specifics = { cobrandedFilter: cobranded };
            this.props.onChange(specifics);
        }
    }

    render() {
        return (
            <List component="nav" aria-label="Investor Cobranded">
                {choices.map((option, index) => (
                    <ListItem key={option}
                        button
                        selected={this.state.selected === option}
                        onClick={(event) => this.handleSelect(event, index)}
                    >
                        {option}
                    </ListItem>
                ))}
            </List>
        );
    }
}