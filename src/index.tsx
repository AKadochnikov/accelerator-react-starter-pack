import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {api} from './services/api';
import {rootReducer} from './store/root-reducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    })
  ),
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
