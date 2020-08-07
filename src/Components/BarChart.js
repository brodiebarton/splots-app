import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Container from '@material-ui/core/Container';
import Grid  from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
	container: {
	  display: 'flex',
	  flexDirection: 'row',
	  width: '100%',

	},
	paper: {
	  padding: theme.spacing(2),
	  display: 'flex',
	  overflow: 'auto',
	  flexDirection: 'column',
	  flexGrow: 1,
	},
	sideBar: {
		position: 'relative',
		height: '100vh',
		paddingTop: theme.spacing(4),
		paddingRight: theme.spacing(2),
		paddingBottom: theme.spacing(4),
		paddingLeft: theme.spacing(2),
	}
  });

  

class BarChart extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			options: {
				credits: {
					enabled: false,
				},
				legend: {
					enabled: false,
				},
				id: 'barChartId',
				title: {
					text: "My Chart",
				},
				xAxis: {
					categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
				},
				series: [{
					type: 'column',
					allowPointSelect: true,
					data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
				}]
			},
		};
	}

	componentDidMount() {
		// const chartElement = document.querySelector('.highcharts-root');
  		// chartElement.addEventListener('click', (e) => this.chartClickHandler(e, chartElement));
	}

	componentDidUpdate() {
	}


	chartClickHandler(e, c) {
		// const target = e;
		console.log(e.target['height'], c);
	}

	chartNameChange(e) {
		console.log(e.target.value);
		this.setState({ options: {...this.state.options, title: {text: e.target.value}}});
	}
	

	render() {
		const { classes } = this.props;
		return(
			<>
				<Grid className={classes.container}>
					{/* Chart */}
					<Paper className={classes.paper}>
					<div id="myBarChart">
						<HighchartsReact highcharts={Highcharts} options={this.state.options} />
					</div>
					</Paper>
					<Paper className={ classes.sideBar }>
						<form noValidate autoComplete="off">
							<TextField id="chartName" label="Chart Name" variant="outlined" onChange={this.chartNameChange.bind(this)} />
						</form>
					</Paper>
				</Grid>
			</>
		);
	}
}

export default withStyles(styles, { withTheme: true })(BarChart);


// export default function BarChart() {

	
// 	const options = {
// 		title: {
// 			text: 'My Bar Chart'
// 		},
// 		xAxis: {
// 			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
// 		},
// 		series: [{
// 			type: 'column',
// 			allowPointSelect: true,
// 			data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
// 		}]
// 	}

// 	const useStyles = makeStyles((theme) => ({
		
// 		container: {
// 		  paddingTop: theme.spacing(4),
// 		  paddingBottom: theme.spacing(4),
// 		},
// 		paper: {
// 		  padding: theme.spacing(2),
// 		  display: 'flex',
// 		  overflow: 'auto',
// 		  flexDirection: 'column',
// 		},
// 		fixedHeight: {
// 		  height: 240,
// 		},
// 	  }));

// 	  const classes = useStyles();

// 	return(
// 		<>
// 		{/* <Container maxWidth="lg" className={classes.container}> */}
// 			{/* <Grid container spacing={2}> */}
// 				{/* Chart */}
// 				{/* <Grid item xs={12} md={8} lg={9}> */}
// 					<Paper className={classes.paper}>
// 					{/* <div id="chart"> */}
// 						<HighchartsReact highcharts={Highcharts} options={options} />
// 					{/* </div> */}
// 					</Paper>
// 				{/* </Grid> */}

// 				{/* <Grid item xs={12} md={4} lg={3}>
// 				</Grid> */}

// 				{/* <Grid item xs={12}>
// 					<Paper className={classes.paper}>
// 						<h3>Display Test</h3>
// 						<p>Below Chart</p>
// 					</Paper>
// 				</Grid> */}
// 			{/* </Grid> */}
// 		{/* </Container> */}
// 		</>
// 	);

// }