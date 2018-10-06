import React from "react";
import ReactDOM from "react-dom";
import AppContainer from "./components/App.jsx";
import PredictPageContainer from "./components/PredictPage.jsx";
import {NAVBAR_NAMES} from "./components/NavigationBar.jsx";

window.addEventListener("load", main);

function main() {
  ReactDOM.render(
    <AppContainer active_page={NAVBAR_NAMES.PREDICT}>
      <PredictPageContainer />
    </AppContainer>,
    document.querySelector("#root")
  );
}