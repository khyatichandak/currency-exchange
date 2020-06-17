import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Rates from "./components/Rates";
import Exchange from "./components/Exchange";
import "bootstrap/dist/css/bootstrap.min.css";
import Chart from "./components/Chart";

function App() {
  return (
    <>
      <Exchange />
      {/* <Chart /> */}
    </>
  );
}

export default App;
