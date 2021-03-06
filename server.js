const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");


const PORT = process.env.PORT || 3001;
const app = express();
const routes = require("./routes/routes");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use(logger("dev"));
// Use apiRoutes
app.use("/api", routes);

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/todolist";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
}); 

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});