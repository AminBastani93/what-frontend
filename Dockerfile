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

# Use a minimal runtime image to serve the built app
FROM node:18-alpine AS production

# Install only production dependencies
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install --production

# Copy built files from the build stage
COPY --from=base /usr/src/app/.next ./.next
COPY --from=base /usr/src/app/public ./public
COPY --from=base /usr/src/app/next.config.js ./

# Set environment variables (adjust as needed)
ENV NODE_ENV=production
ENV PORT=3001

# Expose the port the app runs on
EXPOSE 3001

# Run the Next.js app
CMD ["npm", "start"]
