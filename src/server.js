const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { marked } = require("marked");

const app = express();
const PORT = process.env.PORT || 3000;

// Use the DB_PATH environment variable to specify the database file path
var dbPath =
  process.env.DB_PATH || path.join(__dirname, "data", "guest_book.db");

if (process.env.NODE_ENV != "production") {
  dbPath = "./guest_book.db";
  isDevServer();
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
    db.run(`CREATE TABLE IF NOT EXISTS guest_book (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nickname TEXT NOT NULL,
      message TEXT NOT NULL,
      date TEXT NOT NULL
    )`);
  }
});

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public")));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Folder for EJS templates

// Serve a diary page with EJS
/*
  TODO - Make this generate this automatically on server start for production
  so it doesnt need to be rerendered for each request, when there is new diary
  article server will be restarted so that it will be rerendered
*/
app.get("/diary", async (req, res) => {
  const dirPath = path.join(__dirname, "diary");

  try {
    // Get all files from the 'diary' directory
    const files = await fs.promises.readdir(dirPath);

    // Filter out only markdown files and sort them by numeric part (descending)
    const mdFiles = files
      .filter((file) => file.endsWith(".md"))
      .sort((a, b) => {
        const numA = parseInt(a.replace(".md", ""), 10);
        const numB = parseInt(b.replace(".md", ""), 10);
        return numB - numA; // Sort from largest to smallest
      });

    // Read the content of each markdown file
    const articles = await Promise.all(
      mdFiles.map(async (file) => {
        const filePath = path.join(dirPath, file);
        const content = await fs.promises.readFile(filePath, "utf-8");
        const htmlContent = marked(content); // Convert Markdown to HTML
        return { title: file.replace(".md", ""), content: htmlContent }; // Use file name as title
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
  const query = `SELECT * FROM guest_book`;

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

  const query = `INSERT INTO guest_book (nickname, message, date) VALUES (?, ?, ?)`;
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

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

function isDevServer() {
  const livereload = require("livereload");
  const connectLivereload = require("connect-livereload");

  app.use(connectLivereload());

  // Start the livereload server to watch public folder
  const liveReloadServer = livereload.createServer();
  liveReloadServer.watch(path.join(__dirname, "public"));

  // Notify browser of changes
  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });
}
