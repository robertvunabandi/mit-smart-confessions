import React from "react";
import ReactDOM from "react-dom";
import {NAVBAR_NAMES} from "./components/NavigationBar.jsx";
import AppContainer from "./components/App.jsx";
import HomePageContainer from "./components/HomePage.jsx";

window.addEventListener("load", main);

function main() {
  ReactDOM.render(
    <AppContainer active_page={NAVBAR_NAMES.HOME}>
      <HomePageContainer />
    </AppContainer>,
    document.querySelector("#root")
  );
}