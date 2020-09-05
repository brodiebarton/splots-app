import React, { useRef, useContext, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import draggable from 'highcharts/modules/draggable-points';
import { UserContext, USER_ACTIONS } from '../Contexts/UserContext';

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
const BarChart = ({ chartOptions }) => {
  const { userState, userStateDispatch } = useContext(UserContext);
  const classes = useStyles();
  const chartRef = useRef();

  const chartPointSelectionHandle = (e) => {
    if (e.target.point) {
      if (e.target.point.selected === true) {
        const newPoint = {
          index: e.target.point.index,
          isPointSelected: e.target.point.selected,
          categoryName: e.target.point.category,
          yValue: e.target.point.y,
        };
        userStateDispatch({
          type: USER_ACTIONS.CHANGE_SELECTION,
          newPoint: newPoint,
        });
      }
    } else {
      // Reset User Selection State
      userStateDispatch({ type: USER_ACTIONS.SELECTION_RESET });
      // ! This will only work if there is only 1 series
      // Deselect point if user clicks off point
      const validPoints = chartRef.current.series[0].getValidPoints();
      if (validPoints.length > 0) {
        validPoints.forEach((point) => {
          point.select(false);
        });
      }
    }
  };

  useEffect(() => {
    // onMount
    chartRef.current.container.addEventListener(
      'click',
      chartPointSelectionHandle
    );

    return () => {
      // onUnmount
      chartRef.current.container.removeEventListener(
        'click',
        chartPointSelectionHandle
      );
    };
  }, []);

  return (
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
  );
};

export default BarChart;
