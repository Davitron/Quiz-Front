import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Simplert from 'react-simplert'
import { withStyles } from '@material-ui/core/styles';
import '../styles/home.scss';
import { Typography, Button } from '@material-ui/core';
import { fetchQuiz, saveScore } from '../actions/quiz';
import QuizUtil from './util/QuizUtil';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    fontSize: '1.12rem'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  paperSelected: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: 'white',
    backgroundColor: '#4953de'
  },
  optionSelected: {
    color: '#4953de',
    backgroundColor: 'white'
  },
  correctOption: {
    backgroundColor: '#53e443',
    color: 'white'
  }
});

const optionLetters = ['A', 'B', 'C', 'D'];

class Quiz extends Component {
  state = {
    categoryId: null,
    categoryName: '',
    questions: [],
    preppedQuestions: [],
    currentQuestion: {},
    currentQuestionNumber: 1,
    optionSelected: false,
    selectedOptionIndex: null,
    optionsSelectedStyle: 'option-letter',
    currentScore: 0,
    endQuiz: false,
  };

  componentWillMount() {
    const { state } = this.props.location;
    if (state !== undefined && state.categoryId) {
      this.setState(prevState => ({
        ...prevState,
        categoryId: state.categoryId,
        categoryName: state.category,
      }));

      this.props.fetchQuiz(state.categoryId);
    } else {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.questions.length !== this.props.questions.length) {
      this.setState({
        preppedQuestions: QuizUtil.prepQuestion(nextProps.questions)
      },() => {
          this.startQuiz();
      });
    }

    if (nextProps.successMessage.length > 0) {
      this.endQuiz();
    }
  }

  startQuiz = () => {
    const { currentQuestionNumber, preppedQuestions } = this.state;
    this.setState(prevState => ({
      ...prevState,
        currentQuestion: QuizUtil.startQuiz(
        currentQuestionNumber,
        preppedQuestions
        )
      }), () => {
        console.log(this.state.currentQuestion);
      }
    );
  };

  endQuiz = () => {
    this.setState({
      endQuiz: true
    }, () => {
      console.log(this.state.endQuiz);
    })
  }

  nextQuestion = () => {
    const {
      currentQuestionNumber,
      preppedQuestions,
      currentScore
    } = this.state;
    const nextQuestion = QuizUtil.nextQuestion(
      currentQuestionNumber,
      preppedQuestions
    );

    if (nextQuestion === null) {
      const percentage = (currentScore / preppedQuestions.length) * 100;
      return this.props.saveScore({
        score: percentage,
        category: this.state.categoryName
      });
    }

    this.setState(prevState => ({
      ...prevState,
      currentQuestionNumber: nextQuestion.questionNumber,
      currentQuestion: nextQuestion,
      answered: false
    }));
  };

  onClick = (index, answer) => {
    const { question: { correct_answer } } = this.state.currentQuestion;
    let correctAnswer = false;
    if (correct_answer === answer) {
      correctAnswer = true;
      this.setState(prevState => ({
        currentScore: prevState.currentScore + 1
      }))
    }
    this.setState({
      selectedOptionIndex: index,
      answered: true,
      correctAnswer
    }, () => {
      console.log('>>>>>>>>*******', this.state)
    });
  };

  render() {
    const { classes } = this.props;
    const { questionNumber, question } = this.state.currentQuestion;
    const { selectedOptionIndex, answered } = this.state;
 
    return (
      <div id="quiz">
        <div className="quizboard">
          <div className="question-number">
            {questionNumber && questionNumber}
          </div>
          <div className="question-block">
            <Typography variant="h4" color="inherit" className={classes.grow}>
              {question ? question.question : ''}
            </Typography>
          </div>
          <div className="options-block">
            <Grid container spacing={24}>
              {question &&
                question.incorrect_answers.map((answer, index) => (
                  <Grid key={index} item xs={12} sm={6}>
                    <Paper
                      className={`
                        ${
                          question.correct_answer === answer && answered
                            ? classes.correctOption
                            : classes.paper
                        }
                        ${
                          selectedOptionIndex === index && answered
                            ? classes.paperSelected
                            : classes.paper
                        }
                    `}
                      onClick={
                        answered === true
                          ? null
                          : () => this.onClick(index, answer)
                      }
                    >
                      <div className={this.state.optionsSelectedStyle}>
                        {optionLetters[index]}
                      </div>
                      {answer}
                    </Paper>
                  </Grid>
                ))}
            </Grid>
          </div>
          <div className="next">
            {answered === true && (
              <Button size="large" variant="contained" color="primary" onClick={this.nextQuestion}>
                Next Question
              </Button>
            )}
          </div>
        </div>
        <Simplert
          showSimplert={ this.state.endQuiz }
          type={ "success" }
          title={ "Quiz has ended" }
          message={ this.props.successMessage }
          onClose={() => this.props.history.push('/quiz')}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  questions: state.quiz.questions,
  successMessage: state.quiz.successMessage,
  isLoggedIn: state.user.isLoggedIn
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchQuiz,
      saveScore
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Quiz));
