const mongoose = require("mongoose");

const connectDatabase = async()=>{
    await mongoose.connect("mongodb+srv://balramrajbanshi4769:pz3cOINJd3t15X0L@cluster0.ha43xbh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log("Database connected successfully");
    
}

module.exports = connectDatabase;