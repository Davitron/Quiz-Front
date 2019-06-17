import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';


class CategoryDialog extends Component {
  renderCategories = () => {
    const {
      selectedCategory,
      classes,
      categories,
      handleSelect
    } = this.props
    return categories.map((category) => (
      <Grid key={category.id}item xs={12} sm={4}>
        <Paper
          onClick={() => { handleSelect(category) }}
          className={
            (selectedCategory === category.id)
            ? classes.paperSelected
            : classes.paper
          }
        >
          {category.name}
        </Paper>
      </Grid>
    ))
  }
  render() {
    const {
      selectedCategory,
      classes,
      handleClose,
      open,
      handleSelect,
      handleStartQuiz,
    } = this.props
    return (
      <Dialog
      fullWidth
      maxWidth="lg"
      open={open}
      onClose={handleClose}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle id="max-width-dialog-title">
        Select a Category
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={24}>
        <Grid item xs={12} sm={4}>
          <Paper
            onClick={() => { handleSelect({name: 'ny Category', id: 0}) }}
            className={
              (selectedCategory === 0)
              ? classes.paperSelected
              : classes.paper
            }
          >
            Any Category
          </Paper>
          </Grid>
          {this.renderCategories()}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleStartQuiz} color="primary">
          Start
        </Button>
        <Button onClick={handleClose} color="defualt">
          Close
        </Button>
      </DialogActions>
    </Dialog>
    )
  }
}

CategoryDialog.propTypes = {
  selectedCategory: PropTypes.number,
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleSelect: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default CategoryDialog;