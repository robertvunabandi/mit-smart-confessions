// HTML ids
const IDS = {
  root: "root",
  rootInit: "root-init",
  navBar: "nav-bar",
  navBarLogo: "nav-bar-logo",
  footer: "footer",
  // specific pages
  homePage: "home-page",
  homePageLogo: "home-page-logo",
  predictPage: "predict-page",
  generatePage: "generate-page",
  understandPage: "understand-page",
  aboutPage: "about-page",
  privacyPage: "privacy-page",
  howItWorksPage: "how-it-works-page",
  // notice section on all pages
  noticeSection: "notice-section",
  noticeSectionClose: "notice-section-close",
};

// HTML classes
const CLASSES = {
  lineBreak: "line-break",
  pageWrapper: "page-wrapper",
  // home page
  homePageBlock: "home-page-block",
  homePageBlockWrapper: "home-page-block-wrapper",
  // navbar
  navbarOption: "navbar-option",
  navbarOptionSeparator: "navbar-option-separator",
  navbarOptionActiveTab: "navbar-option-active-tab",
  // h-split
  horizontalSplitDivParent: "horizontal-split-div-parent",
  horizontalSplitDiv: "horizontal-split-div",
  // starting notice section
  noticeSectionRevealed: "notice-section-revealed",
  noticeSectionHidden: "notice-section-hidden",
  noticeSectionText: "notice-section-text",
  noticeBoxWrapper: "notice-box-wrapper",
  noticeBox: "notice-box",
  noticeBoxClose: "notice-box-close",
  noticeBoxInformation: "notice-box-information",
  noticeBoxWarning: "notice-box-warning",
  noticeBoxError: "notice-box-error",
  // predict
  predictIntroTextWrapper: "predict-intro-text-wrapper",
  predictTextWrapper: "predict-text-wrapper",
  textAreaPredictWrapper: "text-area-predict-wrapper",
  buttonPredictWrapper: "button-predict-wrapper",
  reactionsWrapper: "reactions-wrapper",
  reactionIcon: "reaction-icon",
  reactionIconSpan: "reaction-icon-span",
  reactionIconImage: "reaction-icon-image",
  reactionResultSpan: "reaction-result-span",
  reactionResultPrediction: "reaction-result-prediction",
  // generator
  generatorPrediction: "generator-prediction",
  generatorLength: "generator-length",
  generatorLengthLabel: "generator-length-label",
  generatorLengthInput: "generator-length-input",
  // random modifiers
  centerText: "m-center-text",
};

// events from event listeners
const EVENTS = {
  notice: "ev-notice",
  prediction: "ev-prediction",
};

// the application name, which may or may not change
const APP_NAME = "MIT Smart Confession";

// export everything
export {
  IDS,
  CLASSES,
  APP_NAME,
  EVENTS,
};