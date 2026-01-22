// API endpoint to get projects
exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Example project data - you can fetch from database
    const projects = [
      {
        id: 1,
        name: "Worker Protection Program (WPP)",
        description: "Full Stack Developer for Dubai Insurance",
        technologies: ["Angular", "Java", "Spring Boot", "MySQL"],
        status: "live",
        url: "https://dubins-wpp.ae/en/wpp"
      },
      {
        id: 2,
        name: "Workers Health Insurance (WHI)",
        description: "Delivered entire platform in 30 days",
        technologies: ["Angular", "Java", "Spring Boot", "REST APIs"],
        status: "live",
        url: "https://dubins-wpp.ae/en/wpp"
      }
    ];

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      },
      body: JSON.stringify({ 
        success: true, 
        projects,
        count: projects.length
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        error: 'Failed to fetch projects',
        message: error.message 
      })
    };
  }
};

