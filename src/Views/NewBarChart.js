import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { BarChartContext } from '../Contexts/BarChartContext';
import BarChart from '../Components/BarChart';
import DeleteButton from '../Components/DeleteButton';
import AddButton from '../Components/AddButton';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
    alignContent: 'center',
  },
  section: {
    display: 'flex',
    width: '100%',
    marginTop: theme.spacing(2),
    flexDirection: 'row',
    alignItems: 'space-evenly',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    // flexGrow: 1,
  },
  chartControlForm: {
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'space-around',
    '& div': {
      border: `5px solid transparent`,
    },
  },
}));

const NewBarChart = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        <h1>New Bar Chart Preview</h1>
        <HighchartsReact highcharts={Highcharts} />
        <Divider />
        <form
          className={classes.chartControlForm}
          onSubmit={(e) => {
            e.preventDefault();
          }}
          noValidate
          autoComplete='off'
          aria-label='Chart Modification Form'>
          <TextField
            id='chartName'
            type='text'
            label='Chart Name'
            placeholder='Enter Chart Name'
            variant='outlined'
            // value={}
            // onChange={}
          />
          <TextField
            id='yAxisTitle'
            type='text'
            label='Y-Axis Title'
            placeholder='Enter Y-Axis Title'
            variant='outlined'
            // value={}
            // onChange={}
          />
          <section className={classes.section}>
            <TextField
              id='chartYMin'
              type='number'
              label='Y-Axis Min'
              placeholder='Enter Y-Axis Min'
              variant='outlined'
              // value={}
              // onChange={}
            />
            <TextField
              id='chartYMax'
              type='number'
              label='Y-Axis Max'
              placeholder='Enter Y-Axis Max'
              variant='outlined'
              // value={}
              // onChange={}
            />
          </section>
          <TextField
            id='chartYInterval'
            type='number'
            label='Y-Axis Interval'
            placeholder='Enter Y-Axis Interval'
            variant='outlined'
            // value={}
            // onChange={}
          />
        </form>
      </div>
    </>
  );
};

export default NewBarChart;
