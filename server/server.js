require("dotenv").config();

const express = require("express");

const cors = require("cors");

const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes/index");
const mediaRoutes = require("./routes/instructorRoutes/mediaRoutes");
const instructorCourseRoutes = require("./routes/instructorRoutes/courseRoutes");
const studentCourseRoutes = require("./routes/studentRoutes/courseRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Authorize origins
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Database connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

// Routes configuration
app.use("/auth", authRoutes);
app.use("/media", mediaRoutes);
app.use("/instructor/course", instructorCourseRoutes);
app.use("/student/course", studentCourseRoutes);

// Server start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
