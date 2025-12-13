const myCache = require('../services/cacheService');
const os = require('os');

exports.getStatusPage = (req, res) => {
    try {
        const stats = myCache.getStats();
        const keys = myCache.keys();

        // Bellek kullanımı
        const usedMem = os.totalmem() - os.freemem();
        const memUsage = Math.round((usedMem / os.totalmem()) * 100);

        const systemInfo = {
            platform: os.platform(),
            uptime: Math.round(os.uptime() / 60) + " dakika", // Saniye -> Dakika
            totalmem: (os.totalmem() / 1024 / 1024 / 1024).toFixed(2) + " GB",
            freemem: (os.freemem() / 1024 / 1024 / 1024).toFixed(2) + " GB",
            memUsage: memUsage
        };

        res.render('status', {
            stats,
            keys,
            systemInfo,
            title: 'Sistem Durumu - Malumath Admin'
        });
    } catch (error) {
        console.error("Status sayfası hatası:", error);
        res.status(500).send("Sistem durumu alınamadı.");
    }
};
