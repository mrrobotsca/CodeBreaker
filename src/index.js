import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from 'redux-persist/lib/integration/react';

import { Provider } from "react-redux";
import { store, persistor } from './redux/store';
import { AuthProvider } from './contexts/AuthContext';
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <App />
          </Router>
        </PersistGate>
      </Provider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
