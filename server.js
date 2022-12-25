require("dotenv").config();
const express = require('express'),
    app = express(),
    cors = require('cors'),
    morgan = require('morgan'),
    PORT = process.env.PORT || 3001,
    bodyParser = require("body-parser"),
    { connectDB } = require("./config/db");
connectDB();
app.use(cors())
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/api/user", require("./routes/user-routes"));
app.use("/api/store", require("./routes/store-routes"));
app.use("/api/image", require("./routes/image-routes"));
app.use("/api/product", require("./routes/product-routes"));
app.listen(PORT, console.log(`http://localhost:${PORT}`));

// s3Upload("shopez/bloop","Screenshot-2022-12-22-at-1.10.56-PM.png","");
// getFileFromS3("shopez/stores","s3.txt");
// deleteFileFromS3("shopez/stores","s3.txt");
// s3ListBuckets()
// listFoldersInBucket("stores/");