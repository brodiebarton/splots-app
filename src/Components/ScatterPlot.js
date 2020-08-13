import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export default function ScatterPlot() {
  const options = {
    title: {
      text: "My Scatter Plot",
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
        type: "scatter",
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
          54.4,
        ],
      },
    ],
  };

  const useStyles = makeStyles((theme) => ({
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
    },
    fixedHeight: {
      height: 240,
    },
  }));

  const classes = useStyles();

  return (
    <>
      {/* <Container maxWidth="lg" className={classes.container}> */}
      {/* <Grid container spacing={2}> */}
      {/* Chart */}
      {/* <Grid item xs={12} md={8} lg={9}> */}
      <Paper className={classes.paper}>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </Paper>
      {/* </Grid> */}

      {/* <Grid item xs={12} md={4} lg={3}>
				</Grid> */}

      {/* <Grid item xs={12}>
					<Paper className={classes.paper}>
						<h3>Display Test</h3>
						<p>Below Chart</p>
					</Paper>
				</Grid> */}
      {/* </Grid> */}
      {/* </Container> */}
    </>
  );
}
