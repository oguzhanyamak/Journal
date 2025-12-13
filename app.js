const express = require("express");
require("dotenv").config();
const expressLayout = require("express-ejs-layouts");
const methodOverride = require("method-override");
const compression = require('compression');
const helmet = require('helmet');
const path = require('path');
const connectDB = require('./config/db'); // Yeni DB bağlantısı
const newsRoutes = require('./routes/newsRoutes'); // Yeni Rotalar
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 7000;

// Rate Limiting (15 dakikada maksimum 100 istek)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: process.env.RATE_LIMIT_MAX || 100, // Prod için 100, Test için 3-5 yapabilirsiniz
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next, options) => {
        res.status(options.statusCode).render("429", {
            layout: "./layouts/main", // Ana layout içinde göster
            title: "Çok Fazla İstek"
        });
    }
});
app.use(limiter);

// MongoDB bağlantısı
connectDB();

app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(expressLayout);
app.set('views', [
    path.join(__dirname, 'views'),
    path.join(__dirname, 'views/partials')
]);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");


app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            imgSrc: ["*"],
            // Diğer direktifler...
        }
    })
);
app.use(compression());

// Rotalar
app.use('/', newsRoutes);

app.listen(PORT, () => {
    console.log(`App Listening on : ${PORT}`);
});
