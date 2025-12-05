fs = require("fs");
const https = require("https");
process = require("process");
require("dotenv").config();

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const USE_GITHUB_DATA = process.env.USE_GITHUB_DATA;
const MEDIUM_USERNAME = process.env.MEDIUM_USERNAME;
const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const INSTAGRAM_USER_ID = process.env.INSTAGRAM_USER_ID;
const USE_INSTAGRAM_DATA = process.env.USE_INSTAGRAM_DATA;

const ERR = {
  noUserName:
    "Github Username was found to be undefined. Please set all relevant environment variables.",
  requestFailed:
    "The request to GitHub didn't succeed. Check if GitHub token in your .env file is correct.",
  requestFailedMedium:
    "The request to Medium didn't succeed. Check if Medium username in your .env file is correct.",
  requestFailedInstagram:
    "The request to Instagram didn't succeed. Check if Instagram credentials in your .env file are correct."
};
if (USE_GITHUB_DATA === "true") {
  if (GITHUB_USERNAME === undefined) {
    throw new Error(ERR.noUserName);
  }

  console.log(`Fetching profile data for ${GITHUB_USERNAME}`);
  var data = JSON.stringify({
    query: `
{
  user(login:"${GITHUB_USERNAME}") { 
    name
    bio
    avatarUrl
    location
    pinnedItems(first: 6, types: [REPOSITORY]) {
      totalCount
      edges {
          node {
            ... on Repository {
              name
              description
              forkCount
              stargazers {
                totalCount
              }
              url
              id
              diskUsage
              primaryLanguage {
                name
                color
              }
            }
          }
        }
      }
    }
}
`
  });
  const default_options = {
    hostname: "api.github.com",
    path: "/graphql",
    port: 443,
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "User-Agent": "Node"
    }
  };

  const req = https.request(default_options, res => {
    let data = "";

    console.log(`statusCode: ${res.statusCode}`);
    if (res.statusCode !== 200) {
      throw new Error(ERR.requestFailed);
    }

    res.on("data", d => {
      data += d;
    });
    res.on("end", () => {
      fs.writeFile("./public/profile.json", data, function (err) {
        if (err) return console.log(err);
        console.log("saved file to public/profile.json");
      });
    });
  });

  req.on("error", error => {
    throw error;
  });

  req.write(data);
  req.end();
}

if (MEDIUM_USERNAME !== undefined) {
  console.log("Fetching Medium blogs data");
  const options = {
    hostname: "api.rss2json.com",
    path: `/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`,
    port: 443,
    method: "GET"
  };

  const req = https.request(options, res => {
    let mediumData = "";

    console.log(`statusCode: ${res.statusCode}`);
    if (res.statusCode !== 200) {
      throw new Error(ERR.requestMediumFailed);
    }

    res.on("data", d => {
      mediumData += d;
    });
    res.on("end", () => {
      fs.writeFile("./public/blogs.json", mediumData, function (err) {
        if (err) return console.log(err);
        console.log("saved file to public/blogs.json");
      });
    });
  });

  req.on("error", error => {
    throw error;
  });

  req.end();
}

// Instagram Basic Display API - Fetch recent posts
if (USE_INSTAGRAM_DATA === "true") {
  if (INSTAGRAM_ACCESS_TOKEN === undefined || INSTAGRAM_USER_ID === undefined) {
    console.warn("Instagram credentials not found. Skipping Instagram data fetch.");
    console.warn("To enable Instagram posts, add INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_USER_ID to your .env file");
  } else {
    console.log("Fetching Instagram posts data");
    
    // Fetch user's media (posts)
    const instagramOptions = {
      hostname: "graph.instagram.com",
      path: `/${INSTAGRAM_USER_ID}/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${INSTAGRAM_ACCESS_TOKEN}&limit=12`,
      port: 443,
      method: "GET"
    };

    const instagramReq = https.request(instagramOptions, res => {
      let instagramData = "";

      console.log(`Instagram API statusCode: ${res.statusCode}`);
      
      if (res.statusCode !== 200) {
        console.error(`Instagram API Error: ${res.statusCode}`);
        console.error("Check your INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_USER_ID in .env file");
        return;
      }

      res.on("data", d => {
        instagramData += d;
      });

      res.on("end", () => {
        try {
          const parsedData = JSON.parse(instagramData);
          
          // Transform data to match component expectations
          const transformedData = {
            data: parsedData.data.map(post => ({
              id: post.id,
              caption: post.caption || "",
              media_type: post.media_type,
              media_url: post.media_url,
              permalink: post.permalink,
              thumbnail_url: post.thumbnail_url || post.media_url,
              timestamp: post.timestamp
            })),
            count: parsedData.data ? parsedData.data.length : 0
          };

          fs.writeFile("./public/instagram.json", JSON.stringify(transformedData, null, 2), function (err) {
            if (err) {
              console.error("Error saving instagram.json:", err);
              return;
            }
            console.log("saved file to public/instagram.json");
            console.log(`Fetched ${transformedData.count} Instagram posts`);
          });
        } catch (error) {
          console.error("Error parsing Instagram data:", error);
          console.error("Response:", instagramData);
        }
      });
    });

    instagramReq.on("error", error => {
      console.error("Instagram API request error:", error);
      console.error("This is not critical - portfolio will still work without Instagram posts");
    });

    instagramReq.end();
  }
}
