const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async () => {
    const username = process.env.DB_USER;
    const password = process.env.DB_PASS;
    try {
        await mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.n4r0v.mongodb.net/haberDB?retryWrites=true&w=majority`);
        console.log("MongoDB'ye başarıyla bağlanıldı");
    } catch (err) {
        console.error("MongoDB bağlantı hatası:", err);
        throw new Error("MongoDB bağlantısı başarısız");
    }
};

module.exports = connectDB;
