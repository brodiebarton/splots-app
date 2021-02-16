import React, { createContext, useReducer } from 'react';

export const HistogramContext = createContext();

export const HISTOGRAM_ACTIONS = {
  ADD_POINT: 'ADD_POINT',
  CHANGE_CATEGORY: 'CHANGE_CATEGORY',
  CHANGE_CHART_TITLE: 'CHANGE_CHART_TITLE',
  CHANGE_DRAG_MIN: 'CHANGE_DRAG_MIN',
  CHANGE_DRAG_MAX: 'CHANGE_DRAG_MAX',
  CHANGE_X_RANGE_MIN: 'CHANGE_X_RANGE_MIN',
  CHANGE_X_RANGE_MAX: 'CHANGE_X_RANGE_MAX',
  CHANGE_X_TICK_INTERVAL: 'CHANGE_X_TICK_INTERVAL',
  CHANGE_X_TITLE: 'CHANGE_X_TITLE',
  CHANGE_X_VALUE: 'CHANGE_X_VALUE',
  CHANGE_Y_RANGE_MIN: 'CHANGE_Y_RANGE_MIN',
  CHANGE_Y_RANGE_MAX: 'CHANGE_Y_RANGE_MAX',
  CHANGE_Y_TICK_INTERVAL: 'CHANGE_Y_TICK_INTERVAL',
  CHANGE_Y_TITLE: 'CHANGE_Y_TITLE',
  CHANGE_Y_VALUE: 'CHANGE_Y_VALUE',
  DELETE_POINT: 'DELETE_POINT',
};

const HistogramReducer = (state, action) => {
  let points = [...state.series[1].data];
  let categories = [...state.series[1].data];

  switch (action.type) {
    case HISTOGRAM_ACTIONS.CHANGE_CHART_TITLE:
      return { ...state, title: { text: action.text } };
    case HISTOGRAM_ACTIONS.CHANGE_CATEGORY:
      categories[action.indexToChange] = action.newCategoryName;
      return {
        ...state,
        xAxis: { categories: categories },
      };
    case HISTOGRAM_ACTIONS.CHANGE_DRAG_MIN:
      return {
        ...state,
        plotOptions: {
          ...state.plotOptions,
          histogram: {
            ...state.plotOptions.histogram,
            dragDrop: {
              ...state.plotOptions.histogram.dragDrop,
              dragMinY: action.newDragMinY,
            },
          },
        },
      };
    case HISTOGRAM_ACTIONS.CHANGE_DRAG_MAX:
      return {
        ...state,
        plotOptions: {
          ...state.plotOptions,
          histogram: {
            ...state.plotOptions.histogram,
            dragDrop: {
              ...state.plotOptions.histogram.dragDrop,
              dragMaxY: action.newDragMaxY,
            },
          },
        },
      };
    case HISTOGRAM_ACTIONS.CHANGE_X_TITLE:
      return {
        ...state,
        xAxis: {
          ...state.xAxis,
          title: {
            text: action.newXTitle,
          },
        },
      };
    case HISTOGRAM_ACTIONS.CHANGE_X_RANGE_MIN:
      return {
        ...state,
        xAxis: {
          ...state.xAxis,
          min: Number(action.newMin),
        },
      };
    case HISTOGRAM_ACTIONS.CHANGE_X_RANGE_MAX:
      return {
        ...state,
        xAxis: {
          ...state.xAxis,
          max: action.newMax,
        },
      };
    case HISTOGRAM_ACTIONS.CHANGE_X_TICK_INTERVAL:
      return {
        ...state,
        xAxis: {
          ...state.xAxis,
          tickInterval: Number(action.newTick),
        },
      };
    case HISTOGRAM_ACTIONS.CHANGE_X_VALUE:
      const xIndex = state.series[1].data.findIndex(
        (el) => el.x === action.old
      );
      points[xIndex].x = parseFloat(action.new);
      return {
        ...state,
        series: [{ ...state.series, data: points }],
      };
    case HISTOGRAM_ACTIONS.CHANGE_Y_TITLE:
      return {
        ...state,
        yAxis: {
          ...state.yAxis,
          title: {
            text: action.newYTitle,
          },
        },
      };
    case HISTOGRAM_ACTIONS.CHANGE_Y_RANGE_MIN:
      return {
        ...state,
        yAxis: {
          ...state.yAxis,
          min: action.newMin,
        },
      };
    case HISTOGRAM_ACTIONS.CHANGE_Y_RANGE_MAX:
      return {
        ...state,
        yAxis: {
          ...state.yAxis,
          max: action.newMax,
        },
      };
    case HISTOGRAM_ACTIONS.CHANGE_Y_TICK_INTERVAL:
      return {
        ...state,
        yAxis: {
          ...state.yAxis,
          tickInterval: action.newTick,
        },
      };
    case HISTOGRAM_ACTIONS.CHANGE_Y_VALUE:
      const yIndex = state.series[1].data.findIndex(
        (el) => el.y === action.old
      );
      points[yIndex].y = parseFloat(action.new);
      return {
        ...state,
        series: [{ ...state.series, data: points }],
      };

    case HISTOGRAM_ACTIONS.DELETE_POINT:
      points.splice(action.selected.index, 1);
      categories.splice(action.selected.index, 1);

      return {
        ...state,
        series: {
          ...state.series,
          data: points,
        },
        xAxis: { ...state.xAxis, categories: categories },
      };

    case HISTOGRAM_ACTIONS.ADD_POINT:
      points.push(action.newPoint);
      const newState = { ...state, series: [...state.series] };
      newState.series[1].data = points;
      return newState;
    default:
      console.log('default');
      return state;
  }
};

export const HistogramProvider = (props) => {
  const [histogramOptions, histogramDispatch] = useReducer(HistogramReducer, {
    // let data = [3.5, 3, 3.2, 3.1, 3.6, 3.9, 3.4, 3.4, 2.9, 3.1, 3.7, 3.4];
    chart: {
      type: 'histogram',
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    title: {
      text: 'Histogram',
    },

    xAxis: {
      title: { text: 'X AXIS' },
      min: 0,
      max: 10,
      tickInterval: 1,
      alignTicks: false,
    },

    yAxis: {
      title: { text: 'Y AXIS' },
      min: 0,
      max: 10,
      tickInterval: 1,
    },

    plotOptions: {
      histogram: {
        binWidth: 1,
        allowPointSelect: true,
        // pointPadding: 0,
        // borderWidth: 0,
        // groupPadding: 0,
        // shadow: false,
        dragDrop: {
          // draggableX: true,
          draggableY: true,
          // dragPrecisionY: 0.5,
          dragMinY: 0,
          dragMaxY: 10,
        },
        point: {
          events: {
            // click: (e) => {
            //   console.log('click', e);
            // },
            drop: (e) => {
              console.log('drop', e);
            },
            select: (e) => {
              console.log('select', e.target.index);
            },
            unselect: (e) => {
              console.log('un-select', e.target.index);
            },
          },
        },
      },
    },

    series: [
      {
        name: 'Histogram',
        type: 'histogram',
        // xAxis: 1,
        // yAxis: 1,
        baseSeries: 1,
        // zIndex: -1,
      },
      {
        // type: 'histogram',
        visible: false,
        data: [],
      },
    ],
  });

  return (
    <HistogramContext.Provider
      value={{ histogramOptions: histogramOptions, histogramDispatch }}>
      {props.children}
    </HistogramContext.Provider>
  );
};
