const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const chatRoutes = require("./routes/chatRoutes.js");
require("dotenv").config();

// Paths
const viewsPath = path.join(__dirname, "..", "frontend", "views");
const publicPath = path.join(__dirname, "..", "frontend", "public");

app.set("views", viewsPath);
app.set("view engine", "ejs");
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Database Connection
main()
  .then(() => {
    console.log("Database connection successful");
})
  .catch((err) => console.log("Database connection error:", err));

async function main() {
    const dbUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/chatbox';
    await mongoose.connect(dbUrl);
}

// Routes
app.use("/chats", chatRoutes);

app.get("/", (req, res) => {
    res.redirect("/chats");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
