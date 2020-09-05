import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import {
  BarChartContext,
  BAR_CHART_ACTIONS,
} from '../Contexts/BarChartContext';
import { UserContext, USER_ACTIONS } from '../Contexts/UserContext';

const useStyles = makeStyles((theme) => ({
  deleteButton: {
    maxWidth: '50%',
    margin: 'auto',
  },
}));

const DeleteButton = (props) => {
  const classes = useStyles();

  const { barChartDispatch } = useContext(BarChartContext);
  const { userStateDispatch } = useContext(UserContext);
  const clickHandle = () => {
    barChartDispatch({
      type: BAR_CHART_ACTIONS.DELETE_POINT,
      selected: props.selected,
    });

    //? Do I need to check if dispatch DELETE_POINT was successful
    //? Or is it okay to just always deselect point in BarChartView?
    userStateDispatch({ type: USER_ACTIONS.SELECTION_RESET });
  };

  return (
    <Button
      className={classes.deleteButton}
      onClick={clickHandle}
      variant='contained'
      color='secondary'
      startIcon={<DeleteIcon />}>
      Delete
    </Button>
  );
};

export default DeleteButton;
