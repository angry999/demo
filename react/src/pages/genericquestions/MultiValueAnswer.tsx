import React, { Component } from "react";
import {
    Grid,
    Box,
    Slider,
    Typography,
    Input,
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
class MultiValueAnswer extends Component<IProps, IState>
{
    constructor(props: IProps) {
        super(props);
    }

    // handle change of Input
    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const userAnswer = this.props.question;
        // reset value to 0~100
        let val = event.target.value === '' ? 0 : Number(event.target.value);
        if (val < 0) {
            val = 0;
        } else if (val > 100) {
            val = 100;
        }
        userAnswer[event.target.name] = val;

        let answer_text = '', combine = '';
        // set answer_text
        for (let index = 1; index < 11; index++) {
            if (event.target.name === this.props.question['selected_value' + index]) {
                answer_text += combine + this.props.question['answer_choice_' + index] + '#' + val;
                combine = '^';
            } else if (this.props.question['selected_value' + index]) {
                answer_text += combine + this.props.question['answer_choice_' + index] + '#' + this.props.question['selected_value' + index];
                combine = '^';
            }
        }
        userAnswer.answer_text = answer_text;

        this.props.handleUserAnswer(userAnswer);
    };

    // handle change of Slider
    handleSliderChange = (name: any, newValue: number | number[]) => {
        const userAnswer = this.props.question;
        userAnswer[name] = newValue;

        let answer_text = '';
        let combine = '';
        // set answer_text
        for (let index = 1; index < 11; index++) {
            if (name === this.props.question['selected_value' + index]) {
                answer_text += combine + this.props.question['answer_choice_' + index] + '#' + newValue;
                combine = '^';
            } else if (this.props.question['selected_value' + index]) {
                answer_text += combine + this.props.question['answer_choice_' + index] + '#' + this.props.question['selected_value' + index];
                combine = '^';
            }
        }
        userAnswer.answer_text = answer_text;

        this.props.handleUserAnswer(userAnswer);
    };

    render() {
        const { classes, question, answers } = this.props;
        let values = Array();

        for (let index = 1; index < 11; index++) {
            values.push(this.props.question['selected_value' + index]);
        }

        return (
            <Container className={classes.paddingLR0}>
                <Typography data-testid="h3-question" variant="h3" align="center" id={'multival_question'}>
                    {question.question}
                </Typography>
                <Grid container className={classes.choiceContainer} spacing={1}>
                    {
                        answers && answers.map((answer_choice: any, index: number) => {
                            if (answer_choice) {
                                if (question.slider_display)
                                    return (<Grid container spacing={2} alignItems="center" className={classes.choiceItemContainer} key={index}>
                                        <Grid item className={classes.choiceSliderLabelContainer}>
                                            <Typography variant="h4" align="left" className={classes.choiceSliderLabel}>
                                                {answer_choice}
                                            </Typography>
                                        </Grid>
                                        <Grid item className={classes.sliderContainer}>
                                            <AnswerSlider
                                                valueLabelDisplay="auto"
                                                name={'selected_value' + (index + 1).toString()}
                                                value={typeof values[index] === 'number' ? values[index] : 0}
                                                onChange={(event, value) => this.handleSliderChange('selected_value' + (index + 1).toString(), value)}
                                            />
                                        </Grid>
                                        <Grid item className={classes.choiceSliderLabelContainer}>
                                            <Typography variant="h4" align="left" className={classes.choiceSliderLabel}>
                                                {typeof values[index] === 'number' ? values[index] : 0}%
                                            </Typography>
                                        </Grid>
                                    </Grid>)
                                else
                                    return (<Grid container spacing={2} alignItems="center" className={classes.choiceItemTextContainer} key={index}>
                                        <Grid item className={classes.choiceSliderLabelContainer}>
                                            <Typography variant="h4" align="left" className={classes.choiceSliderLabel} id={'slider_text' + (index + 1)}>
                                                {answer_choice}
                                            </Typography>
                                        </Grid>
                                        <Grid item className={classes.inputContainer}>
                                            <Input
                                                className={classes.sliderInput}
                                                inputProps={{
                                                    min: 0,
                                                    max: 100,
                                                    type: 'number',
                                                    'aria-labelledby': 'input-slider',
                                                }}
                                                name={'selected_value' + (index + 1).toString()}
                                                id={'selected_value' + (index + 1).toString()}
                                                value={values[index] === null ? 0 : values[index]}
                                                onChange={this.handleInputChange}
                                            />
                                        </Grid>
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
        choiceContainer: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '50px',
            marginBottom: '50px',
            paddingLeft: 0,
            paddingRight: 0
        },
        choiceItemContainer: {
            display: 'flex',
            justifyContent: 'center',
            paddingLeft: 0,
            paddingRight: 0
        },
        choiceItemTextContainer: {
            display: 'flex',
            justifyContent: 'center',
            paddingLeft: 0,
            paddingRight: 0,
            height: '57px'
        },
        choiceSliderLabelContainer: {
            width: '12%'
        },
        choiceSliderLabel: {
            color: '#333',
            fontSize: '12px',
        },
        sliderContainer: {
            width: '70%',
            maxWidth: '700px'
        },
        inputContainer: {
            width: '100px'
        },
        sliderInput: {

        },
        paddingLR0: {
            paddingLeft: 0,
            paddingRight: 0
        },
    }, { withTheme: true })(MultiValueAnswer);

const AnswerSlider = withStyles({
    root: {
        color: '#B1A6D1',
        height: 8,
        maxWidth: '800px'
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);
