const mongoose = require("mongoose");
require('dotenv').config();

// MongoDB bağlantısı
const connectDB = async () => {
    const username = process.env.DB_USER;
    const password = process.env.DB_PASS;
    try {

        await mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.n4r0v.mongodb.net/haberDB?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB'ye başarıyla bağlanıldı");
    } catch (err) {
        console.error("MongoDB bağlantı hatası:", err);
        throw new Error("MongoDB bağlantısı başarısız");
    }
};

// Haber modelini dışa aktar
const News = mongoose.model('News', {
    _id: String,
    category: String,
    content: String,
    fetched_at: Date,
    image_url: String,
    link: String,
    original_published: Date,
    provider: String,
    provider_img_url: String,
    published_dt: Date,
    title: String
}, 'haberler'); // 'haberler' koleksiyon adını belirtiyoruz

module.exports = {
    connectDB,
    News
};
