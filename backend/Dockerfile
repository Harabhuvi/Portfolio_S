# Use official Node.js runtime as parent image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Cloud Run injects the PORT environment variable. We expose it as documentation.
EXPOSE 8080

# Start the application
CMD [ "npm", "start" ]
