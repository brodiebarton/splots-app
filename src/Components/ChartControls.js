import React from 'react';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import AddButton from './AddButton';
import DeleteButton from './DeleteButton';

const useStyles = makeStyles((theme) => ({
  section: {
    display: 'flex',
    width: '100%',
    marginTop: theme.spacing(2),
    flexDirection: 'column',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    // flexGrow: 1,
  },
  sideBar: {
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      position: 'relative',
      right: 0,
      height: '100vh',
    },
    height: '100%',
    paddingTop: theme.spacing(4),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    input: {
      margin: 20,
    },
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

const ChartControls = ({ chartOptions, isSelected, pointState, handlers }) => {
  const classes = useStyles();

  return (
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
              type='text'
              label='Chart Name'
              placeholder='Enter Chart Name'
              variant='outlined'
              value={chartOptions.title.text}
              onChange={handlers.chartNameChange}
            />
            <TextField
              id='yAxisTitle'
              type='text'
              label='Y-Axis Title'
              placeholder='Enter Y-Axis Title'
              variant='outlined'
              value={chartOptions.yAxis.title.text}
              onChange={handlers.yAxisTitleChange}
            />
            <div>
              <TextField
                id='chartYMin'
                type='number'
                label='Y-Axis Min'
                placeholder='Enter Y-Axis Min'
                variant='outlined'
                value={chartOptions.yAxis.min || ''}
                onChange={handlers.yAxisRangeChange}
              />
              <TextField
                id='chartYMax'
                type='number'
                label='Y-Axis Max'
                placeholder='Enter Y-Axis Max'
                variant='outlined'
                value={chartOptions.yAxis.max || ''}
                onChange={handlers.yAxisRangeChange}
              />
            </div>
            <TextField
              id='chartYInterval'
              type='number'
              label='Y-Axis Interval'
              placeholder='Enter Y-Axis Interval'
              variant='outlined'
              value={chartOptions.yAxis.tickInterval || ''}
              onChange={handlers.changeYTickHandler}
            />
            <AddButton />
          </div>
          {isSelected ? (
            <>
              <Divider variant='middle' />
              <div className={classes.section}>
                <TextField
                  id='pointCategoryInput'
                  type='text'
                  label='Category'
                  placeholder='Enter Category Name'
                  value={pointState.point.categoryName || ''}
                  variant='outlined'
                  onChange={handlers.chartPointChange}
                />
                <DeleteButton
                  selected={pointState.point}
                  selectedHandler={handlers.selectedStateHandler}
                />
              </div>
            </>
          ) : (
            <></>
          )}
        </section>
      </form>
    </Paper>
  );
};

export default ChartControls;
