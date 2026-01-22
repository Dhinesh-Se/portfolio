import React, {useState, useEffect, useContext, useMemo, Suspense, lazy} from "react";
import "./Blog.scss";
import {blogSection, socialMediaLinks} from "../../portfolio";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";
import Loading from "../loading/Loading";

const GithubRepoCard = lazy(() =>
  import("../../components/githubRepoCard/GithubRepoCard")
);

export default function Blogs() {
  const {isDark} = useContext(StyleContext);
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("stars"); // stars, name, forks, recent

  // Fetch GitHub repositories
  useEffect(() => {
    const getRepositories = () => {
      // First try to get from profile.json (pinned repos)
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
            setRepositories(response.data.user.pinnedItems.edges);
            setLoading(false);
          } else {
            // Fallback: Fetch all public repositories
            fetchAllRepositories();
          }
        })
        .catch(() => {
          // Fallback: Fetch all public repositories if profile.json fails
          fetchAllRepositories();
        });
    };

    const fetchAllRepositories = () => {
      if (socialMediaLinks.github) {
        const username = socialMediaLinks.github.split('/').pop();
        fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12`)
          .then(response => {
            if (!response.ok) throw new Error('Failed to fetch repositories');
            return response.json();
          })
          .then(data => {
            // Transform GitHub API response to match the structure
            const transformedRepos = data.map(repo => ({
              node: {
                id: repo.id.toString(),
                name: repo.name,
                description: repo.description || "No description available",
                url: repo.html_url,
                forkCount: repo.forks_count,
                stargazers: {
                  totalCount: repo.stargazers_count
                },
                diskUsage: repo.size * 1024, // Convert KB to bytes
                primaryLanguage: repo.language ? {
                  name: repo.language,
                  color: getLanguageColor(repo.language)
                } : null,
                updatedAt: repo.updated_at
              }
            }));
            setRepositories(transformedRepos);
            setLoading(false);
          })
          .catch(error => {
            console.error("Error fetching GitHub repositories:", error);
            setRepositories([]);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    };

    getRepositories();
  }, []);

  // Get language color (basic mapping)
  function getLanguageColor(language) {
    const colors = {
      'JavaScript': '#f1e05a',
      'TypeScript': '#2b7489',
      'Python': '#3572A5',
      'Java': '#b07219',
      'HTML': '#e34c26',
      'CSS': '#563d7c',
      'SCSS': '#c6538c',
      'React': '#61dafb',
      'Vue': '#4fc08d',
      'Angular': '#dd0031',
      'Node.js': '#339933',
      'C++': '#f34b7d',
      'C': '#555555',
      'Go': '#00ADD8',
      'Rust': '#dea584',
      'PHP': '#4F5D95',
      'Ruby': '#701516',
      'Swift': '#fa7343',
      'Kotlin': '#F18E33',
      'Dart': '#00B4AB',
      'Shell': '#89e051',
      'Dockerfile': '#384d54',
      'Makefile': '#427819',
      'Other': '#586069'
    };
    return colors[language] || colors['Other'];
  }
  // Process and filter repositories
  const processedRepos = useMemo(() => {
    let repos = [...repositories];

    // Filter by search query
    if (searchQuery) {
      repos = repos.filter(repo =>
        repo.node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (repo.node.description && repo.node.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (repo.node.primaryLanguage && repo.node.primaryLanguage.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Sort repositories
    if (sortBy === "name") {
      repos.sort((a, b) => a.node.name.localeCompare(b.node.name));
    } else if (sortBy === "stars") {
      repos.sort((a, b) => b.node.stargazers.totalCount - a.node.stargazers.totalCount);
    } else if (sortBy === "forks") {
      repos.sort((a, b) => b.node.forkCount - a.node.forkCount);
    } else if (sortBy === "recent") {
      repos.sort((a, b) => {
        const dateA = a.node.updatedAt ? new Date(a.node.updatedAt) : new Date(0);
        const dateB = b.node.updatedAt ? new Date(b.node.updatedAt) : new Date(0);
        return dateB - dateA;
      });
    }

    return repos;
  }, [repositories, searchQuery, sortBy]);

  if (!blogSection.display) {
    return null;
  }

  if (loading) {
    return (
      <Fade bottom duration={1000} distance="20px">
        <div className="main" id="projects">
          <div className="blog-header">
            <h1 className="blog-header-text">GitHub Projects</h1>
            <p className={isDark ? "dark-mode blog-subtitle" : "subTitle blog-subtitle"}>
              Exploring my repositories and contributions
            </p>
          </div>
          <Loading />
        </div>
      </Fade>
    );
  }

  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main" id="blogs">
        <div className="blog-header">
          <h1 className="blog-header-text">
            <i className="fab fa-github"></i> GitHub Projects
          </h1>
          <p
            className={
              isDark ? "dark-mode blog-subtitle" : "subTitle blog-subtitle"
            }
          >
            Explore my repositories, contributions, and open source projects
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="blog-controls">
          <div className="blog-search-container">
            <i className="fas fa-search blog-search-icon"></i>
            <input
              type="text"
              placeholder="Search projects by name, description, or language..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={isDark ? "dark-mode blog-search-input" : "blog-search-input"}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="blog-search-clear"
                aria-label="Clear search"
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
          <div className="blog-sort-container">
            <label className={isDark ? "dark-mode blog-sort-label" : "blog-sort-label"}>
              Sort by:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={isDark ? "dark-mode blog-sort-select" : "blog-sort-select"}
            >
              <option value="stars">Most Stars ⭐</option>
              <option value="recent">Most Recent</option>
              <option value="name">Name (A-Z)</option>
              <option value="forks">Most Forks</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        {searchQuery && (
          <div className="blog-results-count">
            <p className={isDark ? "dark-mode" : ""}>
              Found {processedRepos.length} project{processedRepos.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}

        <div className="blog-main-div">
          <div className="repo-cards-div-main">
            {processedRepos.length > 0 ? (
              <Suspense fallback={<Loading />}>
                {processedRepos.map((repo) => {
                  if (!repo || !repo.node) {
                    return null;
                  }
                  return (
                    <GithubRepoCard
                      repo={repo}
                      key={repo.node.id}
                      isDark={isDark}
                    />
                  );
                })}
              </Suspense>
            ) : (
              <div className="blog-no-results">
                <i className="fab fa-github"></i>
                <p className={isDark ? "dark-mode" : ""}>
                  {searchQuery 
                    ? "No projects found matching your search." 
                    : "No repositories available. Make sure your GitHub username is configured."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fade>
  );
}
