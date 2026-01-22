// Newsletter subscription with Mailchimp
exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { email } = JSON.parse(event.body);
    
    // Validate email
    if (!email || !email.includes('@')) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Valid email is required' })
      };
    }

    // Mailchimp API integration
    // Get these from Netlify environment variables
    const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
    const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
    const MAILCHIMP_SERVER = process.env.MAILCHIMP_SERVER || 'us1';

    if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID) {
      // Fallback: Just log the subscription
      console.log('Newsletter subscription:', email);
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ 
          success: true, 
          message: 'Subscription recorded (Mailchimp not configured)',
          note: 'Configure MAILCHIMP_API_KEY and MAILCHIMP_LIST_ID in Netlify environment variables'
        })
      };
    }

    // Add subscriber to Mailchimp
    const response = await fetch(
      `https://${MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${MAILCHIMP_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed'
        })
      }
    );

    const result = await response.json();

    if (response.ok) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ 
          success: true, 
          message: 'Successfully subscribed to newsletter!' 
        })
      };
    } else {
      // Handle existing subscriber
      if (result.title === 'Member Exists') {
        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({ 
            success: true, 
            message: 'You are already subscribed!' 
          })
        };
      }
      
      throw new Error(result.detail || 'Failed to subscribe');
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        error: 'Failed to subscribe',
        message: error.message 
      })
    };
  }
};

