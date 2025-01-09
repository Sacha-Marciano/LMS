// User model
// Every change made here require revision of all courses endpoint fetches like:
// Create, login and check auth in UI and server

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  password: String,
  role: String,
});

module.exports = mongoose.model("User", UserSchema);
