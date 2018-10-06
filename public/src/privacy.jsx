import React from "react";
import ReactDOM from "react-dom";
import AppContainer from "./components/App.jsx";
import PrivacyPageContainer from "./components/PrivacyPage.jsx";

window.addEventListener("load", main);

function main() {
  ReactDOM.render(
    <AppContainer>
      <PrivacyPageContainer />
    </AppContainer>,
    document.querySelector("#root")
  );
}