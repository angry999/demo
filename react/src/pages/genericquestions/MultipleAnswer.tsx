import React, { Component } from "react";
import {
    Grid,
    Box,
    Checkbox,
    Typography,
    Container
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

interface IProps {
    question: any,
    answers: string[],
    handleUserAnswer: any,
    classes: any
}

interface IState {
}

/**
 *
 */
class MultipleAnswer extends Component<IProps, IState>
{
    constructor(props: IProps) {
        super(props);
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // set the selected option and answer_text to the data props
        const userAnswer = this.props.question;
        userAnswer[event.target.name] = event.target.checked;

        let answer_text = '', combine = '';
        for (let index = 1; index < 11; index++) {
            if (this.props.question['selected_value' + index]) {
                answer_text += combine + this.props.question['answer_choice_' + index];
                combine = '^';
            }
        }
        userAnswer.answer_text = answer_text;

        this.props.handleUserAnswer(userAnswer);
    };

    render() {
        const { classes, question, answers } = this.props;
        let check_values = Array();
        for (let index = 1; index < 11; index++) {
            check_values.push(this.props.question['selected_value' + index]);
        }

        return (
            <Container className={classes.paddingLR0}>
                <Typography data-testid="h3-question" variant="h3" align="center" id={'multiple_question'}>
                    {question.question}
                </Typography>
                <Grid container className={classes.choiceContainer} spacing={1}>
                    {
                        answers && answers.map((answer_choice: any, index: number) => {
                            if (answer_choice) {
                                let img_src = "/question" + index + ".png"
                                if (check_values[index]) img_src = "/question" + index + "-active.png"
                                return (<Grid item key={index}>
                                    <Box>
                                        <Box className={check_values[index] ? classes.boxActive : classes.box}>
                                            <img src={img_src} className={classes.choiceImage} />
                                            <Typography variant="h4" align="center" className={classes.choiceLabel} id={'chk_text' + (index + 1)}>
                                                {answer_choice}
                                            </Typography>
                                        </Box>
                                        <div>
                                            <Checkbox
                                                color='primary'
                                                className={classes.choiceCheck}
                                                name={'selected_value' + (index + 1).toString()}
                                                id={'selected_value' + (index + 1)}
                                                checked={check_values[index]}
                                                onChange={this.handleChange}
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
        choiceCheck: {
            color: '#cccccc',
            marginTop: '-5px',
            '&.Mui-checked': {
                color: '#B1A6D1'
            }
        },
        choiceImage: {
            width: '40px',
            marginTop: '12px'
        },
        choiceLabel: {
            fontSize: '12px',
            padding: '0 12px'
        },
        paddingLR0: {
            paddingLeft: 0,
            paddingRight: 0
        },
    }
    , { withTheme: true })(MultipleAnswer);
