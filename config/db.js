const {connect} = require("mongoose");
exports.connectDB = async ()=>{
    const conn = await connect(process.env.MONGO_URI || "mongodb://localhost:27017/simpleshop");
    if(conn) console.log("CONNECTED TO DB")
    else console.log("NOT CONNECTED TO DB");
}