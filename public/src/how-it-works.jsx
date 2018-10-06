import React from "react";
import ReactDOM from "react-dom";
import AppContainer from "./components/App.jsx";
import HowItWorksPageContainer from "./components/HowItWorksPage.jsx";

window.addEventListener("load", main);

function main() {
  ReactDOM.render(
    <AppContainer>
      <HowItWorksPageContainer />
    </AppContainer>,
    document.querySelector("#root")
  );
}