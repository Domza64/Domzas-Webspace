# Domza's Webspace

This is my personal website and I made it because its soo cool ᕙ⁠(⁠ ⁠ ⁠•⁠ ⁠‿⁠ ⁠•⁠ ⁠ ⁠)⁠ᕗ.

## Some links

- This website: [HERE](https://domza.xyz/).
- Read my diary: [HERE](https://domza.xyz/diary).
- Cool MTB part of website: [HERE](https://domza.xyz/mtb).
- View my dev portfolio: [HERE](https://domza.xyz/dev-portfolio).

## Features

- Frontend: Served with HTML, CSS (using Tailwind), and minimal JavaScript.
- Backend: Simple Express API with GET and POST endpoints.
- Deployment Automation: GitHub webhook to automatically pull changes and restart the app on push to the `main` branch.
- Styling: Tailwind CSS configured with PostCSS.

## Prerequisites

- Node.js and npm
- Git
- PM2 (for managing the server in production)

## Instructions for future me:

### 1. Configure Environment Variables

Create a `.env` file in the root directory to define your port:

PORT=3000

### 2. Initialize PM2 (Production Only)

To manage the app in production, install `pm2` globally if you haven’t already:

sudo npm install -g pm2

## Development

For development, you'll want to run the server and the Tailwind CSS compiler.

- `npm run build:css`: Compiles and watches Tailwind CSS files.
- `npx nodemon`: Run the Node Server.

## Production

To run the app in production with automatic deployments:

1. Start the Server with PM2:

   pm2 start src/index.js --name domzas-webspace
   pm2 save # Saves the process list
   pm2 startup # Configures PM2 to start on boot

2. Set Up GitHub Webhook:

   - Go to your GitHub repository and open **Settings > Webhooks > Add webhook**.
   - Set the payload URL to `http://<url>/updateWebhook`.
   - Choose **application/json** as the content type and select **Just the push event**.
   - When you push code to the `main` branch, the Raspberry Pi will pull the latest changes and restart the server automatically.

### Production Commands

- pm2 start src/index.js --name my-website: Starts the app with PM2.
- pm2 restart my-website: Restarts the app.
- pm2 logs my-website: Shows logs for debugging.
- pm2 stop my-website: Stops the app.
