import React, { useState, useContext, useLayoutEffect, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
// import { BarChartContext } from '../Contexts/BarChartContext';
import BarChart from '../Components/BarChart';
import DeleteButton from '../Components/DeleteButton';
import AddButton from '../Components/AddButton';
import { BarChartProvider, BarChartContext } from '../Contexts/BarChartContext';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

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

const BarChartView = () => {
  const classes = useStyles();

  const initialViewState = {
    point: {
      isPointSelected: false,
      categoryName: '',
      yValue: null,
    },
  };

  const { barChartOptions, dispatch } = useContext(BarChartContext);
  // const [chartOptions, setChartOptions] = useState(barChartOptions);
  const [viewState, setViewState] = useState(initialViewState);

  // useLayoutEffect(() => {
  //   setChartOptions(barChartOptions);
  // }, [barChartOptions]);

  const chartClickHandler = (e) => {
    let selectedPoint = [];

    if (barChartOptions.xAxis.categories.includes(e.target.innerHTML)) {
      const index = barChartOptions.xAxis.categories.indexOf(
        e.target.innerHTML
      );
      selectedPoint.push({
        selected: true,
        category: barChartOptions.xAxis.categories[index],
        yValue: barChartOptions.series[0].data[index],
      });
    } else {
      // ? CAN I DO THIS WITHOUT USING REF A LOT ELSEWHERE?
      selectedPoint = this.barChartRef.current.chart.getSelectedPoints();
    }

    selectedPoint.length > 0
      ? setViewState({
          point: {
            isPointSelected: selectedPoint[0].selected,
            categoryName: selectedPoint[0].category,
            yValue: selectedPoint[0].y,
          },
        })
      : setViewState({
          point: {
            isPointSelected: false,
            categoryName: '',
            yValue: 0,
          },
        });
  };

  const chartDragHandler = (e) => {
    // ? CAN I DO THIS WITHOUT USING REF A LOT ELSEWHERE?
    const selectedPoint = this.barChartRef.current.chart.getSelectedPoints();

    if (selectedPoint.length !== 0) {
      setViewState({
        point: {
          isPointSelected: selectedPoint[0].options.selected,
          categoryName: selectedPoint[0].category,
          yValue: selectedPoint[0].y,
        },
      });
    }
  };

  const setIsPointSelected = (isSelected) => {
    setViewState({
      ...viewState,
      point: { ...viewState.point, isPointSelected: isSelected },
    });
  };

  const chartNameChange = (e) => {
    // const { dispatch } = this.context;
    dispatch({ type: 'CHANGE_CHART_TITLE', text: e.target.value });
  };

  const yAxisTitleChange = (e) => {
    // const { dispatch } = this.context;
    dispatch({ type: 'CHANGE_Y_TITLE', newYTitle: e.target.value });
  };

  const yAxisRangeChange = (e) => {
    // const { dispatch } = this.context;

    switch (e.target.id) {
      case 'chartYMin':
        dispatch({
          type: 'CHANGE_Y_RANGE_MIN',
          newMin: Number(e.target.value),
        });
        break;
      case 'chartYMax':
        dispatch({
          type: 'CHANGE_Y_RANGE_MAX',
          newMax: Number(e.target.value),
        });
        break;
      default:
        break;
    }
  };

  const changeYTickHandler = (e) => {
    // const { dispatch } = this.context;
    if (!isNaN(Number(e.target.value)) && Number(e.target.value) > 0) {
      dispatch({
        type: 'CHANGE_Y_TICK_INTERVAL',
        newTick: Number(e.target.value),
      });
    }
  };

  const addButtonClickHandle = () => {
    dispatch({
      type: 'ADD_POINT',
      newPoint: {
        selected: false,
        y: 1,
      },
      newCategory: 'New Category',
    });
  };

  const chartPointChange = (e) => {
    // const { chartOptions, dispatch } = this.context;

    switch (e.target.id) {
      case 'pointCategoryInput':
        e.persist();
        const oldCategory = viewState.point.categoryName;
        const newCategory = e.target.value === '' ? '' : e.target.value;

        setViewState({
          ...viewState,
          point: { ...viewState.point, categoryName: newCategory },
        });

        dispatch({
          type: 'CHANGE_CATEGORY',
          old: oldCategory,
          new: newCategory,
        });
        break;

      case 'pointYValueInput':
        const oldValue = viewState.point.yValue;
        const newValue = Number(e.target.value);

        setViewState(
          {
            ...viewState,
            point: { ...viewState.point, yValue: parseFloat(newValue) },
          },
          () => {
            dispatch({ type: 'CHANGE_Y_VALUE', old: oldValue, new: newValue });

            // this.barChartRef.current.chart.series[0].setData(
            //   chartOptions.series[0].data,
            //   true
            // );
          }
        );

        break;

      default:
        break;
    }
  };

  return (
    <>
      <Grid className={classes.container}>
        <BarChart chartOptions={barChartOptions} />
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
                  value={barChartOptions.title.text}
                  onChange={chartNameChange}
                />
                <TextField
                  id='yAxisTitle'
                  type='text'
                  label='Y-Axis Title'
                  placeholder='Enter Y-Axis Title'
                  variant='outlined'
                  value={barChartOptions.yAxis.title.text}
                  onChange={yAxisTitleChange}
                />
                <div>
                  <TextField
                    id='chartYMin'
                    type='number'
                    label='Y-Axis Min'
                    placeholder='Enter Y-Axis Min'
                    variant='outlined'
                    value={barChartOptions.yAxis.min || ''}
                    onChange={yAxisRangeChange}
                  />
                  <TextField
                    id='chartYMax'
                    type='number'
                    label='Y-Axis Max'
                    placeholder='Enter Y-Axis Max'
                    variant='outlined'
                    value={barChartOptions.yAxis.max || ''}
                    onChange={yAxisRangeChange}
                  />
                </div>
                <TextField
                  id='chartYInterval'
                  type='number'
                  label='Y-Axis Interval'
                  placeholder='Enter Y-Axis Interval'
                  variant='outlined'
                  value={barChartOptions.yAxis.tickInterval || ''}
                  onChange={changeYTickHandler}
                />
                <AddButton clickHandler={addButtonClickHandle} />
              </div>
              {viewState.point.isPointSelected ? (
                <>
                  <Divider variant='middle' />
                  <div className={classes.section}>
                    <TextField
                      id='pointCategoryInput'
                      type='text'
                      label='Category'
                      placeholder='Enter Category Name'
                      value={viewState.point.categoryName || ''}
                      variant='outlined'
                      onChange={chartPointChange}
                    />
                    <DeleteButton
                      selected={viewState.point}
                      selectedHandler={setIsPointSelected}
                    />
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

export default BarChartView;
