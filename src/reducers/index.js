import { combineReducers } from 'redux';
import user from './UserReducer';
import quiz from './QuizReducer';

export default combineReducers ({
  user,
  quiz
});