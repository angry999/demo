import React, { Component } from 'react';
import { List, ListItem } from '@material-ui/core';
import { ProjectStage, ProjectStage_friendlyText } from 'fundscraper-model-enums';

interface IProps {
    onChange: any
}

interface IState {
    selected: ProjectStage[];
}

const choices = [
    ProjectStage.prospective
    , ProjectStage.pre_funding_private
    , ProjectStage.raising
    , ProjectStage.underway
    , ProjectStage.completed
];

export class ProjectStatusFilter extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { selected: [] };
    }

    handleSelect(event: any, index: any) {
        let currentSelections = this.state.selected;
        let choice = choices[index] as ProjectStage;
        let choiceSpot = currentSelections.indexOf(choice);
        if (choiceSpot === -1)
            currentSelections.push(choice);
        else
            currentSelections.splice(choiceSpot, 1);

        this.setState({ selected: currentSelections });
        if (this.props.onChange !== undefined) {
            let specifics = { projectStatusFilter: currentSelections };
            this.props.onChange(specifics);
        }
    }

    render() {
        return (
            <List component="nav" aria-label="Project Status">
                {choices.map((option, index) => (
                    <ListItem key={option}
                        button
                        selected={this.state.selected.indexOf(choices[index]) !== -1}
                        onClick={(event) => this.handleSelect(event, index)}
                    >
                        {ProjectStage_friendlyText[option]}
                    </ListItem>
                ))}
            </List>
        );
    }
}