import React, { useContext, useEffect, useState, useRef } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { BarChartContext } from "../Contexts/BarChartContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    paddingRight: theme.spacing(4),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    width: "100%",
    // flexGrow: 1,
  },
  myBarChart: {
    width: "100%",
    minWidth: "399px",
    [theme.breakpoints.up("lg")]: {
      maxWidth: "800px",
    },
    margin: "0 auto",
  },
}));

const BarChart = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const { barChartOptions } = useContext(BarChartContext);
  // const [chart, setChart] = useState(ref);
  // const chartRef = useRef(chart);

  useEffect(() => {
    ref.current.chart.update(barChartOptions, true);
  }, [props, ref, barChartOptions]);

  return (
    <div id='myBarChart' className={classes.myBarChart}>
      <Paper className={classes.paper}>
        <HighchartsReact
          highcharts={Highcharts}
          options={barChartOptions}
          ref={ref}
        />
      </Paper>
    </div>
  );
});

// const BarChart = () => {
//   const classes = useStyles();
//   const [barChartOptions, setBarChartOptions] = useContext(BarChartContext);
//   //   const barChartRef = React.createRef();

//   //   useEffect(() => {
//   //   }, [barChartOptions]);

//   return (
//     <div id="myBarChart" className={classes.myBarChart}>
//       <Paper className={classes.paper}>
//         <HighchartsReact highcharts={Highcharts} options={barChartOptions} />
//       </Paper>
//     </div>
//   );
// };

export default BarChart;
