import React from 'react';
import Home from './Views/Home';
import './App.css';
// import 'normalize.css';
import CssBaseLine from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { BarChartProvider } from './Contexts/BarChartContext';
import { HistogramProvider } from './Contexts/HistogramContext';
import { UserStateProvider } from './Contexts/UserContext';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <CssBaseLine />
        <UserStateProvider>
          <BarChartProvider>
            <HistogramProvider>
              <Home />
            </HistogramProvider>
          </BarChartProvider>
        </UserStateProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
