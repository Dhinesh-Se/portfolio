import React, {useState, useEffect, useContext, Suspense, lazy} from "react";
import "./Project.scss";
import Button from "../../components/button/Button";
import {openSource, socialMediaLinks} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";
import Loading from "../../containers/loading/Loading";
export default function Projects() {
  const GithubRepoCard = lazy(() =>
    import("../../components/githubRepoCard/GithubRepoCard")
  );
  //const FailedLoading = () => null;
  const renderLoader = () => <Loading />;
  const [repo, setrepo] = useState([]);
  // todo: remove useContex because is not supported
  const {isDark} = useContext(StyleContext);

  useEffect(() => {
    const getRepoData = () => {
      fetch("/profile.json")
        .then(result => {
          if (!result.ok) {
            throw new Error(`HTTP error! status: ${result.status}`);
          }
          const contentType = result.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Response is not JSON");
          }
          return result.json();
        })
        .then(response => {
          if (response && response.data && response.data.user && response.data.user.pinnedItems) {
            setrepoFunction(response.data.user.pinnedItems.edges);
          } else {
            throw new Error("Invalid response structure");
          }
        })
        .catch(function (error) {
          console.error(
            `${error} (because of this error, nothing is shown in place of Projects section. Also check if Projects section has been configured)`
          );
          setrepoFunction("Error");
        });
    };
    getRepoData();
  }, []);

  function setrepoFunction(array) {
    setrepo(array);
  }
  if (!openSource.display) {
    return null;
  }

  // Always render the section so anchor links work, even if no repos
  if (typeof repo === "string" || repo instanceof String || repo.length === 0) {
    return (
      <div className="main" id="opensource">
        <h1 className="project-title">Open Source Projects</h1>
        <p className={isDark ? "dark-mode" : ""} style={{ textAlign: "center", padding: "2rem" }}>
          {repo === "Error" 
            ? "Unable to load repositories. Please check your GitHub configuration."
            : "Loading repositories..."}
        </p>
        {socialMediaLinks.github && (
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <Button
              text={"View on GitHub"}
              className="project-button"
              href={socialMediaLinks.github}
              newTab={true}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <Suspense fallback={renderLoader()}>
      <div className="main" id="opensource">
        <h1 className="project-title">Open Source Projects</h1>
        <div className="repo-cards-div-main">
          {repo.map((v, i) => {
            if (!v) {
              console.error(
                `Github Object for repository number : ${i} is undefined`
              );
              return null;
            }
            return (
              <GithubRepoCard repo={v} key={v.node.id} isDark={isDark} />
            );
          })}
        </div>
        <Button
          text={"More Projects"}
          className="project-button"
          href={socialMediaLinks.github}
          newTab={true}
        />
      </div>
    </Suspense>
  );
}
