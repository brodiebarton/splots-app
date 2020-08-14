import React from 'react';
// import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
// import NotificationsIcon from '@material-ui/icons/Notifications';
// import AddIcon from "@material-ui/icons/Add";
// import { mainListItems, secondaryListItems } from "../Components/listItems";
import BarChartView from '../Views/BarChartView';
import ScatterPlot from '../Components/ScatterPlot';

// const useStyles = makeStyles((theme) => ({}));

export default function Dashboard() {
  //   const classes = useStyles();

  return (
    <>
      {/* <Container maxWidth="lg" className={classes.container}> */}
      <Grid container spacing={3} justify='space-evenly'>
        <Grid item xs={6}>
          <BarChartView />
        </Grid>
        <Grid item xs={6}>
          <ScatterPlot />
        </Grid>
        <Grid item xs={6}>
          <BarChartView />
        </Grid>
      </Grid>
    </>
  );
}
