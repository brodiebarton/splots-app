import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import { BarChartContext } from "../Contexts/BarChartContext";

const useStyles = makeStyles((theme) => ({
  deleteButton: {
    maxWidth: "50%",
    margin: "auto",
  },
}));

const DeleteButton = (props) => {
  const classes = useStyles();

  const { dispatch } = useContext(BarChartContext);

  const clickHandle = () => {
    // console.log(props.selectedPoint);
    dispatch({ type: "DELETE_POINT", test: props.selectedPoint });
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
