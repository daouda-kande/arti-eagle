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

# Rename emitted files with unique names
RUN mv assets/index.cd0ffd92.css assets/index-$(date +%s).cd0ffd92.css
RUN mv assets/not-authorized.4a4fc11c.css assets/not-authorized-$(date +%s).4a4fc11c.css

# Build the application
RUN npm run build

EXPOSE 5173

# Set the startup command
CMD ["npm", "run", "build"]
