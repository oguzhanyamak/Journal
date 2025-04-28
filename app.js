const express = require("express");
const expressLayout = require("express-ejs-layouts");
const methodOverride = require("method-override");
var compression = require('compression')
var helmet = require('helmet')
const { connectDB, News } = require("./services/mongoService");  // MongoDB servisini içe aktar
const { getWeatherData } = require("./services/weatherService");  // Hava durumu servisini içe aktar

const app = express();
const PORT = process.env.PORT || 7000;


// MongoDB bağlantısı
connectDB();

app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");
require("dotenv").config();
app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],  // Varsayılan olarak yalnızca aynı kaynak
        imgSrc: ["*"],  // Tüm kaynaklardan resim yüklemeye izin ver
        // Diğer direktifler...
      }
    })
  );
app.use(compression())


// Kategori ve haber sayıları
const categoryLimits = {
    'SonDakika': 10,
    'Gündem':3,
    'Ekonomi': 4,
    'Otomobil': 4,
    'Spor': 4,
    'Dünya': 4
};

// Ana sayfa - Kategorilere göre haberleri getir
app.get("/", async (req, res) => {
    try {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const weatherData = await getWeatherData(ip);
        // Kategorize edilmiş haberleri çekmek için MongoDB servisini kullanıyoruz
        const categorizedNews = {};
        const categoryPromises = Object.entries(categoryLimits).map(async ([category, limit]) => {
            const news = await News.find({ category })
                .sort({ published_dt: -1 })
                .limit(limit);
            categorizedNews[category] = news;
        });
        await Promise.all(categoryPromises);

        res.render("home", { categorizedNews, weatherData });

    } catch (error) {
        console.error("Ana sayfa yüklenirken hata:", error);
        res.render("home", { 
            categorizedNews: {},
            weatherInfo: null,
            error: "Sayfa yüklenirken bir hata oluştu."
        });
    }
});

app.listen(PORT, () => {
    console.log(`App Listening on : ${PORT}`);
});
