import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
import 'bootstrap/dist/css/bootstrap.min.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById("root"));//attach html to ur react page
root.render(
  <>
    <ToastContainer />
    <App />
  </>
);