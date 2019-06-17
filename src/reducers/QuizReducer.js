import {
  GET_QUIZ_PENDING,
  GET_QUIZ_SUCCESS,
  GET_QUIZ_ERROR,
  SAVE_SCORE_PENDING,
  SAVE_SCORE_SUCCESS,
  SAVE_SCORE_ERROR
} from '../actionTypes'

const defaultState = {
  questions: [],
  success: false,
  hasError: false,
  errorMessage: '',
  successMessage: '',
  isLoading: false
}

const Quiz = (state = defaultState, action) => {
  switch(action.type) {
    case GET_QUIZ_PENDING:
      return {
        ...defaultState,
        isLoading: true,
      }
    case GET_QUIZ_SUCCESS:
      return {
        ...defaultState,
        isLoading: false,
        questions: action.questions,
        success: true
      }
    case GET_QUIZ_ERROR:
      return {
        ...defaultState,
        hasError: true,
      }
    case SAVE_SCORE_PENDING:
      return {
        ...defaultState,
        isLoading: true,
      }
    case SAVE_SCORE_SUCCESS:
      return {
        ...defaultState,
        isLoading: false,
        success: true,
        successMessage: action.message,
      }
    case SAVE_SCORE_ERROR:
      return {
        ...defaultState,
        hasError: true,
      }
    default:
      return state;
  }
}

export default Quiz;