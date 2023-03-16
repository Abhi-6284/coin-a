require('dotenv').config();
const mongoose = require('mongoose')

mongoose.set('strictQuery', false);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://prashant:<password>@cluster0.m7fra7o.mongodb.net/'+process.env.MONGODB_DATABASE+'?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => console.log("Connected to MongoDB"))
            .catch((err) => console.log("Failed to connect to MongoDB"+err));
    } catch {

    }
}

module.exports = connectDB;