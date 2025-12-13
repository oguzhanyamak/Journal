const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

const statusController = require('../controllers/statusController');

// Ana Sayfa
router.get('/', newsController.getHomePage);

// Sistem Durumu (Admin)
router.get('/status', statusController.getStatusPage);

// Kategori Sayfaları
router.get('/:categoryName', newsController.getCategoryPage);
router.get('/:categoryName/:pageNumber', newsController.getCategoryPage);

module.exports = router;
