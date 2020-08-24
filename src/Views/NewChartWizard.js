import React from 'react';
import NewBarChart from './NewBarChart';
import NewScatterPlot from './NewScatterPlot';
import NewHistogram from './NewHistogram';

const NewChartWizard = ({ chartType }) => {
  switch (chartType) {
    case 'bar':
      return <NewBarChart />;
    case 'scatter':
      return <NewScatterPlot />;
    case 'histogram':
      return <NewHistogram />;
    default:
      return <h1>No Chart Type</h1>;
  }
};

export default NewChartWizard;
