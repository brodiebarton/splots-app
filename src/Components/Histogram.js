import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import histogram from 'highcharts/modules/histogram-bellcurve';

// init Highcharts modules
histogram(Highcharts);

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    paddingRight: theme.spacing(4),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    width: '100%',
    // flexGrow: 1,
  },
  histogram: {
    width: '100%',
    minWidth: '399px',
    [theme.breakpoints.up('lg')]: {
      maxWidth: '800px',
    },
    margin: '0 auto',
  },
}));

const Histogram = () => {
  let data = [3.5, 3, 3.2, 3.1, 3.6, 3.9, 3.4, 3.4, 2.9, 3.1, 3.7, 3.4];

  const options = {
    title: {
      text: 'Histogram',
    },

    xAxis: [
      {
        title: { text: 'Data' },
        alignTicks: false,
      },
      {
        title: { text: 'Histogram' },
        alignTicks: false,
        opposite: false,
      },
    ],

    yAxis: [
      {
        title: { text: 'Data' },
      },
      {
        title: { text: 'Histogram' },
        opposite: false,
      },
    ],

    plotOptions: {
      histogram: {
        // accessibility: {
        //   pointDescriptionFormatter: function (point) {
        //     let ix = point.index + 1,
        //       x1 = point.x.toFixed(3),
        //       x2 = point.x2.toFixed(3),
        //       val = point.y;
        //     return ix + '. ' + x1 + ' to ' + x2 + ', ' + val + '.';
        //   },
        // },
      },
    },

    series: [
      {
        name: 'Histogram',
        type: 'histogram',
        data: data,
        xAxis: 1,
        yAxis: 1,
        baseSeries: 's1',
        // zIndex: -1,
      },
    ],
  };

  const classes = useStyles();

  return (
    <div id='myHistogram' className={classes.histogram}>
      <Paper className={classes.paper}>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </Paper>
    </div>
  );
};

export default Histogram;
