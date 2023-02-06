const mongoose = require("mongoose");

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URL);


mongoose.connection.on("connected", ()=>{
    console.log("Connected to DataBase");
})

mongoose.connection.on("disconnected", ()=>{
    console.log("DataBase Disconnected");
})
