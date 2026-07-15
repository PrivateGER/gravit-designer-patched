FROM node:22-slim

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./

# Install project dependencies from the lockfile
RUN npm ci --omit=dev

# Copy the rest of the application code to the working directory
COPY . .

# Pre-compress the large JS/CSS bundles so they are served as static .br/.gz
RUN node scripts/precompress.js

# Expose the application's port
EXPOSE 3100

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3100)+'/connection/test').then((r)=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

# Run node directly so SIGTERM reaches the server (npm doesn't forward signals)
CMD ["node", "server.js"]
