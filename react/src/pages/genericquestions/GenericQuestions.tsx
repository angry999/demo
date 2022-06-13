import React, { Component } from "react";
import {
	Grid,
	Button,
	Container,
	Typography
} from "@material-ui/core";
import UserContext from "../../UserContext";
import { ThemeProvider, withStyles } from '@material-ui/core/styles';
import Environment from '../../Environment';
import { DefaultApi, UserAnswer, RegistrationQuestion } from "../../tsapi/api";
import { authProvider } from '../../react-azure-adb2c';
import { Configuration } from "../../tsapi/configuration";
import SingleAnswer from "./SingleAnswer";
import MultipleAnswer from "./MultipleAnswer";
import MultiValueAnswer from "./MultiValueAnswer";
import questionTheme from '../../theme/questionTheme';
import { QuestionAnswerType } from 'fundscraper-model-enums';

export interface IApiLoadableComponent_Props {
	classes?: any,
	question_set: number,	// tempcode should get the question_set
	testing: boolean,
	questions?: any,
	answers?: any,
}

export interface IApiLoadableComponent_State {
	loading: boolean,
	loadError: boolean,
	loadErrorMessage?: string,
	data: RegistrationQuestion[] | null,
	count: number | 0,
	currentStep: number | 0,
	currentAnswers: string[],
	isComplete: boolean,
	userAnswers: UserAnswer[] | null,
	questionAnswers: IUserAnswer[] | null
}

export interface IUserAnswer {
	id: number,
	answer_type: number,
	question: string | null,
	answer_text: string | null,
	category: number,
	selectedOption: string | null,
	selected_value1: string | null,
	selected_value2: string | null,
	selected_value3: string | null,
	selected_value4: string | null,
	selected_value5: string | null,
	selected_value6: string | null,
	selected_value7: string | null,
	selected_value8: string | null,
	selected_value9: string | null,
	selected_value10: string | null
}

/**
 * 
 */
class GenericQuestions extends Component<IApiLoadableComponent_Props, IApiLoadableComponent_State> {
	config?: Configuration;
	user_id: number = 0;

	constructor(props: IApiLoadableComponent_Props | Readonly<IApiLoadableComponent_Props>) {
		super(props);
		this.state = {
			loading: true,
			loadError: false,
			loadErrorMessage: '',
			data: null,
			count: 0,
			currentStep: 0,
			currentAnswers: [],
			isComplete: false,
			userAnswers: null,
			questionAnswers: null
		};
	}

	componentDidMount() {
		this.loadData();
	}

	componentDidUpdate(prevProps: any, prevState: any) {
		if ((this.state.questionAnswers !== prevState.questionAnswers || this.state.currentStep !== prevState.currentStep) && this.state.count > 0) {
			if (this.state.count > this.state.currentStep) {
				// get current question
				const question: any = this.state.data ? this.state.data[this.state.currentStep] : null;
				// get the answer_choice list 
				const answer_texts: string[] = [];
				for (let index = 1; index < 11; index++) {
					answer_texts.push(question['answer_choice_' + index]);
				}
				this.setState({ currentAnswers: answer_texts });
			} else if (this.state.count <= this.state.currentStep) {
				this.handleComplete();
			}
		}
	}

	protected loadData() {
		if (this.props.testing) {
			this.loadTestData();
		}
		else {
			authProvider.getIdToken().then((token) => {
				let config = new Configuration({ basePath: Environment.api_base_url, accessToken: token.idToken.rawIdToken });
				this.callApi(config);
			});
		}
	}

	/**
	 * make the api call to get the project
	 */
	callApi(config: Configuration) {
		this.config = config;
		let api = new DefaultApi(config);

		const question_set = this.props.question_set ? this.props.question_set : 0;
		let filters = `is_deleted eq 0 and visible eq 1 and question_set eq ${question_set}`;
		let orderBy = 'registration_questionary.sort_order';
		api.registrationQuestionApiFindAllByFilter(filters, undefined, orderBy, undefined, undefined, {
			headers: { 'Authorization': (this.props.testing) ? '4dc98fd81f075a68b146a6847d7161b478643e7d' : 'Bearer ' + config.accessToken }
		}).then((data: RegistrationQuestion[]) => {
			this.loadCallback(undefined, data, undefined);
		});

	}

	loadTestData() {
		if (this.props.questions && this.props.questions.length >= 0) {
			const data = this.props.questions;

			const question_ids: number[] = [];
			for (let index = 0; index < data.length; index++) {
				question_ids.push(data[index].id);
			}

			const answer_ids: number[] = [];
			const answers = this.props.answers;
			for (let index = 0; index < answers.length; index++) {
				answer_ids.push(answers[index].question_id);
			}
			const question_answers: IUserAnswer[] = [];
			const register_questions: RegistrationQuestion[] = [];
			for (let index = 0; index < data.length; index++) {
				if (!answer_ids.includes(data[index].id)) {
					const question_answer: IUserAnswer = {
						id: data[index].id,
						answer_type: data[index].answer_type,
						question: data[index].question,
						answer_text: null,
						category: data[index].category,
						selectedOption: null,
						selected_value1: null,
						selected_value2: null,
						selected_value3: null,
						selected_value4: null,
						selected_value5: null,
						selected_value6: null,
						selected_value7: null,
						selected_value8: null,
						selected_value9: null,
						selected_value10: null
					}
					question_answers.push(question_answer);
					register_questions.push(data[index]);
				}
			}
			/////////////////
			const question: any = register_questions[0];
			// get the answer_choice list 
			const answer_texts: string[] = [];
			for (let index = 1; index < 11; index++) {
				answer_texts.push(question['answer_choice_' + index]);
			}

			// set the initial registrationQuestion list
			this.setState({ loading: false, data: register_questions, questionAnswers: question_answers, userAnswers: answers, count: question_answers.length, currentAnswers: answer_texts });
		}
	}

	/**
	 * handle the return of the load
	 * @param string error text describing the error that has occured if any
	 * @param object data the result of the call to get data
	 * @param response error the object that describes an error that occured if any
	 */
	loadCallback(error: any, data: RegistrationQuestion[] | undefined, response: any) {
		if (data && data.length >= 0) {
			this.user_id = this.context && this.context.user ? this.context.user.id : 0;
			const accessToken = this.config?.accessToken;

			// get the UserAnswer list
			let api = new DefaultApi(this.config);
			const question_ids: number[] = [];
			for (let index = 0; index < data.length; index++) {
				question_ids.push(data[index].id);
			}
			let filters = `user_id eq ${this.user_id} and is_deleted eq 0 and question_id in (${question_ids.join()})`;

			api.userAnswerApiFindAllByFilter(filters, undefined, undefined, undefined, -1, {
				headers: { 'Authorization': (this.props.testing) ? '4dc98fd81f075a68b146a6847d7161b478643e7d' : 'Bearer ' + accessToken }
			}).then((answers: UserAnswer[]) => {
				// check if there is an answered question 
				const answer_ids: number[] = [];
				for (let index = 0; index < answers.length; index++) {
					answer_ids.push(answers[index].question_id);
				}
				const question_answers: IUserAnswer[] = [];
				const register_questions: RegistrationQuestion[] = [];
				for (let index = 0; index < data.length; index++) {
					if (!answer_ids.includes(data[index].id)) {
						const question_answer: IUserAnswer = {
							id: data[index].id,
							answer_type: data[index].answer_type,
							question: data[index].question,
							answer_text: null,
							category: data[index].category,
							selectedOption: null,
							selected_value1: null,
							selected_value2: null,
							selected_value3: null,
							selected_value4: null,
							selected_value5: null,
							selected_value6: null,
							selected_value7: null,
							selected_value8: null,
							selected_value9: null,
							selected_value10: null
						}
						question_answers.push(question_answer);
						register_questions.push(data[index]);
					}
				}
				const question: any = register_questions[0];
				// get the answer_choice list 
				const answer_texts: string[] = [];
				for (let index = 1; index < 11; index++) {
					answer_texts.push(question['answer_choice_' + index]);
				}

				// set the initial registrationQuestion list
				this.setState({ loading: false, data: register_questions, questionAnswers: question_answers, userAnswers: answers, count: question_answers.length, currentAnswers: answer_texts });
			});
		}
		else if (response instanceof Error) {
			console.log('loadData failed ' + error);
			this.setState({ loading: false, loadError: true, loadErrorMessage: error, data: [{}] as RegistrationQuestion[] });
		}
		else {
			console.log('loadData failed ');
			this.setState({ loading: false, loadError: true, loadErrorMessage: 'Unknown', data: [{}] as RegistrationQuestion[] });
		}
	}

	handlePrev() {
		if (this.state.currentStep > 0) {
			this.setState({ currentStep: this.state.currentStep - 1 });
		}
	}

	handleNext() {
		// check if user selected any answer
		if (this.state.questionAnswers && this.state.questionAnswers[this.state.currentStep].answer_text) {
			const answer_ids: number[] = [];
			if (this.state.userAnswers) {
				for (let index = 0; index < this.state.userAnswers.length; index++) {
					answer_ids.push(this.state.userAnswers[index].question_id);
				}
				if (answer_ids.includes(this.state.questionAnswers[this.state.currentStep].id)) {
					this.handleUpdate(this.state.questionAnswers[this.state.currentStep].id);
				} else {
					this.handleSave();
				}

			} else {
				this.handleSave();
			}
			// move to next question
			if (this.state.count > this.state.currentStep) {
				this.setState({ currentStep: this.state.currentStep + 1 });
			}
		}
		else {
			// exception process
		}
	}

	handleSave() {
		if (this.state.questionAnswers) {
			let api = new DefaultApi(this.config);
			const accessToken = this.config?.accessToken;
			const question_set = this.props.question_set ? this.props.question_set : 0;

			let newUserAnswer: any = {};
			newUserAnswer.user_id = this.user_id;
			newUserAnswer.question_id = this.state.questionAnswers[this.state.currentStep].id;
			newUserAnswer.category = this.state.questionAnswers[this.state.currentStep].category;
			newUserAnswer.question_text = this.state.questionAnswers[this.state.currentStep].question;
			newUserAnswer.answer_type = this.state.questionAnswers[this.state.currentStep].answer_type;
			newUserAnswer.answer_text = this.state.questionAnswers[this.state.currentStep].answer_text;
			newUserAnswer.question_set = question_set;

			try {
				api.userAnswerApiCreate([newUserAnswer] as UserAnswer[], {
					headers: { 'Authorization': (this.props.testing) ? '4dc98fd81f075a68b146a6847d7161b478643e7d' : 'Bearer ' + accessToken }
				}).then((data: any) => {
					// add userAnswers
					let newUserAnswer = this.state.userAnswers;
					if (newUserAnswer)
						newUserAnswer.push(data);
					else
						newUserAnswer = data;

					this.setState({ userAnswers: newUserAnswer });
					console.log('userAnswerApiCreate success');
				}).catch(problem => {
					console.log('userAnswerApiCreate failed call', newUserAnswer, problem);
				});
			} catch (error) {
				console.error(error)
			}
		}
	}

	handleUpdate(userAnswerID: number) {
		const old_answer_text = this.state.userAnswers && this.state.userAnswers.filter(answer => answer.question_id === userAnswerID)[0].answer_text;
		// if answer_text is changed, update it
		if (this.state.questionAnswers && old_answer_text !== this.state.questionAnswers[this.state.currentStep].answer_text) {
			let api = new DefaultApi(this.config);
			const accessToken = this.config?.accessToken;
			const question_set = this.props.question_set ? this.props.question_set : 0;
			const old_answer_id = this.state.userAnswers && this.state.userAnswers.filter(answer => answer.question_id === userAnswerID)[0].id;

			let newUserAnswer: any = {};
			newUserAnswer.id = old_answer_id;
			newUserAnswer.user_id = this.user_id;
			newUserAnswer.question_id = this.state.questionAnswers[this.state.currentStep].id;
			newUserAnswer.category = this.state.questionAnswers[this.state.currentStep].category;
			newUserAnswer.question_text = this.state.questionAnswers[this.state.currentStep].question;
			newUserAnswer.answer_type = this.state.questionAnswers[this.state.currentStep].answer_type;
			newUserAnswer.answer_text = this.state.questionAnswers[this.state.currentStep].answer_text;
			newUserAnswer.question_set = question_set;

			// update userAnswers state
			let newUserAnswers = this.state.userAnswers ? this.state.userAnswers.map((userAnswer: UserAnswer) => {
				if (userAnswer.question_id === userAnswerID) {
					return newUserAnswer;
				} else {
					return userAnswer;
				}
			}) : null;
			this.setState({ userAnswers: newUserAnswers });

			try {
				api.userAnswerApiUpdate([newUserAnswer] as UserAnswer[], {
					headers: { 'Authorization': (this.props.testing) ? '4dc98fd81f075a68b146a6847d7161b478643e7d' : 'Bearer ' + accessToken }
				}).then((data: number[]) => {
					console.log('userAnswerApiUpdate success', data[0]);
				}).catch(problem => {
					console.log('userAnswerApiUpdate failed call', newUserAnswer, problem);
				});
			} catch (error) {
				console.error(error);
			}
		}
	}

	// update data state with selected answers
	handleUserAnswer = (newQuestionAnswer: IUserAnswer) => {
		let newData = this.state.questionAnswers ? this.state.questionAnswers.map((questionAnswer: any) => {
			if (questionAnswer.id === newQuestionAnswer.id) {
				return newQuestionAnswer;
			} else {
				return questionAnswer;
			}
		}) : null;

		this.setState({ questionAnswers: newData });
	};

	// save the answers to the UserAnswer
	handleComplete = async () => {
		this.setState({ isComplete: true });
	}

	/**
	 * render the data that has successfully loaded
	 */
	render() {
		const { classes } = this.props;
		const { currentAnswers } = this.state;
		const currentItem = this.state.questionAnswers && this.state.questionAnswers[this.state.currentStep];

		let QuestionBox = currentItem ? <Grid item xs={12} sm={12} className={classes.rootContainer}>
			<Container className={classes.paddingLR0}>
				{
					currentItem.answer_type == QuestionAnswerType.radio ?
						<SingleAnswer question={currentItem} answers={currentAnswers} handleUserAnswer={this.handleUserAnswer} />
						:
						currentItem.answer_type == QuestionAnswerType.check_box ?
							<MultipleAnswer question={currentItem} answers={currentAnswers} handleUserAnswer={this.handleUserAnswer} />
							:
							<MultiValueAnswer question={currentItem} answers={currentAnswers} handleUserAnswer={this.handleUserAnswer} />
				}
			</Container>
		</Grid > :
			<p data-testid="no-text">{'There is no questions'}</p>

		return (
			<ThemeProvider theme={questionTheme}>
				{
					this.state.isComplete ?
						<Grid container>
							<Grid container item xs={12} sm={12}>
								<Typography variant="h2" align="center" className={classes.rootContainer} id={'isComplete'} data-testid="isComplete">
									{'All done!'}
								</Typography>
							</Grid>
						</Grid>
						:
						<Grid container>
							<Grid container item xs={12} sm={12} className={classes.titleContainer}>
								{QuestionBox}
							</Grid>
							<Grid container item xs={12} sm={12}>
								{this.state.data && this.state.count > 0 &&
									<Container className={classes.buttonContainer}>
										{this.state.currentStep > 0 &&
											<img src="/back.svg" data-testid="img-prev" className={classes.backIcon} onClick={() => this.handlePrev()} />
										}
										<Button data-testid="btn-next" variant="text" onClick={() => this.handleNext()}>Next</Button>
									</Container>
								}
							</Grid>
						</Grid>
				}
			</ThemeProvider>
		);
	}
}

GenericQuestions.contextType = UserContext;

export default withStyles(
	{
		rootContainer: {
			margin: 'auto',
			marginTop: '20vh',
		},
		titleContainer: {
			textAlign: 'center'
		},
		buttonContainer: {
			display: 'flex',
			justifyContent: 'center'
		},
		paddingLR0: {
			paddingLeft: 0,
			paddingRight: 0
		},
		backIcon: {
			width: '25px',
			opacity: '0.4',
			marginRight: '15px',
			cursor: 'pointer',
			'&:hover': {
				opacity: 1
			}
		},

	}
	, { withTheme: true })(GenericQuestions);
