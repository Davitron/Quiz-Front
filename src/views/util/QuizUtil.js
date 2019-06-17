import _ from 'lodash';

export default class QuizUtil {
  static prepQuestion(questions) {
    const preppedQuestions = questions.map(question => {
      question.incorrect_answers.push(question.correct_answer);
      const shuffled = _.shuffle(question.incorrect_answers);
      question.incorrect_answers = _.shuffle(shuffled);
      return question
    });
    return preppedQuestions;
  }

  static startQuiz(currentQuestion, preppedQuestions) {
    return {
      questionNumber: currentQuestion,
      question: preppedQuestions[0],
    }
  }

  static nextQuestion(currentQuestion, questions) {
    console.log('previousQuestion: ', currentQuestion);
    if (currentQuestion === questions.length) {
      return null;
    }

    const newQuestion = currentQuestion += 1;
    console.log('nextQuestion: ', currentQuestion);

    return {
      questionNumber: newQuestion,
      question: questions[newQuestion - 1],
    }
  }
}