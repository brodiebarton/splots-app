import React, { useContext, useEffect, useState, useRef } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { ChartContext } from '../Contexts/ChartContext';
import draggable from 'highcharts/modules/draggable-points';

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

const BarChart = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const { chartOptions } = useContext(ChartContext);

  useEffect(() => {
    ref.current.chart.series[0].setData(
      chartOptions.series[0].data,
      true,
      true
    );
  }, [props, ref, chartOptions]);

  return (
    <div id='myBarChart' className={classes.myBarChart}>
      <Paper className={classes.paper}>
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
          ref={ref}
        />
      </Paper>
    </div>
  );
});

export default BarChart;
