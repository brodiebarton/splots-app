import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
  scatterPlot: {
    width: '100%',
    minWidth: '399px',
    [theme.breakpoints.up('lg')]: {
      maxWidth: '800px',
    },
    margin: '0 auto',
  },
}));

const ScatterPlot = () => {
  const options = {
    title: {
      text: 'My Scatter Plot',
    },
    xAxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
    series: [
      {
        type: 'scatter',
        allowPointSelect: true,
        data: [
          29.9,
          71.5,
          106.4,
          129.2,
          144.0,
          176.0,
          135.6,
          148.5,
          216.4,
          194.1,
          95.6,
          54.4,
        ],
      },
    ],
  };
  const classes = useStyles();

  return (
    <div id='myScatterPlot' className={classes.scatterPlot}>
      <Paper className={classes.paper}>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </Paper>
    </div>
  );
};

export default ScatterPlot;
