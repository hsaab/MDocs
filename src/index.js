import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './App.js'

ReactDOM.render(<MuiThemeProvider><App/></MuiThemeProvider>, document.getElementById('root'));

registerServiceWorker();
