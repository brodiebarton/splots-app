import React, { createContext, useReducer } from "react";

export const BarChartContext = createContext();

const barChartReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_CHART_TITLE":
      // return action.text !== ""
      //   ? { ...state, title: { text: action.text } }
      //   : { ...state, title: { text: "My Chart" } };
      return { ...state, title: { text: action.text } };
    case "CHANGE_CATEGORY":
      let newCategories = [...state.xAxis.categories];
      const catIndex = state.xAxis.categories.indexOf(action.old);
      newCategories[catIndex] = action.new;
      return {
        ...state,
        xAxis: { categories: newCategories },
      };
    case "CHANGE_Y_VALUE":
      let newData = [...state.series[0].data];
      const yIndex = state.series[0].data.findIndex(
        (el) => el.y === action.old
      );
      console.log(yIndex);
      newData[yIndex].y = parseFloat(action.new);
      return {
        ...state,
        series: { ...state.series, 0: { ...state.series[0], data: newData } },
      };

    default:
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
