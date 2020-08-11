import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    flexGrow: 1,
  },
  sideBar: {
    position: "relative",
    height: "100vh",
    paddingTop: theme.spacing(4),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(2),
  },
  myBarChart: {
    minWidth: "400px",
    maxWidth: "50vw",
    width: "100%",
    margin: "0 auto",
  },
});

class BarChart extends React.Component {
  constructor(props) {
    super(props);

    this.barChart = null;

    this.state = {
      user: {
        isPointSelected: false,
      },
      options: {
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
      },
    };
  }

  componentDidMount() {
    // const chartElement = document.querySelector('.highcharts-root');
    // chartElement.addEventListener('click', (e) => this.chartClickHandler(e, chartElement));
    this.barChart = document.querySelector("#myBarChar");
  }

  chartClickHandler(e) {
    const selectedPoint = this.barChart.getSelectedPoints();
    if (selectedPoint[0]) {
      this.setState({
        ...this.state,
        user: { isPointSelected: true },
      });
      const { category, options } = selectedPoint[0];
      console.log(`${category} ${options.y}`);
    } else {
      this.setState({
        ...this.state,
        user: { isPointSelected: true },
      });
    }
  }

  chartNameChange(e) {
    e.target.value !== ""
      ? this.setState({
          options: { ...this.state.options, title: { text: e.target.value } },
        })
      : this.setState({
          options: { ...this.state.options, title: { text: "My Chart" } },
        });
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <Grid className={classes.container}>
          {/* Chart */}
          <Paper className={classes.paper}>
            {/* <div
              key="myBarChart"
              id="myBarChart"
              className={classes.myBarChart}
              onClick={this.chartClickHandler.bind(this)}
            ></div> */}
            <HighchartsReact
              id="myBarChart"
              className={classes.myBarChart}
              options={this.state.options}
            />
          </Paper>
          <Paper className={classes.sideBar}>
            <form noValidate autoComplete="off">
              <TextField
                id="chartName"
                label={this.state.options.title.text}
                placeholder="Enter Chart Name"
                variant="outlined"
                onChange={this.chartNameChange.bind(this)}
              />
            </form>
          </Paper>
        </Grid>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(BarChart);
