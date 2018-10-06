import React from "react";
import PropTypes from "prop-types";
import {CLASSES} from "../variables/identifiers.jsx";
import "../styles/notice_box.css";

const NOTICE_TYPES = {
  WARNING: "warning",
  ERROR: "error",
  INFORMATION: "information",
};

const propTypes = {
  // must be one of NOTICE_TYPES
  type:  PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default class NoticeBoxContainer extends React.Component {
  static getNoticeClass(type) {
    switch (NOTICE_TYPES[type.toUpperCase()]) {
      case NOTICE_TYPES.INFORMATION:
        return `${CLASSES.noticeBoxInformation}`;
      case NOTICE_TYPES.WARNING:
        return `${CLASSES.noticeBoxWarning}`;
      case NOTICE_TYPES.ERROR:
        return `${CLASSES.noticeBoxError}`;
      default:
        // will throw if the notice type is null
        throw new Error("Invalid type received");
    }
  }

  render() {
    return (
      <NoticeBoxView
        {...this.props}
        notice_type={NoticeBoxContainer.getNoticeClass(this.props.type)} />
    );
  }
}

NoticeBoxContainer.propTypes = propTypes;
NoticeBoxContainer.NOTICE_TYPES = NOTICE_TYPES;

function NoticeBoxView(props) {
  return <div className={CLASSES.noticeBoxWrapper}>
    <div className={`${CLASSES.noticeBox} ${props.notice_type}`}>{props.message}</div>
  </div>
}