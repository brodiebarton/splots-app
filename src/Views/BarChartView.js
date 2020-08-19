import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import { BarChartContext } from "../Contexts/BarChartContext";
import BarChart from "../Components/BarChart";
import DeleteButton from "../Components/DeleteButton";

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
  section: {
    display: "flex",
    width: "100%",
    marginTop: theme.spacing(2),
    flexDirection: "column",
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

    this.chartClickHandler = this.chartClickHandler.bind(this);
    this.chartNameChange = this.chartNameChange.bind(this);
    this.chartPointChange = this.chartPointChange.bind(this);

    this.state = {
      point: {
        // isPointSelected: false,
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

    this.barChartRef.current.container.current.addEventListener(
      "click",
      (e) => {
        this.chartClickHandler(e);
      }
    );

    this.barChartRef.current.container.current.addEventListener(
      "mouseup",
      (e) => {
        console.log("mouse UP");
        // ! UPDATE POINT STATE
      }
    );
    // console.log(this.barChartRef.current.chart.options.series[0].point.events);

    // this.barChartRef.current.chart.addEvent(
    //   this.barChartRef.current.chart,
    //   "drop",
    //   (e) => {
    //     console.log("drag event test");
    //   }
    // );
  }

  //   shouldComponentUpdate(nextProps, nextState) {
  //     console.log("shouldComponentUpdate");
  //     if (nextState !== this.state) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }

  //   componentWillUpdate(nextProps, nextState) {
  //     console.log("componentWillUpdate");
  //     const { barChartOptions } = this.context;
  //     this.barChartRef.current.chart.series[0].setData(
  //       barChartOptions.series[0].data,
  //       true
  //     );
  //     this.barChartRef.current.chart.update(barChartOptions, true);
  //   }

  componentDidUpdate() {
    // console.log("componentDidUpdate");
    // this.barChart.update(this.state.options);
    // console.log(this.barChartRef.current.chart.getSelectedPoints());
    // console.log(
    //   this.barChartRef.current.chart.options.plotOptions.column.point.events
    // );
  }

  componentWillUnmount() {
    // document
    //   .getElementById("myBarChart")
    //   .removeEventListener("click", this.chartClickHandler);
    this.barChartRef.current.container.current.removeEventListener(
      "click",
      (e) => this.chartClickHandler(e)
    );

    this.barChartRef.current.container.current.removeEventListener("mouseup");
  }

  chartClickHandler(e) {
    // console.log(this.barChart);
    console.log(e.target);
    // console.log(this.barChart.getSelectedPoints());
    const selectedPoint = this.barChartRef.current.chart.getSelectedPoints();

    // console.log("SELECTED POINT");
    // console.log(selectedPoint);

    selectedPoint.length > 0
      ? this.setState({
          point: {
            isPointSelected: selectedPoint[0].selected,
            categoryName: selectedPoint[0].category,
            yValue: selectedPoint[0].y,
          },
        })
      : this.setState({
          point: {
            isPointSelected: false,
            categoryName: "",
            yValue: 0,
          },
        });
    // console.log(this.barChartRef.current.chart);
    // console.log(e);
  }

  chartNameChange(e) {
    // e.persist();
    const { dispatch } = this.context;
    dispatch({ type: "CHANGE_CHART_TITLE", text: e.target.value });
    // e.target.value !== ''
    //   ? setBarChartOptions({
    //       ...barChartOptions,
    //       title: { text: e.target.value },
    //     })
    //   : setBarChartOptions({ ...barChartOptions, title: { text: 'My Chart' } });
  }

  chartPointChange(e) {
    const { barChartOptions, dispatch } = this.context;

    // const prevState = { ...this.state };

    switch (e.target.id) {
      case "pointCategoryInput":
        e.persist();
        const oldCategory = this.state.point.categoryName;
        const newCategory = e.target.value === "" ? "" : e.target.value;

        this.setState({
          ...this.state,
          point: { ...this.state.point, categoryName: newCategory },
        });

        dispatch({
          type: "CHANGE_CATEGORY",
          old: oldCategory,
          new: newCategory,
        });
        break;

      case "pointYValueInput":
        const oldValue = this.state.point.yValue;
        const newValue = Number(e.target.value);

        this.setState(
          {
            ...this.state,
            point: { ...this.state.point, yValue: parseFloat(newValue) },
          },
          () => {
            dispatch({ type: "CHANGE_Y_VALUE", old: oldValue, new: newValue });

            // this.barChartRef.current.chart.update(barChartOptions, true);
            this.barChartRef.current.chart.series[0].setData(
              barChartOptions.series[0].data,
              true
            );
          }
        );

        break;

      default:
        break;
    }

    // Update and Redraw Chart
    // this.barChartRef.current.chart.update(barChartOptions, true);
  }

  render() {
    const { classes } = this.props;
    const isPointSelected = this.state.point.isPointSelected;
    const { barChartOptions } = this.context;
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
              autoComplete='off'
              aria-label='Chart Modification Form'>
              <section>
                <div className={classes.section}>
                  <TextField
                    id='chartName'
                    label='Chart Name'
                    placeholder='Enter Chart Name'
                    variant='outlined'
                    value={barChartOptions.title.text}
                    onChange={this.chartNameChange}
                  />
                </div>
                {isPointSelected ? (
                  <>
                    <Divider variant='middle' />
                    <div className={classes.section}>
                      <TextField
                        id='pointCategoryInput'
                        label='Category'
                        value={this.state.point.categoryName}
                        variant='outlined'
                        onChange={this.chartPointChange}
                      />
                      <DeleteButton selectedPoint={this.state.point} />

                      {/* <TextField
													id='pointYValueInput'
													label='Value'
													value={parseFloat(this.state.point.yValue)}
													type='number'
													step={1}
													variant='outlined'
													onChange={this.chartPointChange}
												/> */}
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </section>
            </form>
          </Paper>
        </Grid>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(BarChartView);
