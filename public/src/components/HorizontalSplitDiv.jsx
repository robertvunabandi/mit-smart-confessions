import React from "react";
import PropTypes from "prop-types";
import {CLASSES} from "../variables/identifiers.jsx";
import "../styles/horizontal_split_div.scss";

export default class HorizontalSplitDivContainer extends React.Component {
  render() {
    const split_class = `${CLASSES.horizontalSplitDiv}-${this.props.children.length}`;
    return (
      <HorizontalSplitDivView
        split_class={CLASSES.horizontalSplitDiv + " " + split_class}
        children={this.props.children} />
    );
  }
}

function HorizontalSplitDivView(props) {
  return (
    <div className={CLASSES.horizontalSplitDivParent}>
      {props.children.map((child, index) => {
        return (
          <div
            className={props.split_class}
            key={`${CLASSES.horizontalSplitDiv}-${index}`}>
            {child}
          </div>
        );
      })}
    </div>
  );
}

HorizontalSplitDivView.propTypes = {
  split_class: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};