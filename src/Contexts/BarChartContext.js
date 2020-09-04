import React, { createContext, useReducer } from 'react';

export const BarChartContext = createContext();

const BarChartReducer = (state, action) => {
  let points = [...state.series.data];
  let categories = [...state.xAxis.categories];

  switch (action.type) {
    case 'CHANGE_CHART_TITLE':
      // return action.text !== ""
      //   ? { ...state, title: { text: action.text } }
      //   : { ...state, title: { text: "My Chart" } };
      return { ...state, title: { text: action.text } };
    case 'CHANGE_CATEGORY':
      const catIndex = state.xAxis.categories.indexOf(action.old);
      categories[catIndex] = action.new;
      return {
        ...state,
        xAxis: { categories: categories },
      };
    case 'CHANGE_Y_TITLE':
      return {
        ...state,
        yAxis: {
          ...state.yAxis,
          title: {
            text: action.newYTitle,
          },
        },
      };
    case 'CHANGE_Y_RANGE_MIN':
      return {
        ...state,
        yAxis: {
          ...state.yAxis,
          min: action.newMin,
        },
        chart: [
          {
            ...state.chart,
            dragDrop: {
              ...state.chart.dragDrop,
              dragMinY: action.newMin,
            },
          },
        ],
      };
    case 'CHANGE_Y_RANGE_MAX':
      return {
        ...state,
        yAxis: {
          ...state.yAxis,
          max: action.newMax,
        },
        chart: [
          {
            ...state.chart,
            dragDrop: {
              ...state.chart.dragDrop,
              dragMaxY: action.newMax,
            },
          },
        ],
      };
    case 'CHANGE_Y_TICK_INTERVAL':
      return {
        ...state,
        yAxis: {
          ...state.yAxis,
          tickInterval: action.newTick,
        },
      };
    case 'CHANGE_Y_VALUE':
      const yIndex = state.series.data.findIndex((el) => el.y === action.old);
      points[yIndex].y = parseFloat(action.new);
      return {
        ...state,
        series: [{ ...state.series, data: points }],
      };

    case 'DELETE_POINT':
      const indexOfPoint = state.series.data.findIndex(
        (el) => el.y === action.selected.yValue
      );
      points.splice(indexOfPoint, 1);
      categories.splice(indexOfPoint, 1);

      return {
        ...state,
        series: {
          ...state.series,
          data: points,
        },
        xAxis: { ...state.xAxis, categories: categories },
      };

    case 'ADD_POINT':
      points.push(action.newPoint);
      categories.push(action.newCategory);

      return {
        ...state,
        series: {
          ...state.series,
          data: points,
        },
        xAxis: { ...state.xAxis, categories: categories },
      };
    default:
      console.log('default');
      return state;
  }
};

export const BarChartProvider = (props) => {
  const [barChartOptions, dispatch] = useReducer(BarChartReducer, {
    chart: {
      type: 'column',
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
    id: 'chart_id',
    title: {
      text: 'My Chart',
    },
    plotOptions: {
      column: {
        allowPointSelect: true,
        dragDrop: {
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
              console.log('select', e);
            },
            unselect: (e) => {
              console.log('unselect', e);
            },
          },
        },
      },
    },
    xAxis: {
      categories: [],
      // categories: ['Jan', 'Feb', 'Mar', 'Apr'],
    },
    yAxis: {
      title: {
        text: 'Values',
      },
      min: 0,
      max: 10,
      tickInterval: 1,
    },
    series: {
      name: 'BarChartData',
      data: [
        // { selected: false, y: 1 },
        // { selected: false, y: 2 },
        // { selected: false, y: 3 },
        // { selected: false, y: 4 },
      ],
    },
  });

  return (
    <BarChartContext.Provider
      value={{ barChartOptions: barChartOptions, dispatch }}>
      {props.children}
    </BarChartContext.Provider>
  );
};
