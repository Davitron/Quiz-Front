import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { login, resetUserState } from '../../actions/user'
import { withAlert } from 'react-alert';

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  componentWillMount() {
    if(this.props.loggedIn) {
      this.props.history.push('/quiz');
    }
  }

  componentWillUpdate(nextProps) {
    if(nextProps.loggedIn) {
      this.props.history.push('/quiz');
    }

    if (nextProps.errorMessage.length > 0) {
      const error = nextProps.errorMessage;
      this.props.alert.show(error, {
        type: 'error'
      });
      this.props.resetUserState();
    }
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  
  onSubmit = () => {
    this.props.login(this.state)
  }

  render() {
    return (
      <div className="auth-cards">
        <h2>Sign In</h2>
        <form>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <TextField
                id="outlined-name"
                label="Email"
                margin="normal"
                variant="outlined"
                name="email"
                fullWidth
                onChange={this.onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-uncontrolled"
                label="Password"
                margin="normal"
                variant="outlined"
                type="password"
                name="password"
                fullWidth
                onChange={this.onChange}
              />
            </Grid>
            <Grid item xs={12} className="login-button">
              <Button
                style={{ width: '100%' }}
                variant="contained"
                size="large"
                color="primary"
                onClick={this.onSubmit}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} className="login-button">
              <Button
                style={{ width: '100%' }}
                variant="contained"
                size="large"
                color="primary"
                id="auth-switch-button"
                onClick={() => {
                  this.props.history.push("/register")
                }}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.user.isLoggedIn,
  isLoading: state.user.isLoading,
  hasError: state.user.hasError,
  errorMessage: state.user.errorMessage,
  success: state.user.success,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    login,
    resetUserState,
  },
  dispatch
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAlert()(Login));