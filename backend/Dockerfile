# Use the official Node.js v20 image as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY .env.docker .env
COPY . .

# Expose the port your backend runs on
EXPOSE 8000

# Set environment variables for production
ENV NODE_ENV=production

# Start the application
CMD ["npm", "run","dev"]
