# Use the official Node.js image to build the React app with Vite
FROM node:20 as build

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY ./.env.docker .env
COPY . .

# Build the Vite app for production
RUN npm run build

# Use the official Nginx image to serve the built files (non-Alpine version)
FROM nginx

# Copy the built files from the previous stage to the Nginx HTML folder
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration (if any) into the container
COPY ./nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
