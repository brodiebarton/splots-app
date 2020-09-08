import React, { useState, useContext, useLayoutEffect, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteButton from '../Components/DeleteButton';
import AddButton from '../Components/AddButton';
import {
  HistogramProvider,
  HistogramContext,
  HISTOGRAM_ACTIONS,
} from '../Contexts/HistogramContext';
import { UserContext, USER_ACTIONS } from '../Contexts/UserContext';
import Histogram from '../Components/Histogram';

// ? Extract styles to external file?
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
    alignContent: 'center',
  },
  section: {
    display: 'flex',
    width: '100%',
    marginTop: theme.spacing(2),
    flexDirection: 'column',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    // flexGrow: 1,
  },
  sideBar: {
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      position: 'relative',
      right: 0,
      height: '100vh',
    },
    height: '100%',
    paddingTop: theme.spacing(4),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    input: {
      margin: 20,
    },
  },
  chartControlForm: {
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'space-around',
    '& div': {
      border: `5px solid transparent`,
    },
  },
}));

const HistogramView = () => {
  const classes = useStyles();

  const { histogramOptions, histogramDispatch } = useContext(HistogramContext);
  const { userState, userStateDispatch } = useContext(UserContext);

  const chartNameChange = (e) => {
    // const { histogramDispatch } = this.context;
    histogramDispatch({
      type: HISTOGRAM_ACTIONS.CHANGE_CHART_TITLE,
      text: e.target.value,
    });
  };

  const xAxisTitleChange = (e) => {
    histogramDispatch({
      type: HISTOGRAM_ACTIONS.CHANGE_X_TITLE,
      newXTitle: e.target.value,
    });
  };

  const yAxisTitleChange = (e) => {
    // const { histogramDispatch } = this.context;
    histogramDispatch({
      type: HISTOGRAM_ACTIONS.CHANGE_Y_TITLE,
      newYTitle: e.target.value,
    });
  };

  const xAxisRangeChange = (e) => {
    switch (e.target.id) {
      case 'chartXMin':
        histogramDispatch({
          type: HISTOGRAM_ACTIONS.CHANGE_X_RANGE_MIN,
          newMin: e.target.value,
        });
        break;
      case 'chartXMax':
        histogramDispatch({
          type: HISTOGRAM_ACTIONS.CHANGE_X_RANGE_MAX,
          newMax: e.target.value,
        });
        break;
      default:
        break;
    }
  };

  const yAxisRangeChange = (e) => {
    // const { histogramDispatch } = this.context;

    switch (e.target.id) {
      case 'chartYMin':
        histogramDispatch({
          type: HISTOGRAM_ACTIONS.CHANGE_Y_RANGE_MIN,
          newMin: e.target.value,
        });
        histogramDispatch({
          type: HISTOGRAM_ACTIONS.CHANGE_DRAG_MIN,
          newDragMinY: e.target.value,
        });
        break;
      case 'chartYMax':
        histogramDispatch({
          type: HISTOGRAM_ACTIONS.CHANGE_Y_RANGE_MAX,
          newMax: e.target.value,
        });
        histogramDispatch({
          type: HISTOGRAM_ACTIONS.CHANGE_DRAG_MAX,
          newDragMaxY: e.target.value,
        });
        break;
      default:
        break;
    }
  };

  const changeXTickHandler = (e) => {
    if (!isNaN(Number(e.target.value)) && Number(e.target.value) > 0) {
      histogramDispatch({
        type: HISTOGRAM_ACTIONS.CHANGE_X_TICK_INTERVAL,
        newTick: e.target.value,
      });
    } else {
      histogramDispatch({
        type: HISTOGRAM_ACTIONS.CHANGE_X_TICK_INTERVAL,
        newTick: '',
      });
    }
  };

  const changeYTickHandler = (e) => {
    if (!isNaN(Number(e.target.value)) && Number(e.target.value) > 0) {
      histogramDispatch({
        type: HISTOGRAM_ACTIONS.CHANGE_Y_TICK_INTERVAL,
        newTick: e.target.value,
      });
    } else {
      histogramDispatch({
        type: HISTOGRAM_ACTIONS.CHANGE_Y_TICK_INTERVAL,
        newTick: '',
      });
    }
  };

  const addButtonClickHandle = () => {
    histogramDispatch({
      type: HISTOGRAM_ACTIONS.ADD_POINT,
      // TODO - Remove payload and move it to BarChartContext
      newPoint: {
        selected: false,
        y: 1,
      },
      newCategory: 'New Category',
    });
  };

  const chartPointChange = (e) => {
    // const { chartOptions, histogramDispatch } = this.context;
    switch (e.target.id) {
      case 'pointCategoryInput':
        e.persist();
        const newCategory = e.target.value === '' ? '' : e.target.value;

        userStateDispatch({
          type: USER_ACTIONS.CHANGE_SELECTION_CATEGORY,
          newCategoryName: e.target.value,
        });

        histogramDispatch({
          type: HISTOGRAM_ACTIONS.CHANGE_CATEGORY,
          indexToChange: userState.selection.point.index,
          newCategoryName: newCategory,
        });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Grid className={classes.container}>
        <Histogram chartOptions={histogramOptions} />
        <Paper className={classes.sideBar}>
          <form
            className={classes.chartControlForm}
            onSubmit={(e) => {
              e.preventDefault();
            }}
            noValidate
            autoComplete='off'
            aria-label='Chart Modification Form'>
            <section>
              <div className={classes.section}>
                <TextField
                  id='chartName'
                  type='text'
                  label='Chart Name'
                  placeholder='Enter Chart Name'
                  variant='outlined'
                  value={histogramOptions.title.text}
                  onChange={chartNameChange}
                />
                {/* X Axis Controls */}
                <TextField
                  id='xAxisTitle'
                  type='text'
                  label='X-Axis Title'
                  placeholder='Enter X-Axis Title'
                  variant='outlined'
                  value={histogramOptions.xAxis.title.text}
                  onChange={xAxisTitleChange}
                />
                <div>
                  <TextField
                    id='chartXMin'
                    type='number'
                    label='X-Axis Min'
                    placeholder='Enter X-Axis Min'
                    variant='outlined'
                    value={histogramOptions.xAxis.min}
                    onChange={xAxisRangeChange}
                  />
                  <TextField
                    id='chartXMax'
                    type='number'
                    label='X-Axis Max'
                    placeholder='Enter X-Axis Max'
                    variant='outlined'
                    value={histogramOptions.xAxis.max}
                    onChange={xAxisRangeChange}
                  />
                </div>
                <TextField
                  id='chartXInterval'
                  type='number'
                  label='X-Axis Interval'
                  placeholder='Enter X-Axis Interval'
                  variant='outlined'
                  value={histogramOptions.xAxis.tickInterval}
                  onChange={changeXTickHandler}
                />
                {/* Y Axis Controls */}
                <TextField
                  id='yAxisTitle'
                  type='text'
                  label='Y-Axis Title'
                  placeholder='Enter Y-Axis Title'
                  variant='outlined'
                  value={histogramOptions.yAxis.title.text}
                  onChange={yAxisTitleChange}
                />
                <div>
                  <TextField
                    id='chartYMin'
                    type='number'
                    label='Y-Axis Min'
                    placeholder='Enter Y-Axis Min'
                    variant='outlined'
                    value={histogramOptions.yAxis.min}
                    onChange={yAxisRangeChange}
                  />
                  <TextField
                    id='chartYMax'
                    type='number'
                    label='Y-Axis Max'
                    placeholder='Enter Y-Axis Max'
                    variant='outlined'
                    value={histogramOptions.yAxis.max}
                    onChange={yAxisRangeChange}
                  />
                </div>
                <TextField
                  id='chartYInterval'
                  type='number'
                  label='Y-Axis Interval'
                  placeholder='Enter Y-Axis Interval'
                  variant='outlined'
                  value={histogramOptions.yAxis.tickInterval}
                  onChange={changeYTickHandler}
                />
                <AddButton clickHandler={addButtonClickHandle} />
              </div>
              {userState.selection.point.isPointSelected ? (
                <>
                  <Divider variant='middle' />
                  <div className={classes.section}>
                    <TextField
                      id='pointCategoryInput'
                      type='text'
                      label='Category'
                      placeholder='Enter Category Name'
                      value={userState.selection.point.categoryName}
                      variant='outlined'
                      onChange={chartPointChange}
                    />
                    <DeleteButton selected={userState.selection.point} />
                  </div>
                </>
              ) : (
                <></>
              )}
            </section>
          </form>
        </Paper>
      </Grid>
    </>
  );
};

export default HistogramView;
