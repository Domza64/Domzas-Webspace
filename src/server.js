const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
const { marked } = require("marked");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const db = new sqlite3.Database("./messages.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
    db.run(`CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nickname TEXT NOT NULL,
      message TEXT NOT NULL,
      date TEXT NOT NULL
    )`);
  }
});

// Middleware
app.use(bodyParser.json());
app.use(connectLivereload());
app.use(express.static(path.join(__dirname, "../public")));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Folder for EJS templates

// Start the livereload server to watch public folder
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

// Notify browser of changes
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// Serve a diary page with EJS
app.get("/diary", async (req, res) => {
  // TODO - Make this generate this automatically on server start for production
  // so it doesnt need to be rerendered for each request, when there is new diary
  // article server will be restarted so that it will be rerendered
  const dirPath = path.join(__dirname, "diary");

  try {
    // Get all files from the 'diary' directory
    const files = await fs.promises.readdir(dirPath);

    // Filter out only markdown files
    const mdFiles = files.filter((file) => file.endsWith(".md")).reverse();

    // Read the content of each markdown file
    const articles = await Promise.all(
      mdFiles.map(async (file) => {
        const filePath = path.join(dirPath, file);
        const content = await fs.promises.readFile(filePath, "utf-8");
        const htmlContent = marked(content); // Convert Markdown to HTML
        return { content: htmlContent }; // Use file name as title
      })
    );

    // Send the articles to the EJS template
    res.render("diary", { title: "Diary Entries", articles });
  } catch (error) {
    console.error("Error reading diary files:", error);
    res.status(500).send("Error loading diary content");
  }
});

// GET API for guest book
app.get("/api/guestBook", (req, res) => {
  const query = `SELECT * FROM messages`;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error("Error fetching data:", err.message);
      return res
        .status(500)
        .json({ status: "Error", message: "Failed to retrieve data." });
    }

    // Format dates
    const formattedMessages = rows.reverse().map((row) => {
      const formattedDate = new Date(row.date).toLocaleString("en-US", {
        timeZone: "America/New_York", // Replace with your desired timezone
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      return { ...row, date: formattedDate };
    });

    res.json({ status: "Success", messages: formattedMessages });
  });
});

// POST API for guest book
app.post("/api/guestBook", (req, res) => {
  console.log(req.body);
  const { nickname, message } = req.body;

  if (!nickname || !message) {
    return res
      .status(400)
      .json({ status: "Error", message: "Nickname and message are required." });
  }

  const date = new Date().toISOString();

  const query = `INSERT INTO messages (nickname, message, date) VALUES (?, ?, ?)`;
  const params = [nickname, message, date];

  db.run(query, params, function (err) {
    if (err) {
      console.error("Error inserting data:", err.message);
      return res
        .status(500)
        .json({ status: "Error", message: "Failed to insert data." });
    }

    console.log(
      `Data inserted: nickname=${nickname}, message=${message}, date=${date}`
    );
    res.redirect("/#guest-book");
  });
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
