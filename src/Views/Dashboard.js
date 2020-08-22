import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import NotificationsIcon from '@material-ui/icons/Notifications';
// import AddIcon from "@material-ui/icons/Add";
// import { mainListItems, secondaryListItems } from "../Components/listItems";
import BarChartView from '../Views/BarChartView';
import ScatterPlot from '../Components/ScatterPlot';
import Paper from '@material-ui/core/Paper';
import { Link } from '@reach/router';

const useStyles = makeStyles((theme) => ({
  chartTypeContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    margin: 'auto',
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  linkStyle: {
    textDecoration: 'none',
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  return (
    <Grid className={classes.chartTypeContainer} container spacing={2}>
      <Grid item>
        <Link to='/bar-chart' className={classes.linkStyle}>
          <Paper className={classes.paper}>
            <img
              src='https://via.placeholder.com/300'
              alt='placeholder-img'></img>
            <h2>Bar Chart</h2>
          </Paper>
        </Link>
      </Grid>

      <Grid item>
        <Link to='/scatter-plot' className={classes.linkStyle}>
          <Paper className={classes.paper}>
            <img src='https://via.placeholder.com/300' alt='placeholder-img' />
            <h2>Scatter Plot</h2>
          </Paper>
        </Link>
      </Grid>

      <Grid item>
        <Link to='/histogram' className={classes.linkStyle}>
          <Paper className={classes.paper}>
            <img src='https://via.placeholder.com/300' alt='placeholder-img' />
            <h2>Histogram</h2>
          </Paper>
        </Link>
      </Grid>
    </Grid>
  );
}
