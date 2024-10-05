/* Change this file to get your personal Portfolio */

// To change portfolio colors globally go to the  _globalColor.scss file

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation"; // Rename to your file name for custom animation

// Splash Screen

const splashScreen = {
  enabled: true, // set false to disable splash screen
  animation: splashAnimation,
  duration: 2000 // Set animation duration as per your animation
};

// Summary And Greeting Section

const illustration = {
  animated: true // Set to false to use static SVG
};

const greeting = {
  username: "Dhinesh",
  title: "Hi all, I'm Dhinesh",
  subTitle: emoji(
    "A passionate Full Stack Software Developer 🚀 with a strong foundation in building dynamic and scalable web applications. I have hands-on experience with JavaScript,Angular,React.js, Node.js, React Native, and other cool libraries and frameworks. I'm also well-versed in Java and Spring Boot for backend development, and proficient with databases like SQL, PL/SQL, and MongoDB"
  ),
  resumeLink:
    "https://drive.google.com/file/d/1ofFdKF_mqscH8WvXkSObnVvC9kK7Ldlu/view?usp=sharing", // Set to empty to hide the button
  displayGreeting: true // Set false to hide this section, defaults to true
};

// Social Media Links

const socialMediaLinks = {
  github: "https://github.com/Dhinesh-Se",
  linkedin: "https://www.linkedin.com/in/dhineshse/",
  gmail: "elavarasivel1976@gmail.com",
  medium: "https://medium.com/@dhinesh-se",
  stackoverflow: "https://stackoverflow.com/users/20884684/dauntless-vd",
  // Instagram, Twitter and Kaggle are also supported in the links!
  // To customize icons and social links, tweak src/components/SocialMedia
  display: true // Set true to display this section, defaults to false
};

// Skills Section

const skillsSection = {
  title: "What I do",
  subTitle: "CRAZY FULL STACK DEVELOPER WHO WANTS TO EXPLORE EVERY TECH STACK",
  skills: [
    emoji(
      "⚡ Develop highly interactive Front end / User Interfaces for web applications, as well as robust back-end services using technologies like Java, Spring Boot, and Node.js, ensuring a complete and seamless user experience"
    )    
  ],

  /* Make Sure to include correct Font Awesome Classname to view your icon
https://fontawesome.com/icons?d=gallery */

  softwareSkills: [
    {
      skillName: "html-5",
      fontAwesomeClassname: "fab fa-html5"
    },
    {
      skillName: "css3",
      fontAwesomeClassname: "fab fa-css3-alt"
    },
    {
      skillName: "sass",
      fontAwesomeClassname: "fab fa-sass"
    },
    {
      skillName: "JavaScript",
      fontAwesomeClassname: "fab fa-js"
    },
    {
      skillName: "Angular",
      fontAwesomeClassname: "fab fa-angular"
    },
    {
      skillName: "reactjs",
      fontAwesomeClassname: "fab fa-react"
    },
    {
      skillName: "nodejs",
      fontAwesomeClassname: "fab fa-node"
    },
    {
      skillName: "java",
      fontAwesomeClassname: "fab fa-java"
    },
    {
      skillName: "npm",
      fontAwesomeClassname: "fab fa-npm"
    },
    {
      skillName: "sql-database",
      fontAwesomeClassname: "fas fa-database"
    },
    {
      skillName: "python",
      fontAwesomeClassname: "fab fa-python"
    },
    {
      skillName: "docker",
      fontAwesomeClassname: "fab fa-docker"
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Education Section

const educationInfo = {
  display: true, // Set false to hide this section, defaults to true
  schools: [
    {
      schoolName: "Coimbatore Institute of Engineering and Technology",
      logo: require("./assets/images/cal-logo.png"),
      subHeader: "Bachelor of Technology in Information Technology",
      duration: "March 2018 - April 2022",
      desc: "Graduated with a grade of 8. Participated in research projects and published 3 papers.",
      descBullets: [
        "Activities and societies: Student, Athlete, and Rotaract Club member"
      ]
    }
  ]
};


// Your top 3 proficient stacks/tech experience

const techStack = {
  viewSkillBars: true, //Set it to true to show Proficiency Section
  experience: [
    {
      Stack: "Frontend/Design", //Insert stack or technology you have experience in
      progressPercentage: "80%" //Insert relative proficiency in percentage
    },
    {
      Stack: "Backend",
      progressPercentage: "90%"
    },
    {
      Stack: "Programming",
      progressPercentage: "70%"
    }
  ],
  displayCodersrank: true // Set true to display codersrank badges section need to changes your username in src/containers/skillProgress/skillProgress.js:17:62, defaults to false
};

// Work experience section

const workExperiences = {
  display: true, // Set it to true to show workExperiences Section
  experience: [
    {
      role: "Junior Associate",
      company: "KGiSL",
      companylogo: require("./assets/images/kgisl_logo.png"),
      date: "June 2018 – Present",
      desc: "I started my career as a Full Stack Developer at KGiSL, working in the insurance domain for Dubai Insurance (WPP). I have been involved in several projects using Angular, Java, and Spring Boot. Currently, I am working on the payment side of the application, integrating payment services with external gateways.",
      descBullets: [
        "Worked on the insurance domain for Dubai Insurance (WPP)",
        "Developed applications using Angular, Java, and Spring Boot",
        "Integrated payment services with external gateways using CyberSource and N-Genius",
        "Collaborated on multiple projects related to payment processing and insurance claims"
      ]
    }
  ]
};



/* Your Open Source Section to View Your Github Pinned Projects
To know how to get github key look at readme.md */

const openSource = {
  showGithubProfile: "true", // Set true or false to show Contact profile using Github, defaults to true
  display: true // Set false to hide this section, defaults to true
};

// Some big projects you have worked on

const bigProjects = {
  title: "Big Projects",
  subtitle: "COMPANIES THAT I HELPED TO CREATE THEIR TECH",
  projects: [
    {
      image: require("./assets/images/dubai_insurance_co_logo.png"),
      projectName: "Dubai Insurance (WPP)",
      projectDesc: "Worked on developing and integrating features for the insurance domain, including payment gateway integration using CyberSource and N-Genius, leveraging Angular, Java, and Spring Boot.",
      footerLink: [
        {
          name: "Visit Company Website",
          url: "https://dubins-wpp.ae/en/wpp"
        }
        // you can add extra buttons here.
      ]
    }
  ],
  display: true // Set false to hide this section, defaults to true
};


// Achievement Section
// Include certificates, talks etc

const achievementSection = {
  title: emoji("Achievements And Certifications 🏆 "),
  subtitle: "Achievements, Certifications, Award Letters, and Some Cool Stuff that I have done!",

  achievementsCards: [
    {
      title: "Oracle Cloud Infrastructure 2023 Certified Foundations Associate",
      subtitle: "Oracle Cloud Infrastructure 2023 Certified Foundations Associate",
      image: require("./assets/images/oracle_logo.png"), // Replace with the correct Oracle logo image path
      imageAlt: "Oracle Logo",
      footerLink: [
        {
          name: "Show Credential",
          url: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=B19C1E0AA3400A84FA4FF2B6B206E7849B86F3C36F085A1136C9645AFA564318" // Replace with the actual credential link if available
        }
      ],
      issuedDate: "Issued Jun 2024 · Expires Jun 2026",
      credentialID: "Credential ID 312089384OCIF2023CA"
    },
    {
      title: "Learn Java Programming - Beginner to Master",
      subtitle: "Udemy",
      image: require("./assets/images/udemy_logo.png"), // Replace with the correct Udemy logo image path
      imageAlt: "Udemy Logo",
      footerLink: [
        {
          name: "Show Credential",
          url: "https://www.udemy.com/certificate/UC-61169895-1df1-4eec-afa5-e4e8fc42b270/" // Replace with the actual credential link if available
        }
      ],
      issuedDate: "Issued Feb 2023",
      credentialID: "Credential ID UC-61169895-1df1-4eec-afa5-e4e8fc42b270"
    },
    {
      title: "Artificial Intelligence in Robotics - A Road Map",
      subtitle: "Coimbatore Institute of Engineering and Technology (Official Page)",
      image: require("./assets/images/cal-logo.png"), // Replace with the correct logo image path
      imageAlt: "CIET Logo",
      footerLink: [
        {
          name: "Show Credential",
          url: "https://www.ciet.edu" // Replace with the actual credential link if available
        }
      ],
      issuedDate: "Issued Aug 2021",
      credentialID: "Credential ID 6GLOBM-CE000152"
    },
    {
      title: "Build a Face Recognition Application using Python",
      subtitle: "GUVI Geek Networks, IITM Research Park",
      image: require("./assets/images/guviofficial_logo.png"), // Replace with the correct GUVI logo image path
      imageAlt: "GUVI Logo",
      footerLink: [
        {
          name: "Show Credential",
          url: "https://www.guvi.in/verify-certificate?id=p1u6333k1311Xw95xM" // Replace with the actual credential link if available
        }
      ],
      issuedDate: "Issued Apr 2021",
      credentialID: "Credential ID p1u6333k1311Xw95xM"
    }
  ],
  display: true // Set false to hide this section, defaults to true
};


// Blogs Section

const blogSection = {
  title: "Blogs",
  subtitle:
    "With Love for Developing cool stuff, I love to write and teach others what I have learnt.",
  displayMediumBlogs: "true", // Set true to display fetched medium blogs instead of hardcoded ones
  blogs: [
    {
      url: "https://blog.usejournal.com/create-a-google-assistant-action-and-win-a-google-t-shirt-and-cloud-credits-4a8d86d76eae",
      title: "Win a Google Assistant Tshirt and $200 in Google Cloud Credits",
      description:
        "Do you want to win $200 and Google Assistant Tshirt by creating a Google Assistant Action in less then 30 min?"
    },
    {
      url: "https://medium.com/@saadpasta/why-react-is-the-best-5a97563f423e",
      title: "Why REACT is The Best?",
      description:
        "React is a JavaScript library for building User Interface. It is maintained by Facebook and a community of individual developers and companies."
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Talks Sections

const talkSection = {
  title: "TALKS",
  subtitle: emoji(
    "I LOVE TO SHARE MY LIMITED KNOWLEDGE AND GET A SPEAKER BADGE 😅"
  ),

  talks: [
    {
      title: "Build Actions For Google Assistant",
      subtitle: "Codelab at GDG DevFest Karachi 2019",
      slides_url: "https://bit.ly/saadpasta-slides",
      event_url: "https://www.facebook.com/events/2339906106275053/"
    }
  ],
  display: false // Set false to hide this section, defaults to true
};

// Podcast Section

const podcastSection = {
  title: emoji("Podcast 🎙️"),
  subtitle: "I LOVE TO TALK ABOUT MYSELF AND TECHNOLOGY",

  // Please Provide with Your Podcast embeded Link
  podcast: [
    "https://anchor.fm/codevcast/embed/episodes/DevStory---Saad-Pasta-from-Karachi--Pakistan-e9givv/a-a15itvo"
  ],
  display: false // Set false to hide this section, defaults to true
};

// Resume Section
const resumeSection = {
  title: "Resume",
  subtitle: "Feel free to download my resume",

  // Please Provide with Your Podcast embeded Link
  display: false // Set false to hide this section, defaults to true
};

const contactInfo = {
  title: emoji("Contact Me ☎️"),
  subtitle:
    "Discuss a project or just want to say hi? My Inbox is open for all.",
  number: "+91 8754447528",
  email_address: "elavarasivel1976@gmail.com",
};

// Twitter Section

const twitterDetails = {
  userName: "twitter", //Replace "twitter" with your twitter username without @
  display: false // Set true to display this section, defaults to false
};

const isHireable = false; // Set false if you are not looking for a job. Also isHireable will be display as Open for opportunities: Yes/No in the GitHub footer

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  openSource,
  bigProjects,
  achievementSection,
  blogSection,
  talkSection,
  podcastSection,
  contactInfo,
  twitterDetails,
  isHireable,
  resumeSection
};
