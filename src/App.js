import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './views/NavBar';
import Home from './views/Home';
import QuizConfig from './views/QuizConfig';
import Quiz from './views/Quiz';
import NotFound from './views/NotFound';
import { checkAuth } from './actions/user';
import './App.css';


class App extends Component {

  componentWillMount() {
    this.props.checkAuth();
  }
  render() {
    return (
      <Router>
        <React.Fragment>
          <Navbar />
          <Switch>
            <Route path="/quiz" exact component={QuizConfig} />
            <Route path="/quiz-start" exact component={Quiz} />
            <Route path="/" exact component={Home} />
            <Route path="/register" exact component={Home} />
            <Route component={NotFound} />
          </Switch>
        </React.Fragment>
      </Router>
    )
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  checkAuth
}, dispatch)

export default connect(null, mapDispatchToProps)(App);
