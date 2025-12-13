# Malumath - Modern Haber ve İçerik Platformu

![Malumath Banner](public/images/favicon2.png)

**Malumath**, modern web teknolojileri ile geliştirilmiş, yüksek performanslı ve kullanıcı dostu bir haber platformudur. Gündem, Ekonomi, Spor, Dünya ve Teknoloji gibi kategorilerde en güncel içerikleri hızlı ve güvenilir bir şekilde sunar.

🌐 **Canlı Demo:** [www.malumath.com](http://www.malumath.com)

---

## 🚀 Öne Çıkan Özellikler

### 🏗️ Profesyonel Mimari (MVC)
Proje, **Model-View-Controller (MVC)** tasarım deseni kullanılarak sıfırdan revize edilmiştir. Bu sayede kodun yönetilebilirliği, test edilebilirliği ve ölçeklenebilirliği artırılmıştır.
- **Modüler Yapı:** Controller, Route ve Model katmanları tamamen ayrılmıştır.
- **Paylaşımlı Servisler:** Önbellek (Cache) gibi servisler merkezi olarak yönetilir.

### ⚡ Yüksek Performans & Optimizasyon
- **In-Memory Caching:** Sık erişilen veriler (Ana sayfa, kategoriler) sunucu RAM'inde önbelleklenerek (TTL: 20dk) veritabanı yükü %90 oranında azaltılmıştır.
- **Veritabanı İndeksleme:** MongoDB üzerinde yapılan sorgular, özel indekslemeler (`category`, `published_dt`) ile milisaniyeler seviyesine indirilmiştir.

### 🛡️ Güvenlik (Security)
- **Rate Limiting:** `express-rate-limit` ile IP tabanlı hız sınırı (15 dakikada 100 istek) uygulanarak DDoS ve Brute Force saldırılarına karşı koruma sağlanmıştır.
- **Helmet:** HTTP başlıkları (Headers) `helmet` middleware ile güvenli hale getirilmiştir.
- **Özel 429 Sayfası:** Hız sınırına takılan kullanıcılar için estetik bir bilgilendirme sayfası tasarlanmıştır.

### 📱 Mobil Uyumlu (Responsive Design)
- **Modern UI/UX:** Masaüstü ve mobil cihazlarda kusursuz çalışan esnek ızgara (grid) yapısı.
- **Mobil Menü:** Küçük ekranlar için özel geliştirilmiş, animasyonlu "Hamburger Menü" navigasyonu.

### 📈 SEO ve Meta Yönetimi
- **Dinamik SEO:** Her haber ve kategori sayfası için özelleştirilmiş Dinamik `<title>` ve `<meta description>` etiketleri ile arama motoru optimizasyonu sağlanmıştır.

### 📊 Sistem Durum Paneli (Admin Dashboard)
- `/status` adresi üzerinden erişilebilen, sistemin anlık sağlık durumunu gösteren panel:
    - **Sunucu İstatistikleri:** RAM kullanımı (Progress bar ile), Uptime süresi.
    - **Cache Durumu:** Hit/Miss oranları ve aktif anahtar sayıları.

---

## 🛠️ Teknolojiler

*   **Backend:** Node.js, Express.js
*   **Veritabanı:** MongoDB (Mongoose ODM)
*   **Template Engine:** EJS (Embedded JavaScript)
*   **Frontend:** Vanilla CSS (Responsive Grid System), Vanilla JS
*   **Diğer:** Node-Cache, Helmet, Compression, Dotenv

---

## 📂 Proje Yapısı

```
malumath/
├── config/             # Veritabanı bağlantı ayarları
├── controllers/        # İş mantığı (News, Status vb.)
├── models/             # Veritabanı şemaları (News Model)
├── public/             # Statik dosyalar (CSS, JS, Images)
├── routes/             # URL yönlendirmeleri
├── services/           # Yardımcı servisler (Cache Service)
├── views/              # EJS şablonları
│   ├── layouts/        # Ana sayfa düzeni (main.ejs)
│   ├── partials/       # Parça şablonlar (header, footer)
│   └── ...             # Sayfa görünümleri (home, category, status)
├── app.js              # Ana uygulama dosyası
└── package.json        # Proje bağımlılıkları
```

