const News = require('../models/News');

const myCache = require('../services/cacheService'); // Shared Cache Service

// Kategori limitleri
const categoryLimits = {
    'SonDakika': 10,
    'Gündem': 6,
    'Ekonomi': 6,
    'Otomobil': 6,
    'Spor': 6,
    'Dünya': 6
};

exports.getHomePage = async (req, res) => {
    try {
        // Cache kontrolü
        const cachedData = myCache.get("home_data");
        if (cachedData) {
            return res.render("home", {
                categorizedNews: cachedData,
                title: "Malumath - Güncel Haberler, Son Dakika",
                description: "Türkiye'nin en hızlı haber kaynağı. Gündem, ekonomi, spor ve dünya haberleri."
            });
        }

        const categorizedNews = {};
        const categoryPromises = Object.entries(categoryLimits).map(async ([category, limit]) => {
            const news = await News.find({ category })
                .sort({ published_dt: -1 })
                .limit(limit)
                .lean();
            categorizedNews[category] = news;
        });
        await Promise.all(categoryPromises);

        // Cache'e kaydet
        myCache.set("home_data", categorizedNews);

        res.render("home", {
            categorizedNews,
            title: "Malumath - Güncel Haberler, Son Dakika",
            description: "Türkiye'nin en hızlı haber kaynağı. Gündem, ekonomi, spor ve dünya haberleri."
        });

    } catch (error) {
        console.error("Ana sayfa yüklenirken hata:", error);
        res.render("home", {
            categorizedNews: {},
            weatherInfo: null,
            error: "Sayfa yüklenirken bir hata oluştu."
        });
    }
};

exports.getCategoryPage = async (req, res) => {
    try {
        const categoryName = req.params.categoryName;
        const page = req.params.pageNumber ? parseInt(req.params.pageNumber) : 1;

        // Cache Key: category_gundem_1
        const cacheKey = `category_${categoryName}_${page}`;
        const cachedData = myCache.get(cacheKey);

        if (cachedData) {
            return res.render("category", {
                newsItems: cachedData,
                title: `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Haberleri - Malumath`,
                description: `${categoryName} kategorisindeki en güncel haberler ve gelişmeler.`
            });
        }

        const limit = 20;

        const newsItems = await getPaginatedNews(categoryName, page, limit);

        // Cache'e kaydet
        myCache.set(cacheKey, newsItems);

        res.render("category", {
            newsItems,
            title: `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Haberleri - Sayfa ${page} - Malumath`,
            description: `${categoryName} kategorisindeki en güncel haberler.`
        });
    } catch (error) {
        console.error("Kategori sayfası hatası:", error);
        res.status(500).send("Bir hata oluştu");
    }
};

// Yardımcı fonksiyon (Controller içinde veya ayrı bir serviste olabilir)
const getPaginatedNews = async (category, page, limit) => {
    const skip = (page - 1) * limit;

    const [newsList, totalCount] = await Promise.all([
        News.find({
            category: { $regex: new RegExp(`^${category}$`, 'i') }
        })
            .sort({ published_dt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),

        News.countDocuments({
            category: { $regex: new RegExp(`^${category}$`, 'i') }
        })
    ]);

    return {
        data: newsList,
        total: totalCount,
        category: category.toLowerCase(),
        page,
        totalPages: Math.ceil(totalCount / limit)
    };
};
