import React from 'react';
import Home from './Components/Home';
import './App.css';
// import 'normalize.css';
import CssBaseLine from '@material-ui/core/CssBaseline';

function App() {
  return (
    <div className="App">
		<CssBaseLine />
	  	<Home />
    </div>
  );
}

export default App;
