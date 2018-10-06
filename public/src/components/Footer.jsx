import React from "react";
import {IDS} from "../variables/identifiers.jsx";
import {APP_NAME} from "../variables/identifiers.jsx";
import {uppercaseFirstLettersSimpleString} from "../utilities/utils.jsx";

const FOOTER_OPTIONS = [
  { name: "privacy", url: "/privacy" },
  { name: "about", url: "/about" },
  { name: "how it works", url: "/how-it-works" },
];

class FooterContainer extends React.Component {
  render() {
    return <FooterView {...this.props} />;
  }
}

function FooterView(props) {
  return (
    <footer id={IDS.footer}>
      <ul>
        {FOOTER_OPTIONS.map((navbar_option_obj, index) => {
          const { name, url } = navbar_option_obj;
          // todo - should display icon in case of home page
          return <li className={"footer-item"} key={index}>
            <a href={url}>{uppercaseFirstLettersSimpleString(name)}</a>
          </li>;
        })}
      </ul>
      Copyright &#9400; 2018-2019 {APP_NAME}
    </footer>
  );
}

export default FooterContainer;