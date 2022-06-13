import React, { Component } from 'react';
import { List, ListItem } from '@material-ui/core';
import { InvestorAccreditation, InvestorAccreditation_friendlyText, validSections } from 'fundscraper-model-enums';

interface IProps {
    onChange: any
}

interface IState {
    selected: InvestorAccreditation[];
}

export class InvestorAccreditationLevelFilter extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { selected: [] };
    }

    handleSelect(event: any, index: any) {
        let currentSelections = this.state.selected;
        let choice = validSections[index] as InvestorAccreditation;
        let choiceSpot = currentSelections.indexOf(choice);
        if (choiceSpot === -1)
            currentSelections.push(choice);
        else
            currentSelections.splice(choiceSpot, 1);

        this.setState({ selected: currentSelections });
        if (this.props.onChange !== undefined) {
            let specifics = { accreditationFilter: currentSelections };
            this.props.onChange(specifics);
        }
    }

    render() {
        //let classes = useStyles();
        return (
            <List component="nav" aria-label="Accreditation Level">
                {validSections.map((option, index) => (
                    <ListItem key={option}
                        button
                        selected={this.state.selected.indexOf(validSections[index]) !== -1}
                        onClick={(event) => this.handleSelect(event, index)}
                    >
                        {InvestorAccreditation_friendlyText[option]}
                    </ListItem>
                ))}
            </List>
        );
    }
}