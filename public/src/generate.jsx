import React from "react";
import ReactDOM from "react-dom";
import AppContainer from "./components/App.jsx";
import {NAVBAR_NAMES} from "./components/NavigationBar.jsx";
import GeneratePageContainer from "./components/GeneratePage.jsx";

window.addEventListener("load", main);

function main() {
  ReactDOM.render(
    <AppContainer active_page={NAVBAR_NAMES.GENERATE}>
      <GeneratePageContainer />
    </AppContainer>,
    document.querySelector("#root")
  );
}