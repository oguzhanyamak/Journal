require('dotenv').config();

const getWeatherData = async (ip) => {
    const apiKey = process.env.weather_APIKEY;
    try {
        // IP formatını temizleme
        const cleanIp = ip.includes(":") ? ip.split(":").pop() : ip;
        const weatherApiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cleanIp}&aqi=no`;
        
        const weatherResponse = await fetch(weatherApiUrl);
        const weatherData = await weatherResponse.json();
        return weatherData;
    } catch (error) {
        console.error("Hava durumu verisi alınırken hata:", error);
        throw new Error("Hava durumu verisi alınırken hata oluştu");
    }
};

module.exports = {
    getWeatherData
};
