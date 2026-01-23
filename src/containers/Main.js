import React, {useEffect, useState, Suspense, lazy} from "react";
import Header from "../components/header/Header";
import Greeting from "./greeting/Greeting";
import Skills from "./skills/Skills";
import StackProgress from "./skillProgress/skillProgress";
import WorkExperience from "./workExperience/WorkExperience";
import SplashScreen from "./splashScreen/SplashScreen";
import ScrollProgress from "../components/scrollProgress/ScrollProgress";
import ParticleBackground from "../components/particleBackground/ParticleBackground";
import Chatbot from "../components/chatbot/Chatbot";
import Statistics from "./statistics/Statistics";
import VisitorCounter from "../components/visitorCounter/VisitorCounter";
import Footer from "../components/footer/Footer";
import ScrollToTopButton from "./topbutton/Top";
import {splashScreen} from "../portfolio";
import {StyleProvider} from "../contexts/StyleContext";
import {useLocalStorage} from "../hooks/useLocalStorage";
import "./Main.scss";

// Lazy load components that are below the fold or less critical
const Projects = lazy(() => import("./projects/Projects"));
const StartupProject = lazy(() => import("./StartupProjects/StartupProject"));
const Achievement = lazy(() => import("./achievement/Achievement"));
const Blogs = lazy(() => import("./blogs/Blogs"));
const Talks = lazy(() => import("./talks/Talks"));
const Podcast = lazy(() => import("./podcast/Podcast"));
const Education = lazy(() => import("./education/Education"));
const Twitter = lazy(() => import("./twitter-embed/twitter"));
const Instagram = lazy(() => import("./instagram/Instagram"));
const GithubTimeline = lazy(() => import("./githubTimeline/GithubTimeline"));
const Profile = lazy(() => import("./profile/Profile"));
const Testimonials = lazy(() => import("../components/testimonials/Testimonials"));

const Main = () => {
  const darkPref = window.matchMedia("(prefers-color-scheme: dark)");
  const [isDark, setIsDark] = useLocalStorage("isDark", darkPref.matches);
  const [isShowingSplashAnimation, setIsShowingSplashAnimation] =
    useState(true);

  useEffect(() => {
    if (splashScreen.enabled) {
      const splashTimer = setTimeout(
        () => setIsShowingSplashAnimation(false),
        splashScreen.duration
      );
      return () => {
        clearTimeout(splashTimer);
      };
    }
  }, []);

  const changeTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={isDark ? "dark-mode" : null}>
      <StyleProvider value={{isDark: isDark, changeTheme: changeTheme}}>
        {isShowingSplashAnimation && splashScreen.enabled ? (
          <SplashScreen />
        ) : (
          <>
            <ParticleBackground />
            <ScrollProgress />
            <Header />
            <Greeting />
            <Skills />
            <StackProgress />
            <Suspense fallback={<div />}>
              <Education />
            </Suspense>
            <WorkExperience />
            <Statistics />
            <Suspense fallback={<div />}>
              <Projects />
            </Suspense>
            <Suspense fallback={<div />}>
              <StartupProject />
            </Suspense>
            <Suspense fallback={<div />}>
              <Achievement />
            </Suspense>
            <Suspense fallback={<div />}>
              <Testimonials />
            </Suspense>
            <Suspense fallback={<div />}>
              <Blogs />
            </Suspense>
            <Suspense fallback={<div />}>
              <Talks />
            </Suspense>
            <Suspense fallback={<div />}>
              <Twitter />
            </Suspense>
            <Suspense fallback={<div />}>
              <Instagram />
            </Suspense>
            <Suspense fallback={<div />}>
              <GithubTimeline />
            </Suspense>
            <Suspense fallback={<div />}>
              <Podcast />
            </Suspense>
            <Suspense fallback={<div />}>
              <Profile />
            </Suspense>
            <Footer />
            <ScrollToTopButton />
            <Chatbot />
            <VisitorCounter />
          </>
        )}
      </StyleProvider>
    </div>
  );
};

export default Main;
