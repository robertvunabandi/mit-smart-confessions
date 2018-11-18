import React from "react";
import {IDS, CLASSES} from "../variables/identifiers.jsx";
import {uppercaseFirstLettersSimpleString} from "../utilities/utils.jsx";

const NAVBAR_NAMES = {
  HOME: "home",
  PREDICT: "predict",
  GENERATE: "generate",
  UNDERSTAND: "understand",
};

const NAVBAR_OPTIONS = [
  { name: NAVBAR_NAMES.HOME, url: "/" },
  { name: NAVBAR_NAMES.PREDICT, url: "/predict" },
  { name: NAVBAR_NAMES.GENERATE, url: "/generate" },
  { name: NAVBAR_NAMES.UNDERSTAND, url: "/understand" },
];

class NavBarContainer extends React.Component {
  render() {
    return <NavBarView {...this.props}/>;
  }
}

function NavBarView(props) {
  return (
    <nav id={IDS.navBar}>
      <ul>
        {NAVBAR_OPTIONS.map((navbar_option_obj, index) => {
          const { name, url } = navbar_option_obj;
          const active_status_class = props.active_page === name
            ? " " + CLASSES.navbarOptionActiveTab
            : "";
          // todo - should display icon in case of home page
          return <li className={"navbar-option" + active_status_class} key={index}>
            <a href={url}>{uppercaseFirstLettersSimpleString(name)}</a>
          </li>;
        })}
      </ul>
    </nav>
  );
}

export {
  NavBarContainer,
  NAVBAR_NAMES,
};