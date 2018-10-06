import React from "react";
import {NavBarContainer, NAVBAR_NAMES} from "./NavigationBar.jsx";
import FooterContainer from "./Footer.jsx";
import "../styles/main.css";
import {IDS} from "../variables/identifiers.jsx";

class AppContainer extends React.Component {
  render() {
    return <AppView {...this.props} />;
  }
}

function AppView(props) {
  return (
    <div>
      <NavBarContainer active_page={props.active_page || NAVBAR_NAMES.HOME}/>
      <div id={IDS.rootInit}>{props.children}</div>
      <FooterContainer />
    </div>
  );
}

export default AppContainer;