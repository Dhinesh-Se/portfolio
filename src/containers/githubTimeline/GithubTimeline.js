import React, {useState, useEffect, useContext} from "react";
import "./GithubTimeline.scss";
import {socialMediaLinks} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";
import {Fade} from "react-reveal";
import Loading from "../loading/Loading";

export default function GithubTimeline() {
  const {isDark} = useContext(StyleContext);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (socialMediaLinks.github) {
      // Extract username from GitHub URL
      const username = socialMediaLinks.github.split('/').pop();
      
      // Fetch GitHub activity using GitHub API
      fetch(`https://api.github.com/users/${username}/events/public?per_page=10`)
        .then(response => {
          if (!response.ok) throw new Error('Failed to fetch GitHub activity');
          return response.json();
        })
        .then(data => {
          const formattedActivities = data.slice(0, 8).map(event => {
            const date = new Date(event.created_at);
            return {
              id: event.id,
              type: event.type,
              repo: event.repo.name,
              message: getEventMessage(event),
              date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
              time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
              url: `https://github.com/${event.repo.name}`
            };
          });
          setActivities(formattedActivities);
          setLoading(false);
        })
        .catch(err => {
          console.error('GitHub timeline error:', err);
          setError(err.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  function getEventMessage(event) {
    switch(event.type) {
      case 'PushEvent':
        return `Pushed ${event.payload.commits?.length || 1} commit(s) to ${event.repo.name.split('/')[1]}`;
      case 'CreateEvent':
        return `Created ${event.payload.ref_type} in ${event.repo.name.split('/')[1]}`;
      case 'WatchEvent':
        return `Starred ${event.repo.name.split('/')[1]}`;
      case 'ForkEvent':
        return `Forked ${event.repo.name.split('/')[1]}`;
      case 'IssuesEvent':
        return `${event.payload.action} issue in ${event.repo.name.split('/')[1]}`;
      case 'PullRequestEvent':
        return `${event.payload.action} pull request in ${event.repo.name.split('/')[1]}`;
      default:
        return `Activity in ${event.repo.name.split('/')[1]}`;
    }
  }

  function getEventIcon(type) {
    switch(type) {
      case 'PushEvent':
        return 'fa-code-branch';
      case 'CreateEvent':
        return 'fa-plus-circle';
      case 'WatchEvent':
        return 'fa-star';
      case 'ForkEvent':
        return 'fa-code-fork';
      case 'IssuesEvent':
        return 'fa-exclamation-circle';
      case 'PullRequestEvent':
        return 'fa-code-pull-request';
      default:
        return 'fa-circle';
    }
  }

  if (!socialMediaLinks.github) {
    return null;
  }

  if (loading) {
    return (
      <Fade bottom duration={1000} distance="20px">
        <div className="github-timeline-main-div" id="github-timeline">
          <Loading />
        </div>
      </Fade>
    );
  }

  if (error || activities.length === 0) {
    return null;
  }

  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="github-timeline-main-div" id="github-timeline">
        <div className="github-timeline-header">
          <h1 className={isDark ? "dark-mode github-timeline-heading" : "github-timeline-heading"}>
            <i className="fab fa-github"></i>
            GitHub Activity
          </h1>
          <p className={isDark ? "dark-mode github-timeline-subtitle" : "subTitle github-timeline-subtitle"}>
            Recent contributions and activity on GitHub
          </p>
        </div>

        <div className="github-timeline-container">
          <div className="timeline-line"></div>
          {activities.map((activity, index) => (
            <div key={activity.id} className="timeline-item" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="timeline-dot">
                <i className={`fas ${getEventIcon(activity.type)}`}></i>
              </div>
              <div className={isDark ? "dark-mode timeline-content" : "timeline-content"}>
                <div className="timeline-header">
                  <span className="timeline-date">{activity.date}</span>
                  <span className="timeline-time">{activity.time}</span>
                </div>
                <p className="timeline-message">{activity.message}</p>
                <a
                  href={activity.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="timeline-link"
                >
                  View on GitHub <i className="fas fa-external-link-alt"></i>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="github-timeline-footer">
          <a
            href={socialMediaLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className={isDark ? "dark-mode github-timeline-button" : "github-timeline-button"}
          >
            View Full Profile <i className="fab fa-github"></i>
          </a>
        </div>
      </div>
    </Fade>
  );
}

