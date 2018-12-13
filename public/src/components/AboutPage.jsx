import React from "react";
import { IDS, CLASSES } from "../variables/identifiers.jsx";
import "../styles/about_page.scss";
import HorizontalSplitDivContainer from "./HorizontalSplitDiv";
import JCitoSrc from "../assets/jcito.jpg";
import RobertVSrc from "../assets/robertv.jpg";

export default class AboutPageContainer extends React.Component {
  render() {
    return <AboutPageView/>;
  }
}

function AboutPageView() {
  return (
    <div id={IDS.aboutPage} className={CLASSES.pageWrapper}>
      <h1>About MIT Smart Confessions</h1>
      <p>
        A good percentage of MIT students (both enrolled and alumni) visit
        <a href={"https://facebook.com/beaverconfessions"}>MIT Confessions</a> daily during the
        semester. Noticing that, I was curious to know whether one can predict the number of
        reactions a confession would get. At the same time, I started taking Deep Learning Practicum
        during Fall 2018, and this class is a project-based class in which the prompt for the
        project one works on is "build something machine learning related". Given that, I thought
        this was the perfect opportunity to work on something both fun and something I was truly
        interested in, and that is how MIT Smart Confessions started.
      </p>
      <p>
        This was definitely a lot of fun, and I want to thank Jürgen Cito for joining me on this
        project and making it possible. I wrote a <a href={"/how-it-works"}>blog post</a> about
        this, so if you're interested, you can read it at that url.
      </p>
      <p>
        — Robert M. Vunabandi ('20)
      </p>
      <h2>
        Project Members
      </h2>
      <HorizontalSplitDivContainer className={CLASSES.aboutPageMembersWrapper}>
        <div>
          <img
            src={RobertVSrc}
            alt={"Robert Vunabandi's Picture"}
            className={CLASSES.aboutPagePhoto}/>
          <p className={CLASSES.centerText}>
            <a href={"https://robertvunabandi.com/"} target={"blank"}>
              Robert M. Vunabandi ('20), Course 6-3
            </a>
          </p>
        </div>
        <div>
          <img
            src={JCitoSrc}
            alt={"Jürgen Cito's Picture"}
            className={CLASSES.aboutPagePhoto}/>
          <p className={CLASSES.centerText}>
            <a href={"http://people.csail.mit.edu/jcito/"} target={"blank"}>
              Jürgen Cito, Postdoctoral Researcher at CSAIL
            </a>
          </p>
        </div>
      </HorizontalSplitDivContainer>

    </div>
  );
}