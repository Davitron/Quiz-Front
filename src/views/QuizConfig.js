import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import "../styles/home.scss";
import Category from './Category'; 

class QuizConfig extends Component {
  state = {
    categoryOpen: false,
  }

  componentWillMount() {
    if(this.props.isLoggedIn === false) {
      this.props.history.push('/');
    }
  }

  openCategories = () => {
    this.setState({ categoryOpen: true });
  }

  render() {
    return (
      <div id="quiz">
        <div className="home">
          <div className="section section__hero" style={{ color: 'white' }}>
            <div className="quiz-container">
              <h3 className="animated fadeInUp">
                <q>
                  <i>
                    Quizzing is not a sport?<br />
                    You can say that to my fast reflex skills,
                    trained brain and toned butt.
                  </i>
                </q>
              </h3>
              <div className="controls">
                <Button size="large" variant="outlined" color="inherit" onClick={this.openCategories}>
                  Take A Quiz
                </Button>
                <Button size="large" variant="outlined" color="inherit">
                  LeaderBoard
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Category open={this.state.categoryOpen} history={this.props.history} />
      </div>
    )
  }
}


const matchStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn
})


export default connect(matchStateToProps, null)(QuizConfig);