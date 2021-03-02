import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { CssBaseline } from '@material-ui/core';

ReactDOM.render(
  // <React.StrictMode>
  <div>
    <CssBaseline />
    <App />
  </div>,
  // </React.StrictMode>,
  document.getElementById('root')
  );
  
  console.log(App.title)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
