const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI

const connectDatabase = async()=>{
    await mongoose.connect(MONGO_URI)
    console.log("Database connected successfully");
    
}

module.exports = connectDatabase;