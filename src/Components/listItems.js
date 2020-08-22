import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
// import LayersIcon from '@material-ui/icons/Layers';
// import AssignmentIcon from '@material-ui/icons/Assignment';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import TrendChartIcon from '@material-ui/icons/TrendingUp';
import TimelineIcon from '@material-ui/icons/Timeline';
import { Link } from '@reach/router';

const linkStyle = { textDecoration: 'inherit', color: 'inherit' };
export const mainListItems = (
  <>
    <Link to='dashboard' style={linkStyle}>
      <ListItem id='dashboard-button' button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary='Dashboard' />
      </ListItem>
    </Link>

    <Link to='bar-chart' style={linkStyle}>
      <ListItem id='bar-chart-button' button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary='Bar Chart' />
      </ListItem>
    </Link>

    <Link to='scatter-plot' style={linkStyle}>
      <ListItem id='' button>
        <ListItemIcon>
          <BubbleChartIcon />
        </ListItemIcon>
        <ListItemText primary='Scatter Plot' />
      </ListItem>
    </Link>

    <Link to='' style={linkStyle}>
      <ListItem id='' button>
        <ListItemIcon>
          <TrendChartIcon />
        </ListItemIcon>
        <ListItemText primary='Dot Plot' />
      </ListItem>
    </Link>
  </>
);

export const secondaryListItems = (
  <>
    <ListSubheader inset>Saved Charts</ListSubheader>

    <ListItem button>
      <ListItemIcon>
        <BubbleChartIcon />
      </ListItemIcon>
      <ListItemText primary='Current month' />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <TimelineIcon />
      </ListItemIcon>
      <ListItemText primary='Last quarter' />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <TrendChartIcon />
      </ListItemIcon>
      <ListItemText primary='Year-end sale' />
    </ListItem>
  </>
);
