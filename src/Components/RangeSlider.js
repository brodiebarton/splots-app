import React, { useContext, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { BarChartContext } from "../Contexts/BarChartContext";

// !! BROKEN DON'T USE !!

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

function valueText(value) {
  return `${value}`;
}

const RangeSlider = ({ sliderId, label, values }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(values);

  const { barChartOptions, dispatch } = useContext(BarChartContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    dispatch({ type: "CHANGE_Y_RANGE", min: newValue[0], max: newValue[1] });
  };

  return (
    <div className={classes.root}>
      <Typography id={`${sliderId}`} gutterBottom>
        {label}
      </Typography>
      <Slider
        value={value}
        min={value[0]}
        max={value[1]}
        onChange={handleChange}
        valueLabelDisplay='auto'
        aria-labelledby={`${sliderId}`}
        getAriaValueText={valueText}
      />
    </div>
  );
};

export default RangeSlider;
