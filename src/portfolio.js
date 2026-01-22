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
  title: "Hi all, I'm Dhinesh", // Static title - used when typingStrings is not provided
  // Typing Animation Configuration (optional):
  // If typingStrings is provided, the title will use typing animation instead of static text
  // titlePrefix: "Hi all, I'm", // Optional prefix before typing animation (default: "Hi all, I'm")
  typingStrings: [
    "Dhinesh",
    "Full Stack Developer",
    "Software Engineer", 
    "Problem Solver"
  ], // Array of strings to cycle through with typing animation
  // typingSpeed: 100, // Optional: typing speed in ms (default: 100)
  // typingBackSpeed: 50, // Optional: backspace speed in ms (default: 50)
  // typingLoop: true, // Optional: whether to loop through strings (default: true)
  subTitle: emoji(
    "Full Stack Software Engineer with 3 years of experience delivering scalable, high-performance applications in the insurance and financial domains 🚀. Skilled in Java (Spring Boot), Angular, REST APIs, and SQL. Proven expertise in optimizing workflows, integrating secure payment gateways, and ensuring compliance with regulatory authorities."
  ),
  // Resume Link Options:
  // Option 1: Empty string "" - Uses local file from src/containers/greeting/dhinesh_se_resume.pdf
  // Option 2: GitHub Raw URL - "https://raw.githubusercontent.com/Dhinesh-Se/portfolio/main/src/containers/greeting/dhinesh_se_resume.pdf"
  // Option 3: Google Drive Direct Link - Get shareable link and replace /view?usp=sharing with /uc?export=download
  // Option 4: Dropbox Direct Link - Get shareable link and change ?dl=0 to ?dl=1
  // Option 5: Any direct download URL (AWS S3, Firebase, CDN, etc.)
  resumeLink: "", // Leave empty for local file, or add any direct download URL
  displayGreeting: true // Set false to hide this section, defaults to true
};

// Social Media Links

const socialMediaLinks = {
  github: "https://github.com/Dhinesh-Se",
  linkedin: "https://www.linkedin.com/in/dhineshse/",
  gmail: "elavarasivel1976@gmail.com",
  medium: "https://medium.com/@dhinesh-se",
  stackoverflow: "https://stackoverflow.com/users/20884684/dauntless-vd",
  instagram: "https://www.instagram.com/echoesof.vd/",
  // Instagram, Twitter and Kaggle are also supported in the links!
  // To customize icons and social links, tweak src/components/SocialMedia
  display: true // Set true to display this section, defaults to false
};

// Skills Section

const skillsSection = {
  title: "What I do",
  subTitle: "FULL STACK ENGINEER SPECIALIZING IN INSURANCE & FINANCIAL DOMAINS",
  skills: [
    emoji(
      "⚡ Develop and maintain scalable web applications using Angular, Java, and Spring Boot to support insurance operations"
    ),
    emoji(
      "⚡ Integrate secure payment gateways (CyberSource, N-Genius) and ensure compliance with regulatory authorities like MOHRE and Central Bank"
    ),
    emoji(
      "⚡ Optimize system performance, reducing processing time by ~30% and improving scalability across premium collection, policy administration, and claims processing"
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
      skillName: "TypeScript",
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
      skillName: "Spring Boot",
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
      skillName: "docker",
      fontAwesomeClassname: "fab fa-docker"
    },
    {
      skillName: "kubernetes",
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
      subHeader: "B.Tech (Information Technology)",
      duration: "Aug 2018 - Jul 2022",
      desc: "Bachelor of Technology in Information Technology. Graduated with strong foundation in software engineering, web development, and database management.",
      descBullets: [
        "Specialized in Full Stack Development, Database Systems, and Software Engineering",
        "Participated in research projects and published papers",
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
      Stack: "Frontend Development", //Insert stack or technology you have experience in
      progressPercentage: "85%" //Insert relative proficiency in percentage
    },
    {
      Stack: "Backend Development",
      progressPercentage: "90%"
    },
    {
      Stack: "Database & ORM",
      progressPercentage: "85%"
    },
    {
      Stack: "DevOps & Cloud",
      progressPercentage: "75%"
    }
  ],
  displayCodersrank: true // Set true to display codersrank badges section need to changes your username in src/containers/skillProgress/skillProgress.js:17:62, defaults to false
};

// Work experience section

const workExperiences = {
  display: true, // Set it to true to show workExperiences Section
  experience: [
    {
      role: "Junior Associate - Full Stack Developer",
      company: "KGiSL",
      companylogo: require("./assets/images/kgisl_logo.png"),
      date: "Dec 2022 – Present",
      desc: "Full Stack Software Engineer with 3 years of experience delivering scalable, high-performance applications in the insurance and financial domains. Working on multiple projects for Dubai Insurance including Worker Protection Program (WPP), Workers Health Insurance (WHI), and Free Zone platforms.",
      descBullets: [
        "Developed and maintained web applications using Angular, Java, and Spring Boot to support insurance operations",
        "Designed and developed core modules: claims management, policy issuance, sponsor & worker management, and employer compliance tracking",
        "Integrated secure payment gateways (CyberSource, N-Genius) and real-time data synchronization with MOHRE and Central Bank APIs",
        "Optimized system performance, reducing processing time by ~30% and improving scalability",
        "Delivered Workers Health Insurance (WHI) platform in just 30 days, meeting strict government deadlines",
        "Implemented Group Claims Processing & Approval workflow, reducing claim settlement time by 30%",
        "Built dashboard-driven admin panels with finance, audit, and reporting capabilities"
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
  title: "Major Projects",
  subtitle: "ENTERPRISE SOLUTIONS DELIVERED FOR INSURANCE DOMAIN",
  projects: [
    {
      image: require("./assets/images/dubai_insurance_co_logo.png"),
      projectName: "Worker Protection Program (WPP)",
      projectDesc: "Full Stack Developer for Dubai Insurance. Designed and developed core modules including claims management, policy issuance, sponsor & worker management, and employer compliance tracking. Integrated payment gateways (CyberSource, N-Genius) and MOHRE APIs for real-time regulatory compliance.",
      footerLink: [
        {
          name: "Visit Company Website",
          url: "https://dubins-wpp.ae/en/wpp"
        }
      ]
    },
    {
      image: require("./assets/images/dubai_insurance_co_logo.png"),
      projectName: "Workers Health Insurance (WHI)",
      projectDesc: "Delivered the entire WHI platform within 30 days, collaborating closely with cross-functional teams to meet strict regulatory deadlines. Developed policy issuance, renewals, compliance modules, and integrated MOHRE APIs for validation and real-time synchronization.",
      footerLink: [
        {
          name: "Visit Company Website",
          url: "https://dubins-wpp.ae/en/wpp"
        }
      ]
    },
    {
      image: require("./assets/images/dubai_insurance_co_logo.png"),
      projectName: "Free Zone Platform",
      projectDesc: "Delivered the Freezone platform under tight deadlines. Developed policy issuance and claims modules compliant with Freezone regulations. Integrated with Central Bank's APIs for secure, real-time registration and validation. Implemented tax-invoice generation and publication.",
      footerLink: [
        {
          name: "Visit Company Website",
          url: "https://dubins-wpp.ae/en/wpp"
        }
      ]
    }
  ],
  display: true // Set false to hide this section, defaults to true
};


// Achievement Section
// Include certificates, talks etc

const achievementSection = {
  title: emoji("Achievements And Certifications 🏆 "),
  subtitle: "Professional Achievements, Certifications, and Key Accomplishments!",

  achievementsCards: [
    {
      title: "Delivered WHI Platform in 30 Days",
      subtitle: "Successfully delivered the entire Workers Health Insurance platform within 30 days, meeting strict government deadlines and ensuring regulatory go-live success.",
      image: require("./assets/images/dubai_insurance_co_logo.png"),
      imageAlt: "KGiSL Achievement",
      footerLink: [],
      issuedDate: "Dec 2022 - Present",
      credentialID: "Key Achievement"
    },
    {
      title: "30% Reduction in Claim Settlement Time",
      subtitle: "Designed and implemented Group Claims Processing & Approval workflow, reducing claim settlement time by 30% compared to legacy system.",
      image: require("./assets/images/dubai_insurance_co_logo.png"),
      imageAlt: "Performance Achievement",
      footerLink: [],
      issuedDate: "Dec 2022 - Present",
      credentialID: "Performance Optimization"
    },
    {
      title: "30% Processing Time Reduction",
      subtitle: "Optimized system performance across premium collection and policy administration, reducing processing time by ~30% and improving scalability.",
      image: require("./assets/images/dubai_insurance_co_logo.png"),
      imageAlt: "Optimization Achievement",
      footerLink: [],
      issuedDate: "Dec 2022 - Present",
      credentialID: "System Optimization"
    },
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


// GitHub Projects Section (formerly Blogs)
// This section now displays your GitHub repositories instead of blogs

const blogSection = {
  title: "GitHub Projects",
  subtitle:
    "Explore my repositories, contributions, and open source projects. Search and filter by language, stars, or name.",
  displayMediumBlogs: "false", // Not used for GitHub projects
  blogs: [], // Not used - projects are fetched from GitHub
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

// Instagram Section
const instagramDetails = {
  userName: "echoesof.vd", // Add your Instagram username without @
  display: true, // Set true to display this section, defaults to false
  postsCount: 6, // Number of posts to display
  // Add your Instagram post URLs here
  // To get post URLs: Go to instagram.com/echoesof.vd, click on a post, copy the URL
  // Format: "https://www.instagram.com/p/POST_ID/"
  postUrls: [
    "https://www.instagram.com/p/DPHWogMErUV/",
    "https://www.instagram.com/p/DJZnsekMi8a/",
    "https://www.instagram.com/p/DNOK1bjSehi/",
    // Add more post URLs here as needed
  ]
};

const isHireable = true; // Set false if you are not looking for a job. Also isHireable will be display as Open for opportunities: Yes/No in the GitHub footer

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
  instagramDetails,
  isHireable,
  resumeSection
};
