import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { BarChartContext } from "../Contexts/BarChartContext";
import BarChart from "../Components/BarChart";

const styles = (theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
    alignContent: "center",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    // flexGrow: 1,
  },
  sideBar: {
    position: "relative",
    [theme.breakpoints.up("md")]: {
      position: "relative",
      right: 0,
      height: "100vh",
    },
    height: "100%",
    paddingTop: theme.spacing(4),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    input: {
      margin: 20,
    },
  },
  chartControlForm: {
    display: "flex",
    flexDirection: "column",
    justifyItems: "space-around",
    "& div": {
      border: `5px solid transparent`,
    },
  },
});

class BarChartView extends React.Component {
  static contextType = BarChartContext;
  constructor(props) {
    super(props);

    this.barChartRef = React.createRef();
    this.state = {
      point: {
        isPointSelected: false,
        categoryName: "",
        yValue: 0,
      },
    };
  }

  componentDidMount() {
    // this.barChart = Highcharts.chart(
    //   document.getElementById("myBarChart"),
    //   this.state.options
    // );
    // this.chartClickListener = document
    //   .getElementById("myBarChart")
    //   .addEventListener("click", this.chartClickHandler.bind(this));
    this.barChartRef.current.container.current.addEventListener("click", (e) =>
      this.chartClickHandler(e)
    );
  }

  componentDidUpdate() {
    // console.log("componentDidUpdate");
    // this.barChart.update(this.state.options);
    console.log("component update");
    console.log(this.barChartRef.current.chart.getSelectedPoints());
  }

  componentWillUnmount() {
    // document
    //   .getElementById("myBarChart")
    //   .removeEventListener("click", this.chartClickHandler);
    this.barChartRef.current.container.current.removeEventListener(
      "click",
      (e) => this.chartClickHandler(e)
    );
    console.log("listener unmounted");
  }

  chartClickHandler(e) {
    // console.log(this.barChart);
    // console.log(e.target);
    // console.log(this.barChart.getSelectedPoints());
    const selectedPoint = this.barChartRef.current.chart.getSelectedPoints();
    console.log(selectedPoint.length);

    selectedPoint.length > 0
      ? this.setState({
          point: {
            isPointSelected: true,
            categoryName: selectedPoint[0].category,
            yValue: selectedPoint[0].y,
          },
        })
      : this.setState({
          point: { ...this.state.point, isPointSelected: false },
        });

    // console.log(this.barChartRef.current.chart);
    // console.log(e);
  }

  chartNameChange(e) {
    // e.persist();
    const [barChartOptions, setBarChartOptions] = this.context;

    e.target.value !== ""
      ? setBarChartOptions({
          ...barChartOptions,
          title: { text: e.target.value },
        })
      : setBarChartOptions({ ...barChartOptions, title: { text: "My Chart" } });
  }

  chartPointChange(e) {
    switch (e.target.id) {
      case "pointCategoryInput":
        break;
      case "pointYValueInput":
        break;

      default:
        break;
    }
  }

  render() {
    const { classes } = this.props;
    const isPointSelected = this.state.point.isPointSelected;
    // const [barChartOptions, setBarChartOptions] = this.context;
    // console.log(barChartOptions.title.text);
    return (
      <>
        <Grid className={classes.container}>
          {/* Chart */}
          {/* <Paper className={classes.paper}>
            <div id="myBarChart" className={classes.myBarChart}></div>
          </Paper> */}
          <BarChart ref={this.barChartRef} />
          <Paper className={classes.sideBar}>
            <form
              className={classes.chartControlForm}
              onSubmit={(e) => {
                e.preventDefault();
              }}
              noValidate
              autoComplete="off"
              aria-label="Chart Modification Form"
            >
              <TextField
                id="chartName"
                label="Chart Name"
                placeholder="Enter Chart Name"
                variant="outlined"
                // value={barChartOptions.title.text}
                onChange={(e) => {
                  this.chartNameChange(e);
                }}
              />
              {isPointSelected ? (
                <>
                  <TextField
                    id="pointCategoryInput"
                    label="Category"
                    placeholder={this.state.point.categoryName}
                    variant="outlined"
                    onChange={(e) => {
                      this.chartPointChange(e);
                    }}
                  />
                  <TextField
                    id="pointYValueInput"
                    label="Number"
                    type="number"
                    placeholder={this.state.point.yValue}
                    variant="outlined"
                    onChange={(e) => {
                      this.chartPointChange(e);
                    }}
                  />
                </>
              ) : (
                <></>
              )}
            </form>
          </Paper>
        </Grid>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(BarChartView);
