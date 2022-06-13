import React, { Component } from 'react';
import { List, ListItem } from '@material-ui/core';
import { InvestmentOrderStatus, InvestmentOrderStatus_friendlyText } from 'fundscraper-model-enums';

interface IProps {
    onChange: any
}

interface IState {
    selected: InvestmentOrderStatus[];
}

const choices = [
    InvestmentOrderStatus.order_placed
    , InvestmentOrderStatus.purchased
    , InvestmentOrderStatus.refunded
    , InvestmentOrderStatus.transferred
    , InvestmentOrderStatus.sold
];

export class OrderStatusFilter extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { selected: [] };
    }

    handleSelect(event: any, index: any) {
        let currentSelections = this.state.selected;
        let choice = choices[index] as InvestmentOrderStatus;
        let choiceSpot = currentSelections.indexOf(choice);
        if (choiceSpot === -1)
            currentSelections.push(choice);
        else
            currentSelections.splice(choiceSpot, 1);

        this.setState({ selected: currentSelections });
        if (this.props.onChange !== undefined) {
            let specifics = { orderStatusFilter: currentSelections };
            this.props.onChange(specifics);
        }
    }

    render() {
        //let classes = useStyles();
        return (
            <List component="nav" aria-label="Order Status">
                {choices.map((option, index) => (
                    <ListItem key={option}
                        button
                        selected={this.state.selected.indexOf(choices[index]) !== -1}
                        onClick={(event) => this.handleSelect(event, index)}
                    >
                        {InvestmentOrderStatus_friendlyText[option]}
                    </ListItem>
                ))}
            </List>
        );
    }
}