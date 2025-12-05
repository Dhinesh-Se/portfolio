# This file is the main docker file configurations

# Official Node JS runtime as a parent image - Updated to LTS version
FROM node:18-alpine

# Set the working directory to ./app
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN apk add --no-cache git

# Install any needed packages
RUN npm ci --only=production

# Bundle app source
COPY . /app

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Run app when the container launches
CMD ["npm", "start"]
