import axios from 'axios';
import {
  GET_QUIZ_PENDING,
  GET_QUIZ_SUCCESS,
  GET_QUIZ_ERROR,
  SAVE_SCORE_PENDING,
  SAVE_SCORE_SUCCESS,
  SAVE_SCORE_ERROR
} from'../actionTypes';

import Token from './helpers/Token';

const API_URL = 'http://localhost:7000';

const fetchQuiz = categoryId => async(dispatch) => { 
  dispatch({ type: GET_QUIZ_PENDING });
  try {
    const token = Token.getToken();
    const response = await axios({
      url: `${API_URL}/quiz`,
      method: 'POST',
      headers: {
        'x-access-token': token,
      },
      data: {
        category: categoryId
      }
    });
    const { questions } = response.data;

    dispatch({
      type: GET_QUIZ_SUCCESS,
      questions
    })
  } catch (error) {
    dispatch({ type: GET_QUIZ_ERROR });
  }
}

const saveScore = quizData => async(dispatch) => {
  const { score, category } = quizData;
  dispatch({ type: SAVE_SCORE_PENDING})
  try {
    const token = Token.getToken();
    const response = await axios({
      url: `${API_URL}/quiz/records`,
      method: 'POST',
      headers: {
        'x-access-token': token,
      },
      data: {
        score,
        category,
      }
    });

    const { message } = response.data;

    dispatch({
      type: SAVE_SCORE_SUCCESS,
      message
    })
  } catch (error) {
    dispatch({ type: SAVE_SCORE_ERROR });
  }
}


export {
  saveScore,
  fetchQuiz
}