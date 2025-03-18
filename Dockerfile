# ------------------------
# Step 1: Build react app
# ------------------------

# Use node:latest as the builder image
FROM node:latest AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and install app dependencies
COPY package.json .
RUN npm install

# Copy other project files and build
COPY . ./
RUN npm run build

# --------------------------------------
# Step 2: Set up nginx to serve the app
# --------------------------------------
# Use nginx:latest as the base image
FROM nginx:latest

# Overwriting nginx config with our own config file
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy over the build created in the Step 1
COPY --from=builder /app/.next /usr/share/nginx/html

# Set the working directory
WORKDIR /usr/share/nginx/html

# Start nginx server
CMD ["/bin/bash", "-c", "nginx -g \"daemon off;\""]
