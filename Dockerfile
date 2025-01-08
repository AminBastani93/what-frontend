# Use the Node.js official image as a base image
FROM node:18-alpine AS base

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package.json package-lock.json ./ 
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Set environment variables (adjust as needed)
ENV NODE_ENV=production
ENV PORT=3001

# Expose the port the app runs on
EXPOSE 3001

# Run the Next.js app
CMD ["npm", "start"]
