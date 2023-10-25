# Use an official Node.js image as the parent image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy the server code
COPY server/ ./server/

# Copy the public files
COPY public/ ./public/

# Install public component dependencies
RUN cd ./public && npm install

# Install server component dependencies
RUN cd ./server && npm install

# Expose ports 3000 and 5001
EXPOSE 3000
EXPOSE 5001

# Define the command to run both components
CMD ["sh", "-c", "cd server && npm start & cd public && npm start"]
