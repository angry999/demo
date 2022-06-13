import React, { Component } from 'react';
import { List, ListItem } from '@material-ui/core';
import { UserState, UserState_friendlyText } from 'fundscraper-model-enums';

interface IProps {
    onChange: any
}

interface IState {
    selected: UserState[];
}

const choices = [
    UserState.initial_signup
    , UserState.address_set
    , UserState.basic_info_complete
    , UserState.saved_risk_tolerance
    , UserState.risk_questions_complete
    , UserState.employment_complete
    , UserState.active
    , UserState.blocked
    , UserState.archived
];

export class InvestorSignupStatusFilter extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { selected: [] };
    }

    handleSelect(event: any, index: any) {
        let currentSelections = this.state.selected;
        let choice = choices[index] as UserState;
        let choiceSpot = currentSelections.indexOf(choice);
        if (choiceSpot === -1)
            currentSelections.push(choice);
        else
            currentSelections.splice(choiceSpot, 1);

        this.setState({ selected: currentSelections });
        if (this.props.onChange !== undefined) {
            let specifics = { signupStatusFilter: currentSelections };
            this.props.onChange(specifics);
        }
    }

    render() {
        //let classes = useStyles();
        return (
            <List component="nav" aria-label="Investor Signup Status">
                {choices.map((option, index) => (
                    <ListItem key={option}
                        button
                        selected={this.state.selected.indexOf(choices[index]) !== -1}
                        onClick={(event) => this.handleSelect(event, index)}
                    >
                        {UserState_friendlyText[option]}
                    </ListItem>
                ))}
            </List>
        );
    }
}