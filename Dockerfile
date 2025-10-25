FROM node:18

WORKDIR /app

COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the application's port
EXPOSE 3100

# Define the command to run the application
CMD ["npm", "start"]
