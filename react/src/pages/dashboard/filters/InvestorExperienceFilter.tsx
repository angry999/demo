import React, { Component } from 'react';
import { List, ListItem } from '@material-ui/core';
import Environment from '../../../Environment';
import { DefaultApi, UserAnswer } from "../../../tsapi/api";
import { authProvider } from '../../../react-azure-adb2c';
import { Configuration } from "../../../tsapi/configuration";

interface IProps {
    onChange: any
}

interface IState {
    selected: string[];
    choices: string[];
}
 

export class InvestorExperienceFilter extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { selected: [], choices: [] };
    }

    componentDidMount() {
        this.loadData();
    }

    protected loadData() {
        authProvider.getIdToken().then((token) => {
            let config = new Configuration({ basePath: Environment.api_base_url, accessToken: token.idToken.rawIdToken });
            this.callApi(config);
        });
    }

    callApi(config: Configuration) {

        let api = new DefaultApi(config);
        let filters = `is_deleted eq 0 and answer_text <> ""`;
        let result: string[] = []
        api.userAnswerApiFindAllByFilter(filters, undefined, undefined, undefined, undefined, {
            headers: { 'Authorization': 'Bearer ' + config.accessToken }
        }).then((data: UserAnswer[]) => {
            for (let index = 0; index < data.length; index++) {
                result.push(data[index].answer_text);
            }
            result = [...new Set(result)];
            this.setState({ choices: result })
            console.log('UserAnswer======>', result)
        });


    }

    handleSelect(event: any, index: any) {
        let currentSelections = this.state.selected;
        let choice = this.state.choices[index];
        let choiceSpot = currentSelections.indexOf(choice);
        if (choiceSpot === -1)
            currentSelections.push(choice);
        else
            currentSelections.splice(choiceSpot, 1);

        this.setState({ selected: currentSelections });
        if (this.props.onChange !== undefined) {
            let specifics = { experienceFilter: currentSelections };
            this.props.onChange(specifics);
        }
    }

    render() {
        return (
            <List component="nav" aria-label="Investor Experience">
                {this.state.choices.map((option, index) => (
                    <ListItem
                        button
                        selected={this.state.selected.indexOf(this.state.choices[index]) !== -1}
                        onClick={(event) => this.handleSelect(event, index)}
                    >
                        {option}
                    </ListItem>
                ))}
            </List>
        );
    }
}