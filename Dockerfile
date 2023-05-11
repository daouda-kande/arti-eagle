# Use a Node.js 18 base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Update the @iconify/tools library to a version that is compatible with replaceAll
RUN npm install @iconify/tools@latest

# Copy the rest of the application files to the container
COPY . .

# Build the application
RUN npm run build

EXPOSE 5173

# Set the startup command
CMD ["npm", "start"]
