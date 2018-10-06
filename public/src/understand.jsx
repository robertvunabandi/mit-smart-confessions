import React from "react";
import ReactDOM from "react-dom";
import AppContainer from "./components/App.jsx";
import {NAVBAR_NAMES} from "./components/NavigationBar.jsx";
import UnderstandPageContainer from "./components/UnderstandPage.jsx";

window.addEventListener("load", main);

function main() {
  ReactDOM.render(
    <AppContainer active_page={NAVBAR_NAMES.UNDERSTAND}>
      <UnderstandPageContainer />
    </AppContainer>,
    document.querySelector("#root")
  );
}