import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { BarChartContext } from '../Contexts/BarChartContext';
import draggable from 'highcharts/modules/draggable-points';
import { useRef } from 'react';

// init Highcharts modules
draggable(Highcharts);

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    paddingRight: theme.spacing(4),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    width: '100%',
  },
  myBarChart: {
    width: '100%',
    minWidth: '399px',
    [theme.breakpoints.up('lg')]: {
      maxWidth: '800px',
    },
    margin: '0 auto',
  },
}));

// const BarChart = React.forwardRef((props, ref) => {
const BarChart = ({ options }) => {
  const classes = useStyles();
  const { barChartOptions } = useContext(BarChartContext);
  // const { barChartOptions } = useContext(BarChartContext);
  // useEffect(() => {
  //   ref.current.chart.series[0].setData(
  //     barChartOptions.series[0].data,
  //     true,
  //     true
  //   );
  // }, [props, ref, barChartOptions]);

  return (
    // <div id='myBarChart' className={classes.myBarChart}>
    <Paper className={classes.paper}>
      <HighchartsReact
        highcharts={Highcharts}
        options={barChartOptions}
        allowChartUpdate={true}
        oneToOne={true}
      />
    </Paper>
    // </div>
  );
};

export default BarChart;
