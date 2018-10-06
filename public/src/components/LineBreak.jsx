import React from "react";
import {CLASSES} from "../variables/identifiers.jsx";
import "../styles/line_break.css";

export default class LineBreakContainer extends React.Component {
  render() {
    return <LineBreakView />;
  }
}

function LineBreakView(props) {
  return (
    <div className={CLASSES.lineBreak}>
      <div>{/* empty tag will have line break styling*/}</div>
    </div>
  );
}