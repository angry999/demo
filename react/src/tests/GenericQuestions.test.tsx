import React from 'react';
import { shallow } from 'enzyme';
import GenericQuestions, { IUserAnswer } from '../pages/genericquestions/GenericQuestions';
import SingleAnswer from '../pages/genericquestions/SingleAnswer';
import MultipleAnswer from '../pages/genericquestions/MultipleAnswer';
import MultiValueAnswer from '../pages/genericquestions/MultiValueAnswer';
import { render, fireEvent } from "@testing-library/react";
import { QUESTION_ANSWERS, REGISTERATION_QUESTIONS, CURRENT_ANSWERS } from './mock'

const wrapper = shallow(<GenericQuestions question_set={0} testing={true} />);

describe('GenericQuestions', () => {

    it('GenericQuestions is rendered correctly', () => {
        expect(wrapper.exists()).toBeTruthy();
    });
    it('GenericQuestions will show (There is no questions)', async () => {
        const { getByTestId } = render(<GenericQuestions question_set={0} testing={true} />);
        expect(getByTestId('no-text').innerHTML).toBe('There is no questions')
    });

});

describe('SingleAnswer', () => {
    const wrapperSingleAnswer = shallow(<SingleAnswer question={QUESTION_ANSWERS[0] as IUserAnswer} answers={CURRENT_ANSWERS} handleUserAnswer={null} />);

    it('SingleAnswer is rendered correctly', () => {
        expect(wrapperSingleAnswer.exists()).toBeTruthy();
    });

    it(`First question of SingleAnswer is "${QUESTION_ANSWERS[0].question}"`, () => {
        expect(wrapperSingleAnswer.dive().find('#radio_question').text()).toBe(QUESTION_ANSWERS[0].question);
    });

    let index = 1
    it.each(CURRENT_ANSWERS)(`Answer text of SingleAnswer should display (%s)`, async (answer) => {
        expect(wrapperSingleAnswer.dive().find('#radio_text' + index).text()).toBe(answer);
        index++;
    });

});

describe('MultipleAnswer', () => {

    const answer_texts: string[] = [
        "Cash Savings or Fixed Deposits",
        "Bonds",
        "Unit Trusts",
        "Equities",
        "Other"
    ];

    const wrapperMultipleAnswer = shallow(<MultipleAnswer question={QUESTION_ANSWERS[3]} answers={answer_texts} handleUserAnswer={null} />);

    it('MultipleAnswer is rendered correctly', () => {
        expect(wrapperMultipleAnswer.exists()).toBeTruthy();
    });

    it(`First question of MultipleAnswer is "${QUESTION_ANSWERS[3].question}"`, () => {
        expect(wrapperMultipleAnswer.dive().find('#multiple_question').text()).toBe(QUESTION_ANSWERS[3].question);
    });

    let index = 1
    it.each(answer_texts)(`Answer text of MultipleAnswer should display (%s)`, async (answer) => {
        expect(wrapperMultipleAnswer.dive().find('#chk_text' + index).text()).toBe(answer);
        index++;
    });

    it(`First checkbox of MultipleAnswer is "${QUESTION_ANSWERS[3].selected_value1}"`, () => {
        expect(wrapperMultipleAnswer.dive().find('#selected_value1').props().checked).toEqual(QUESTION_ANSWERS[3].selected_value1);
    });

    it(`Second checkbox of MultipleAnswer is "${QUESTION_ANSWERS[3].selected_value2}"`, () => {
        expect(wrapperMultipleAnswer.dive().find('#selected_value2').props().checked).toEqual(QUESTION_ANSWERS[3].selected_value2);
    });

});

describe('MultiValueAnswer', () => {

    const answer_texts: string[] = [
        "Cash",
        "Bonds",
        "Equities",
        "Real Estate",
        "ETFs",
        "Private Equity"
    ];


    const wrapperMultiValueAnswer = shallow(<MultiValueAnswer question={QUESTION_ANSWERS[4]} answers={answer_texts} handleUserAnswer={handleUserAnswer} />);

    it('MultiValueAnswer is rendered correctly', () => {
        expect(wrapperMultiValueAnswer.exists()).toBeTruthy();
    });

    it(`First question of MultipleAnswer is "${QUESTION_ANSWERS[4].question}"`, () => {
        expect(wrapperMultiValueAnswer.dive().find('#multival_question').text()).toBe(QUESTION_ANSWERS[4].question);
    });

    it(`First answer text of MultipleAnswer is "${answer_texts[0]}"`, () => {
        expect(wrapperMultiValueAnswer.dive().find('#slider_text1').text()).toBe(answer_texts[0]);
    });

    let values: number[] = [];
    for (let index = 1; index < 7; index++) {
        let indexValue = 'selected_value' + index;
        let answerDetails = QUESTION_ANSWERS[4] as any;
        let answerValue = answerDetails[indexValue];
        if (answerValue)
            values.push(answerValue);
        else
            values.push(0);
    }

    it(`First Input value of MultipleAnswer is "${values[0]}"`, () => {
        expect(wrapperMultiValueAnswer.dive().find('#selected_value1').prop('value')).toEqual(values[0]);
    });

    it('Make sure inputted text is shorter than max length', () => {
        wrapperMultiValueAnswer.dive().find('#selected_value1').simulate('change', { target: { value: '123', name: 'selected_value1' } });
        expect(wrapperMultiValueAnswer.dive().find('#selected_value1').prop('value')).toBe(100);
    });
});

describe('GenericQuestions Functions', () => {

    it('GenericQuestions is rendered correctly', () => {
        expect(wrapper.exists()).toBeTruthy();
    });

    it('Click Next button without select', async () => {
        const { getByTestId } = render(<GenericQuestions question_set={0} questions={REGISTERATION_QUESTIONS} answers={QUESTION_ANSWERS} testing={true} />);

        let button = getByTestId('btn-next');
        fireEvent.click(button);

        expect(getByTestId('h3-question').innerHTML).toBe(REGISTERATION_QUESTIONS[0].question)
    });

    it('Click Next button after select one', async () => {
        const { getByTestId, getByText } = render(<GenericQuestions question_set={0} questions={REGISTERATION_QUESTIONS} answers={QUESTION_ANSWERS} testing={true} />);

        let radio1 = getByTestId('radio1');
        fireEvent.change(radio1);

        let button = getByTestId('btn-next');
        fireEvent.click(button);

        expect(getByTestId('h3-question').innerHTML).toBe(REGISTERATION_QUESTIONS[0].question)
    });

});

describe('SingleAnswer Functions', () => {
    const wrapperSingleAnswer = shallow(<SingleAnswer question={QUESTION_ANSWERS[0] as IUserAnswer} answers={CURRENT_ANSWERS} handleUserAnswer={handleUserAnswer} />);

    it('First radio should be checked', () => {
        let first_radio = wrapperSingleAnswer.dive().find('#radio1').prop('value');
        wrapperSingleAnswer.dive().find('#radio1').simulate('change', { target: { value: first_radio, name: 'radio1' } });
        expect(wrapperSingleAnswer.dive().find('#radio1').prop('value')).toBe(1);
    });

    it('Second radio should be checked', () => {
        let second_radio = wrapperSingleAnswer.dive().find('#radio2').prop('value');
        wrapperSingleAnswer.dive().find('#radio2').simulate('change', { target: { value: second_radio, name: 'radio2' } });
        expect(wrapperSingleAnswer.dive().find('#radio2').prop('value')).toBe(2);
    });
});

describe('MultipleAnswer Functions', () => {

    const answer_texts: string[] = [
        "Cash Savings or Fixed Deposits",
        "Bonds",
        "Unit Trusts",
        "Equities",
        "Other"
    ];

    const wrapperMultipleAnswer = shallow(<MultipleAnswer question={QUESTION_ANSWERS[3]} answers={answer_texts} handleUserAnswer={handleUserAnswer} />);

    it('First checkbox should be unchecked', () => {
        let first_check = wrapperMultipleAnswer.dive().find('#selected_value1').prop('checked');
        wrapperMultipleAnswer.dive().find('#selected_value1').simulate('change', { target: { checked: !first_check, name: 'selected_value1' } });
        expect(wrapperMultipleAnswer.dive().find('#selected_value1').prop('checked')).toBe(false);
    });

    it('First checkbox should be checked', () => {
        let first_check = wrapperMultipleAnswer.dive().find('#selected_value1').prop('checked');
        wrapperMultipleAnswer.dive().find('#selected_value1').simulate('change', { target: { checked: !first_check, name: 'selected_value1' } });
        expect(wrapperMultipleAnswer.dive().find('#selected_value1').prop('checked')).toBe(true);
    });

    it('Second checkbox should be checked', () => {
        let second_check = wrapperMultipleAnswer.dive().find('#selected_value2').prop('checked');
        wrapperMultipleAnswer.dive().find('#selected_value2').simulate('change', { target: { checked: !second_check, name: 'selected_value2' } });
        expect(wrapperMultipleAnswer.dive().find('#selected_value2').prop('checked')).toBe(true);
    });

    it('Second checkbox should be unchecked', () => {
        let second_check = wrapperMultipleAnswer.dive().find('#selected_value2').prop('checked');
        wrapperMultipleAnswer.dive().find('#selected_value2').simulate('change', { target: { checked: !second_check, name: 'selected_value2' } });
        expect(wrapperMultipleAnswer.dive().find('#selected_value2').prop('checked')).toBe(false);
    });

});

describe('MultiValueAnswer Functions', () => {

    const answer_texts: string[] = [
        "Cash",
        "Bonds",
        "Equities",
        "Real Estate",
        "ETFs",
        "Private Equity"
    ];

    const wrapperMultiValueAnswer = shallow(<MultiValueAnswer question={QUESTION_ANSWERS[4]} answers={answer_texts} handleUserAnswer={handleUserAnswer} />);

    it('Input value is changed to 55', () => {
        wrapperMultiValueAnswer.dive().find('#selected_value2').simulate('change', { target: { value: '55', name: 'selected_value2' } });
        expect(wrapperMultiValueAnswer.dive().find('#selected_value2').prop('value')).toBe(55);
    });

    it('Make sure inputted text is larger than 0', () => {
        wrapperMultiValueAnswer.dive().find('#selected_value2').simulate('change', { target: { value: '-253', name: 'selected_value2' } });
        expect(wrapperMultiValueAnswer.dive().find('#selected_value2').prop('value')).toBe(0);
    });

    it('Make sure inputted text is smaller than 100', () => {
        wrapperMultiValueAnswer.dive().find('#selected_value1').simulate('change', { target: { value: '123', name: 'selected_value1' } });
        expect(wrapperMultiValueAnswer.dive().find('#selected_value1').prop('value')).toBe(100);
    });

    it('Make sure inputted text should be number', () => {
        wrapperMultiValueAnswer.dive().find('#selected_value1').simulate('change', { target: { value: 'test', name: 'selected_value1' } });
        expect(wrapperMultiValueAnswer.dive().find('#selected_value1').prop('value')).toBe(NaN);
    });
});

function handleUserAnswer(data: any) {
    // console.log(data)
}
