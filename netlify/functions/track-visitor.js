// Track visitor analytics
exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body);
    const timestamp = new Date().toISOString();
    
    // Extract visitor info
    const visitorData = {
      timestamp,
      page: data.page || 'unknown',
      referrer: data.referrer || 'direct',
      userAgent: event.headers['user-agent'],
      ip: event.headers['x-forwarded-for'] || event.headers['x-nf-client-connection-ip'],
      country: event.headers['x-country-code'] || 'unknown'
    };

    // Log visitor (integrate with database if needed)
    console.log('Visitor tracked:', visitorData);

    // TODO: Store in database (Airtable, MongoDB, etc.)
    // Example:
    // await saveToDatabase(visitorData);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Visitor tracked',
        timestamp 
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to track visitor' })
    };
  }
};

