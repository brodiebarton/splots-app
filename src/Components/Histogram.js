import React, { useContext, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import histogram from 'highcharts/modules/histogram-bellcurve';
import { UserContext, USER_ACTIONS } from '../Contexts/UserContext';

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

const Histogram = ({ chartOptions }) => {
  const { userState, userStateDispatch } = useContext(UserContext);
  const chartRef = useRef();
  const classes = useStyles();

  return (
    // <div id='myHistogram' className={classes.histogram}>
    <Paper className={classes.paper}>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        allowChartUpdate={true}
        updateArgs={[true, true, true]}
        callback={(chart) => {
          chartRef.current = chart;
        }}
      />
    </Paper>
    // </div>
  );
};

export default Histogram;
