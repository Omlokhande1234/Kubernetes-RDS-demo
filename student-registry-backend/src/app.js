require("dotenv").config();

const express = require("express");
const cors = require("cors");

const studentRoutes = require("./routes/studentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Student Registry API is Running");
});

app.get("/health", (req, res) => {
    res.status(200).send("OK");
});

app.use("/api/students", studentRoutes);

module.exports = app;