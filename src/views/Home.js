import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import '../styles/home.scss';
import Login from './forms/Login';
import Register from './forms/Register';
import Typography from '@material-ui/core/Typography';
import logo from '../assets/Quiz@2x.png';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  grow: {
    flexGrow: 1,
    color: "white !important",
    fontSize: "4rem !important",
    textAlign: "center",
  },
};

class Home extends Component {
  render() {
    const { classes } = this.props;
    console.log(this.props.location);
    return (
      <div id="quiz">
        <Grid  container spacing={0}>
          <Grid item xs={12} sm={6} className="logo-grid">
            <div className="section section__hero" style={{ color: 'white' }}>
              <div className="my-container">
                <Typography variant="h4" className={classes.grow}>
                  Quizely
                </Typography><br/>
                <img alt="logo" src={logo} />
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} className="logo-grid">
            {
              (this.props.location.pathname === "/") ? <Login history={this.props.history} /> : <Register history={this.props.history} />
            }
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
