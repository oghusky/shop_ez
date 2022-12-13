require("dotenv").config();
const express = require('express'),
    app = express(),
    cors = require('cors'),
    morgan = require('morgan'),
    PORT = process.env.PORT || 3001,
    {connectDB} = require("./config/db");
connectDB();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.listen(PORT, console.log(`http://localhost:${PORT}`));