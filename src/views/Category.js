import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { categories } from '../constant'
import CategoryDialog from './CategoryDialog';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  paperSelected: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: "white",
    background: '#5954F9',
    background: 'linear-gradient(to left, #5954F9, #2450A1)',
  }
});

class Category extends Component {
  state = {
    open: false,
    selected: false,
    selectedCategory: null,
    categoryName: null
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.state.open) {
      this.setState({ open: nextProps.open });
    }
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSelect = (category) => {
    const { id, name } = category;
    this.setState(prevState => ({
      selected: !prevState.selected,
      selectedCategory: (prevState.selectedCategory === id) ? null : id,
      categoryName: (prevState.selectedCategory === id) ? null : name
    }));
  }

  handleStartQuiz = () => {
    this.setState({ open: false });
    this.props.history.push('/quiz-start',
    { 
      categoryId: this.state.selectedCategory,
      category: this.state.categoryName
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CategoryDialog
          classes={classes}
          open={this.state.open}
          handleSelect={this.handleSelect}
          selectedCategory={this.state.selectedCategory}
          selected={this.state.selected}
          categories={categories}
          handleClose={this.handleClose}
          handleStartQuiz={this.handleStartQuiz}
        />
      </React.Fragment>
    );
  }
}

Category.propTypes = {
  open: PropTypes.bool.isRequired
}

export default withStyles(styles)(Category);
