import React, { createContext, useState } from "react";

export const BarChartContext = createContext();

export const BarChartProvider = (props) => {
  const [barChartOptions, setBarChartOptions] = useState({
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
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    series: [
      {
        type: "column",
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
          155.4,
        ],
      },
    ],
  });

  return (
    <BarChartContext.Provider value={[barChartOptions, setBarChartOptions]}>
      {props.children}
    </BarChartContext.Provider>
  );
};
