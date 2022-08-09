import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import 'react-toastify/dist/ReactToastify.min.css';
import App from './app/App';
import { ToastContainer } from 'react-toastify';
import {Provider} from 'react-redux';
import store from './app/store/store';
import {BrowserRouter as Router} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <ToastContainer position='bottom-right'/>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </>
);

