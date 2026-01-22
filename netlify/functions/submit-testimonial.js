// Submit testimonial
exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { name, role, company, testimonial, rating } = JSON.parse(event.body);
    
    // Validate input
    if (!name || !testimonial) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Name and testimonial are required' })
      };
    }

    const testimonialData = {
      name,
      role: role || '',
      company: company || '',
      testimonial,
      rating: rating || 5,
      status: 'pending', // Admin approval required
      timestamp: new Date().toISOString(),
      ip: event.headers['x-forwarded-for'] || event.headers['x-nf-client-connection-ip']
    };

    // Log testimonial (integrate with database)
    console.log('Testimonial submitted:', testimonialData);

    // TODO: Store in database (Airtable, MongoDB, etc.)
    // await saveToDatabase(testimonialData);

    // TODO: Send email notification to admin
    // await sendEmailNotification(testimonialData);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Thank you! Your testimonial has been submitted and is pending approval.' 
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
        error: 'Failed to submit testimonial',
        message: error.message 
      })
    };
  }
};

