import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Home';

import { BrowserRouter } from 'react-router-dom';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css React-Confirm-Alert

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);