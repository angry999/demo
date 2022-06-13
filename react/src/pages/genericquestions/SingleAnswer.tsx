import React, { Component } from "react";
import {
    Grid,
    Box,
    Radio,
    Typography,
    Container
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import UserContext from "../../UserContext";
import { IUserAnswer } from "./GenericQuestions";

interface IProps {
    question: IUserAnswer,
    answers: string[],
    handleUserAnswer: any,
    classes: any
}

interface IState {
}

/**
 *
 */
class SingleAnswer extends Component<IProps, IState>
{
    constructor(props: IProps) {
        super(props);
    }

    handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        // set the selected option and answer_text to the data props
        const userAnswer = this.props.question;
        userAnswer.selectedOption = event.target.value;
        userAnswer.answer_text = this.props.answers && this.props.answers[Number(userAnswer.selectedOption) - 1];

        this.props.handleUserAnswer(userAnswer);
    }

    handleBoxClick = (selectedOption: string) => {
        const userAnswer = this.props.question;
        userAnswer.selectedOption = selectedOption;
        userAnswer.answer_text = this.props.answers && this.props.answers[Number(userAnswer.selectedOption) - 1];

        this.props.handleUserAnswer(userAnswer);
    }

    render() {
        const { classes, question, answers } = this.props;

        return (
            <Container className={classes.paddingLR0}>
                <Typography data-testid="h3-question" variant="h3" align="center" id={'radio_question'}>
                    {question.question}
                </Typography>
                <Grid container className={classes.choiceContainer} spacing={1}>
                    {
                        answers && answers.map((answer_choice: any, index: number) => {
                            // check if the option is selected
                            let selected = question.selectedOption === (index + 1).toString()
                            let img_src = "/question" + (index + 5) % 10 + ".png"
                            if (selected) img_src = "/question" + (index + 5) % 10 + "-active.png"

                            if (answer_choice) {
                                return (<Grid item key={index}>
                                    <Box className={classes.boxCon} onClick={(e) => this.handleBoxClick((index + 1).toString())}>
                                        <Box className={selected ? classes.boxActive : classes.box}>
                                            <img src={img_src} className={classes.choiceImage} />
                                            <Typography variant="h4" align="center" className={classes.choiceLabel} id={'radio_text' + (index + 1)}>
                                                {answer_choice}
                                            </Typography>
                                        </Box>
                                        <div>
                                            <Radio
                                                color='primary'
                                                className={classes.choiceRadio}
                                                checked={selected}
                                                value={index + 1}
                                                id={'radio' + (index + 1)}
                                                data-testid={"radio" + (index + 1)}
                                                onChange={(e) => this.handleRadioChange(e)}
                                            />
                                        </div>
                                    </Box>
                                </Grid>)
                            }
                        })
                    }
                </Grid>
            </Container>
        );
    }
}

SingleAnswer.contextType = UserContext;

export default withStyles(
    {
        box: {
            width: '130px',
            minHeight: '110px',
            paddingBottom: '10px',
            border: 'solid 1px #e3e3e3'
        },
        boxActive: {
            width: '130px',
            minHeight: '110px',
            paddingBottom: '10px',
            border: 'solid 1px #b1a6d1',
            boxShadow: 'rgb(74 2 68 / 5%) 0px 2px 1px -1px, rgb(215 164 254 / 42%) 0px 1px 1px 0px, rgb(59 1 54 / 69%) 0px 1px 3px 0px'
        },
        choiceContainer: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '50px',
            marginBottom: '50px',
            paddingLeft: 0,
            paddingRight: 0
        },
        choiceImage: {
            width: '40px',
            marginTop: '12px'
        },
        choiceLabel: {
            fontSize: '12px',
            padding: '0 12px'
        },
        choiceRadio: {
            color: '#cccccc',
            '&.Mui-checked': {
                color: '#B1A6D1'
            }
        },
        boxCon: {
            cursor: 'pointer'
        }

    }, { withTheme: true })(SingleAnswer);

