import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {BrowserRouter} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastContainer/>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'));
