FROM node:20-alpine

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json /app/
RUN npm install

# Copy the rest of the application code
COPY . /app

RUN npm run build

# Install a web server
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 8080

# Command to run the app
CMD ["serve", "-s", "dist"]