const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 1200 }); // 20 dakika (1200 saniye) TTL

module.exports = myCache;
