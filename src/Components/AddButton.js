import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { ChartContext } from '../Contexts/ChartContext';

const useStyles = makeStyles((theme) => ({
  addButton: {
    backgroundColor: 'green',
    margin: 'auto',
    width: '50%',
  },
}));

const AddButton = () => {
  const classes = useStyles();

  const { dispatch } = useContext(ChartContext);

  const clickHandle = () => {
    dispatch({ type: 'ADD_POINT', newValue: 1, newCategory: 'New Category' });
  };

  return (
    <Button
      className={classes.addButton}
      onClick={clickHandle}
      variant='contained'
      color='secondary'
      startIcon={<AddIcon />}>
      Add
    </Button>
  );
};

export default AddButton;
