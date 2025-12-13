const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    _id: String,
    category: String,
    content: String,
    image_url: String,
    link: String,
    provider: String,
    published_dt: Date,
    title: String
}, { collection: 'haberler' }); // 'haberler' koleksiyon adını belirtiyoruz

// İndeksleme (Performans için)
newsSchema.index({ category: 1, published_dt: -1 });

const News = mongoose.model('News', newsSchema);

module.exports = News;
