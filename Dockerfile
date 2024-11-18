FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy application code
COPY ./src ./src
COPY ./public ./public

# Build Tailwind CSS
COPY tailwind.config.js ./tailwind.config.js
COPY postcss.config.js ./postcss.config.js
RUN npm run build:css

# Expose the app port
EXPOSE 3000

# Start the app
CMD ["node", "src/server.js"]