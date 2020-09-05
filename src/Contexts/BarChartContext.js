import React, { createContext, useReducer } from 'react';

export const BarChartContext = createContext();

export const BAR_CHART_ACTIONS = {
  ADD_POINT: 'ADD_POINT',
  CHANGE_CATEGORY: 'CHANGE_CATEGORY',
  CHANGE_CHART_TITLE: 'CHANGE_CHART_TITLE',
  CHANGE_DRAG_MIN: 'CHANGE_DRAG_MIN',
  CHANGE_DRAG_MAX: 'CHANGE_DRAG_MAX',
  CHANGE_Y_RANGE_MIN: 'CHANGE_Y_RANGE_MIN',
  CHANGE_Y_RANGE_MAX: 'CHANGE_Y_RANGE_MAX',
  CHANGE_Y_TICK_INTERVAL: 'CHANGE_Y_TICK_INTERVAL',
  CHANGE_Y_TITLE: 'CHANGE_Y_TITLE',
  CHANGE_Y_VALUE: 'CHANGE_Y_VALUE',
  DELETE_POINT: 'DELETE_POINT',
};

const BarChartReducer = (state, action) => {
  let points = [...state.series.data];
  let categories = [...state.xAxis.categories];

  switch (action.type) {
    case BAR_CHART_ACTIONS.CHANGE_CHART_TITLE:
      // return action.text !== ""
      //   ? { ...state, title: { text: action.text } }
      //   : { ...state, title: { text: "My Chart" } };
      return { ...state, title: { text: action.text } };
    case BAR_CHART_ACTIONS.CHANGE_CATEGORY:
      categories[action.indexToChange] = action.newCategoryName;
      return {
        ...state,
        xAxis: { categories: categories },
      };
    case BAR_CHART_ACTIONS.CHANGE_DRAG_MIN:
      return {
        ...state,
        plotOptions: {
          ...state.plotOptions,
          column: {
            ...state.plotOptions.column,
            dragDrop: {
              ...state.plotOptions.column.dragDrop,
              dragMinY: action.newDragMinY,
            },
          },
        },
      };
    case BAR_CHART_ACTIONS.CHANGE_DRAG_MAX:
      return {
        ...state,
        plotOptions: {
          ...state.plotOptions,
          column: {
            ...state.plotOptions.column,
            dragDrop: {
              ...state.plotOptions.column.dragDrop,
              dragMaxY: action.newDragMaxY,
            },
          },
        },
      };
    case BAR_CHART_ACTIONS.CHANGE_Y_TITLE:
      return {
        ...state,
        yAxis: {
          ...state.yAxis,
          title: {
            text: action.newYTitle,
          },
        },
      };
    case BAR_CHART_ACTIONS.CHANGE_Y_RANGE_MIN:
      return {
        ...state,
        yAxis: {
          ...state.yAxis,
          min: action.newMin,
        },
      };
    case BAR_CHART_ACTIONS.CHANGE_Y_RANGE_MAX:
      return {
        ...state,
        yAxis: {
          ...state.yAxis,
          max: action.newMax,
        },
      };
    case BAR_CHART_ACTIONS.CHANGE_Y_TICK_INTERVAL:
      return {
        ...state,
        yAxis: {
          ...state.yAxis,
          tickInterval: action.newTick,
        },
      };
    case BAR_CHART_ACTIONS.CHANGE_Y_VALUE:
      const yIndex = state.series.data.findIndex((el) => el.y === action.old);
      points[yIndex].y = parseFloat(action.new);
      return {
        ...state,
        series: [{ ...state.series, data: points }],
      };

    case BAR_CHART_ACTIONS.DELETE_POINT:
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

    case BAR_CHART_ACTIONS.ADD_POINT:
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
  const [barChartOptions, barChartDispatch] = useReducer(BarChartReducer, {
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
              console.log(props);
            },
            select: (e) => {
              console.log('select', e.target.index);
            },
            unselect: (e) => {
              // console.log('unselect', e);
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
      min: '0',
      max: '10',
      tickInterval: '1',
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
      value={{ barChartOptions: barChartOptions, barChartDispatch }}>
      {props.children}
    </BarChartContext.Provider>
  );
};
