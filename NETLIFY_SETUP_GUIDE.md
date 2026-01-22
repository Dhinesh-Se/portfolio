# Netlify Backend Setup Guide

Complete guide to set up all backend features for your portfolio on Netlify.

## 🚀 Quick Setup Checklist

- [ ] Deploy to Netlify
- [ ] Configure Netlify Forms
- [ ] Set up environment variables
- [ ] Test Netlify Functions
- [ ] Configure Mailchimp (optional)
- [ ] Set up database (optional)

---

## 1. Netlify Forms Setup ✅

### **Already Configured!**

Your contact form is already set up with Netlify Forms. Just deploy and it works!

**What you get:**
- Automatic spam filtering
- Form submissions in Netlify dashboard
- Email notifications (configure in Netlify)
- 100 free submissions/month

### **To Configure Email Notifications:**

1. Go to Netlify Dashboard → Your Site → Forms
2. Click on "contact" form
3. Go to "Notifications" tab
4. Add email addresses to receive notifications
5. Save

**That's it!** Your contact form now works without any backend code.

---

## 2. Environment Variables Setup

### **For Newsletter (Mailchimp):**

1. Go to Netlify Dashboard → Site settings → Environment variables
2. Add these variables:

```
MAILCHIMP_API_KEY = "your-mailchimp-api-key"
MAILCHIMP_LIST_ID = "your-mailchimp-list-id"
MAILCHIMP_SERVER = "us1" (or your server prefix)
```

### **How to Get Mailchimp Credentials:**

1. Sign up at https://mailchimp.com (free up to 500 contacts)
2. Go to Account → Extras → API keys
3. Create an API key
4. Go to Audience → Settings → Audience name and defaults
5. Copy your Audience ID (this is your LIST_ID)
6. Find your server prefix in the API key URL (usually "us1", "us2", etc.)

### **For Database (Optional - Airtable, MongoDB, etc.):**

If you want to store data in a database:

**Airtable:**
```
AIRTABLE_API_KEY = "your-airtable-api-key"
AIRTABLE_BASE_ID = "your-base-id"
```

**MongoDB Atlas:**
```
MONGODB_URI = "your-mongodb-connection-string"
```

---

## 3. Netlify Functions

### **Functions Created:**

1. **`track-download.js`** - Tracks resume downloads
2. **`subscribe-newsletter.js`** - Newsletter subscription (Mailchimp)
3. **`track-visitor.js`** - Visitor analytics
4. **`get-stats.js`** - Get portfolio statistics
5. **`submit-testimonial.js`** - Submit testimonials
6. **`api/projects.js`** - API endpoint for projects

### **Testing Functions Locally:**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Start local dev server
netlify dev
```

Functions will be available at:
- `http://localhost:8888/.netlify/functions/track-download`
- `http://localhost:8888/.netlify/functions/subscribe-newsletter`
- etc.

---

## 4. Features Overview

### ✅ **Contact Form (Netlify Forms)**
- **Status:** Ready to use
- **Setup:** None needed, just deploy
- **Location:** Contact modal
- **View Submissions:** Netlify Dashboard → Forms

### ✅ **Resume Download Tracking**
- **Status:** Ready (logs to console)
- **Setup:** Optional - connect to database
- **Location:** Resume download button
- **Enhancement:** Connect to Airtable/MongoDB to store data

### ✅ **Newsletter Subscription**
- **Status:** Ready (works without Mailchimp, logs to console)
- **Setup:** Add Mailchimp credentials for full functionality
- **Location:** Footer section
- **Enhancement:** Connect to Mailchimp API

### ✅ **Visitor Counter**
- **Status:** Ready (shows placeholder)
- **Setup:** Connect to database for real counts
- **Location:** Bottom right corner
- **Enhancement:** Store visitor data in database

### ✅ **Testimonials System**
- **Status:** Ready (form works, stores in console)
- **Setup:** Connect to database to store/display
- **Location:** Testimonials section
- **Enhancement:** Fetch approved testimonials from database

### ✅ **API Endpoints**
- **Status:** Ready
- **Location:** `/api/projects`
- **Usage:** Fetch project data via API

---

## 5. Database Integration (Optional)

### **Option 1: Airtable (Easiest)**

1. Create Airtable account (free)
2. Create a base with tables:
   - Downloads (timestamp, source, ip)
   - Visitors (timestamp, page, referrer)
   - Testimonials (name, role, company, testimonial, rating, status)
   - Newsletter (email, timestamp)

3. Get API credentials
4. Update Netlify Functions to use Airtable API

**Example for `track-download.js`:**
```javascript
const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY})
  .base(process.env.AIRTABLE_BASE_ID);

// In function:
await base('Downloads').create({
  'Timestamp': new Date().toISOString(),
  'Source': data.source,
  'IP': event.headers['x-forwarded-for']
});
```

### **Option 2: MongoDB Atlas (More Flexible)**

1. Create MongoDB Atlas account (free tier: 512MB)
2. Create cluster
3. Get connection string
4. Install MongoDB driver in functions
5. Update functions to use MongoDB

**Install dependency:**
```bash
cd netlify/functions
npm init -y
npm install mongodb
```

---

## 6. Deployment Steps

### **First Time Deployment:**

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Add Netlify backend features"
   git push
   ```

2. **Connect to Netlify:**
   - Go to https://app.netlify.com
   - Click "New site from Git"
   - Connect your GitHub repository
   - Netlify will auto-detect settings

3. **Configure Build:**
   - Build command: `npm run build`
   - Publish directory: `build`
   - Functions directory: `netlify/functions`

4. **Add Environment Variables:**
   - Go to Site settings → Environment variables
   - Add your API keys (Mailchimp, etc.)

5. **Deploy!**
   - Netlify will automatically deploy
   - Functions will be available at `/.netlify/functions/function-name`

---

## 7. Testing After Deployment

### **Test Contact Form:**
1. Open your portfolio
2. Click "Send Message"
3. Fill out and submit form
4. Check Netlify Dashboard → Forms → "contact"
5. You should see the submission!

### **Test Newsletter:**
1. Scroll to footer
2. Enter email in newsletter form
3. Submit
4. Check browser console for success message
5. If Mailchimp configured, check Mailchimp dashboard

### **Test Resume Download:**
1. Click "Download my resume"
2. Check browser console (should log download)
3. Check Netlify Functions logs in dashboard

### **Test Functions Directly:**
Visit these URLs (replace with your domain):
- `https://your-site.netlify.app/.netlify/functions/get-stats`
- `https://your-site.netlify.app/api/projects`

---

## 8. Monitoring & Analytics

### **Netlify Dashboard:**
- View form submissions
- Monitor function invocations
- Check function logs
- View build logs
- Monitor site performance

### **Function Logs:**
1. Go to Netlify Dashboard → Functions
2. Click on any function
3. View real-time logs
4. Debug issues

---

## 9. Free Tier Limits

### **Netlify Free Tier:**
- **Forms:** 100 submissions/month
- **Functions:** 125,000 invocations/month
- **Bandwidth:** 100 GB/month
- **Build minutes:** 300 minutes/month

### **Mailchimp Free Tier:**
- **Contacts:** Up to 500
- **Emails:** 1,000 emails/month
- **Perfect for portfolio!**

---

## 10. Troubleshooting

### **Forms Not Working:**
- Make sure form has `netlify` attribute
- Check form name matches in hidden input
- Verify form is deployed (not just local)

### **Functions Not Working:**
- Check function logs in Netlify dashboard
- Verify environment variables are set
- Test locally with `netlify dev`
- Check function timeout (max 10s on free tier)

### **CORS Errors:**
- Functions already have CORS headers
- If issues, check `Access-Control-Allow-Origin` header

---

## 11. Next Steps (Optional Enhancements)

1. **Connect to Database:**
   - Set up Airtable or MongoDB
   - Update functions to store data
   - Create admin dashboard (optional)

2. **Email Notifications:**
   - Configure Netlify Forms email notifications
   - Set up Mailchimp for newsletter

3. **Analytics Dashboard:**
   - Create admin page to view stats
   - Display charts and graphs
   - Export data

4. **Admin Panel:**
   - Approve testimonials
   - View all submissions
   - Manage content

---

## 📝 Summary

**What's Working Now:**
- ✅ Contact form (Netlify Forms)
- ✅ Resume download tracking (logs)
- ✅ Newsletter subscription (logs/Mailchimp ready)
- ✅ Visitor tracking (logs)
- ✅ Testimonials submission (logs)
- ✅ API endpoints

**What Needs Configuration:**
- Mailchimp API keys (for newsletter)
- Database (optional, for storing data)
- Email notifications (Netlify Forms)

**Everything is ready to deploy!** Just push to GitHub and connect to Netlify. 🚀

---

## 🔗 Useful Links

- **Netlify Docs:** https://docs.netlify.com
- **Netlify Functions:** https://docs.netlify.com/functions/overview/
- **Netlify Forms:** https://docs.netlify.com/forms/setup/
- **Mailchimp API:** https://mailchimp.com/developer/
- **Airtable API:** https://airtable.com/api
- **MongoDB Atlas:** https://www.mongodb.com/cloud/atlas

