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

const getPaginatedNewsByCategory = async (category, page = 1, limit = 20) => {
    try {
        const skip = (page - 1) * limit;

        const [newsList, totalCount] = await Promise.all([
            News.find({ 
                category: { $regex: new RegExp(`^${category}$`, 'i') } 
            })
            .sort({ published_dt: -1 })
            .skip(skip)
            .limit(limit),
            
            News.countDocuments({ 
                category: { $regex: new RegExp(`^${category}$`, 'i') }
            })
        ]);

        return {
            data: newsList,
            total: totalCount,
            category:category.toLowerCase(),
            page,
            totalPages: Math.ceil(totalCount / limit)
        };
    } catch (err) {
        console.error("Haberler çekilirken hata oluştu:", err);
        throw new Error("Haberler çekilemedi");
    }
};
/*
{
    "data": [...haberler],
    "total": 128,
    "page": 2,
    "totalPages": 13
}
*/


// Haber modelini dışa aktar
const News = mongoose.model('News', {
    _id: String,
    category: String,
    content: String,
    image_url: String,
    link: String,
    provider: String,
    published_dt: Date,
    title: String
}, 'haberler'); // 'haberler' koleksiyon adını belirtiyoruz

module.exports = {
    connectDB,
    News,
    getPaginatedNewsByCategory
};
