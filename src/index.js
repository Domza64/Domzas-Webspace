const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(connectLivereload());
app.use(express.static(path.join(__dirname, "../public")));

// Start the livereload server to watch public folder
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

// Notify browser of changes
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// Basic GET API
app.get("/api/data", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

// Basic POST API
app.post("/api/submit", (req, res) => {
  const { data } = req.body;
  console.log(`Data received: ${data}`);
  res.json({ status: "Success", received: data });
});

// Webhook endpoint for automatic deployment
app.post("/updateWebhook", (req, res) => {
  const payload = req.body;
  if (payload && payload.ref === "refs/heads/main") {
    exec(
      "git pull && npm install && pm2 restart all",
      (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return res.status(500).send("Deployment failed");
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        res.status(200).send("Deployed successfully");
      }
    );
  } else {
    res.status(400).send("Not the main branch");
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
