import React, { createContext, useReducer } from "react";

export const BarChartContext = createContext();

const barChartReducer = (state, action) => {
  let points = [...state.series[0].data];
  let categories = [...state.xAxis.categories];

  switch (action.type) {
    case "CHANGE_CHART_TITLE":
      // return action.text !== ""
      //   ? { ...state, title: { text: action.text } }
      //   : { ...state, title: { text: "My Chart" } };
      return { ...state, title: { text: action.text } };
    case "CHANGE_CATEGORY":
      const catIndex = state.xAxis.categories.indexOf(action.old);
      categories[catIndex] = action.new;
      return {
        ...state,
        xAxis: { categories: categories },
      };
    case "CHANGE_Y_VALUE":
      const yIndex = state.series[0].data.findIndex(
        (el) => el.y === action.old
      );
      console.log(yIndex);
      points[yIndex].y = parseFloat(action.new);
      return {
        ...state,
        series: { ...state.series, 0: { ...state.series[0], data: points } },
      };

    case "DELETE_POINT":
      const indexOfPoint = state.series[0].data.findIndex(
        (el) => el.y === action.selected.yValue
      );
      points.splice(indexOfPoint, 1);
      categories.splice(indexOfPoint, 1);
      // const check = {
      //   ...state,
      //   series: {
      //     ...state.series,
      //     0: { ...state.series[0], data: points },
      //   },
      //   xAxis: { ...state.xAxis, categories: categories },
      // };

      return {
        ...state,
        series: {
          ...state.series,
          0: { ...state.series[0], data: points },
        },
        xAxis: { ...state.xAxis, categories: categories },
      };

    default:
      console.log("default");
      return state;
  }
};

export const BarChartProvider = (props) => {
  const [barChartOptions, dispatch] = useReducer(barChartReducer, {
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    id: "barChartId",
    title: {
      text: "My Chart",
    },
    xAxis: {
      categories: ["Jan", "Feb", "Mar", "Apr"],
    },
    series: [
      {
        type: "column",
        allowPointSelect: true,
        dragDrop: {
          draggableY: true,
          dragPrecisionY: 1,
        },
        point: {
          events: {
            // dragStart: function (e) {
            //   console.log("drag start");
            //   console.log(e);
            // },
            // drag: function (e) {
            //   console.log("dragging...");
            // },
            drop: function (e) {
              console.log("drag end");
              // console.log(e.target);
              // console.log(barChartOptions.series[0].data);
              // const originKey = Object.keys(e.origin.points)[0];
              // const oldYValue = e.origin.points[originKey].y;
              // const newYValue = e.newPoint.y;
            },
          },
        },
        data: [
          { selected: false, y: 29.9 },
          { selected: false, y: 71.5 },
          { selected: false, y: 106.4 },
          { selected: false, y: 206.4 },
        ],
      },
    ],
  });

  return (
    <BarChartContext.Provider value={{ barChartOptions, dispatch }}>
      {props.children}
    </BarChartContext.Provider>
  );
};
