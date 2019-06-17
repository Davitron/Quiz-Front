import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
import "../styles/home.scss"


class NotFound extends Component {
  render() {
    console.log(this.props.match)
    return (
      <div id="quiz">
        <div className="home">
          <div className="section section__hero" style={{ color: 'white' }}>
            <div className="my-container" style={{ paddingTop: '8em' }}>
              <h3 className="animated fadeInUp">
                <q>
                  <i>
                    Houston we have problem.
                  </i>
                </q>
              </h3> 
              <div className="controls">
                <Button size="large" variant="outlined" color="inherit">
                  return Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NotFound;