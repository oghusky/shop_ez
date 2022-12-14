require("dotenv").config();
const express = require('express'),
    app = express(),
    cors = require('cors'),
    morgan = require('morgan'),
    PORT = process.env.PORT || 3001,
    { connectDB } = require("./config/db");
connectDB();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/user", require("./routes/user-routes"));
app.use("/api/store", require("./routes/store-routes"));
app.use("/api/product", require("./routes/product-routes"));
app.listen(PORT, console.log(`http://localhost:${PORT}`));