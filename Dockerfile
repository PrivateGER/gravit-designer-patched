FROM node:22-slim

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./

# Install project dependencies from the lockfile
RUN npm ci --omit=dev

# Copy the rest of the application code to the working directory
COPY . .

# Expose the application's port
EXPOSE 3100

# Run node directly so SIGTERM reaches the server (npm doesn't forward signals)
CMD ["node", "server.js"]
