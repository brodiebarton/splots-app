import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import { BarChartContext } from "../Contexts/BarChartContext";

const useStyles = makeStyles((theme) => ({
  addButton: {
    backgroundColor: "green",
    margin: "auto",
    width: "50%",
  },
}));

const AddButton = () => {
  const classes = useStyles();

  const { dispatch } = useContext(BarChartContext);

  const clickHandle = () => {
    dispatch({ type: "ADD_POINT", newValue: 10, newCategory: "New Category" });
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
