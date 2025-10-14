# Use Node.js 20
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build the application (both frontend and backend)
RUN yarn build

# Verify the build output
RUN ls -la dist/ && ls -la dist/server/

# Expose port
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]
