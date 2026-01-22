// Track resume download
exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body);
    const timestamp = new Date().toISOString();
    
    // Log download (you can integrate with Airtable, MongoDB, etc.)
    console.log('Resume download tracked:', {
      timestamp,
      source: data.source || 'unknown',
      userAgent: event.headers['user-agent'],
      ip: event.headers['x-forwarded-for'] || event.headers['x-nf-client-connection-ip']
    });

    // TODO: Store in database (Airtable, MongoDB Atlas, etc.)
    // Example with Airtable:
    // await saveToAirtable({
    //   timestamp,
    //   source: data.source,
    //   type: 'resume_download'
    // });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Download tracked',
        timestamp 
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to track download' })
    };
  }
};

