import React from "react";
import LineBreakContainer from "./LineBreak.jsx";
import "../styles/home_page.scss";
import { IDS, CLASSES } from "../variables/identifiers.jsx";
import LOGO_SRC from "../assets/msc-logo-large.png";
import HorizontalSplitDivContainer from "./HorizontalSplitDiv.jsx";

export default class HomePageContainer extends React.Component {
  render() {
    return <HomePageView/>;
  }
}

function HomePageView() {
  return (
    <div id={IDS.homePage} className={CLASSES.pageWrapper}>
      <h1 className={CLASSES.centerText}>Welcome to MIT Smart Confessions</h1>
      <p className={CLASSES.centerText}>
        We use machine learning to take confessions to the next level.
      </p>
      <br/>
      <br/>
      <LineBreakContainer/>
      <HorizontalSplitDivContainer className={CLASSES.homePageBlockWrapper}>
        <div className={CLASSES.homePageBlock}>
          <h3>Confession Rater</h3>
          Find out how popular your confession will be.
          <br/>
          <br/>
          <a href={"/predict"}>
            Try it
          </a>
        </div>
        <div className={CLASSES.homePageBlock}>
          <h3>Smart Confession Completion</h3>
          Start writing, let our tool complete the confession that maximize popularity
          with the additional number of words you desire.
          <br/>
          <br/>
          <a href={"/generate"}>
            Try it
          </a>
        </div>
        <div className={CLASSES.homePageBlock}>
          <h3>Understanding Confessions</h3>
          Understand what makes some confessions more popular than others.
          <br/>
          <br/>
          <a href={"/understand"}>
            See Explanations
          </a>
        </div>
      </HorizontalSplitDivContainer>
      <LineBreakContainer/>
      <br/>
      <p className={CLASSES.centerText}>
        If interested, you can find out <a href={"/how-it-works"}>how this works</a> behind
        the scenes or check out the Github repository for this{" "}
        <a href={"https://github.com/robertvunabandi/mit-smart-confessions-website"}>website</a>{" "}
        or for <a href={"https://github.com/robertvunabandi/mit-smart-confessions-data"}>our machine
        learning API</a>.
        <br/>
      </p>
      <div id={IDS.homePageLogo}><img src={LOGO_SRC}/></div>
    </div>
  );
}