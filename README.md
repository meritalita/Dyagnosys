# Dyagnosys 

## Deskripsi
Dyagnosys adalah aplikasi prediksi risiko penyakit kronis seperti diabetes dan jantung. Dengan pendekatan berbasis data dan antarmuka yang ramah pengguna, pengguna dapat melakukan dyagnosys mandiri, memantau kesehatan, serta mendapatkan rekomendasi gaya hidup sehat.

## Scripts
- `npm run build` – Mengompilasi aplikasi untuk produksi menggunakan Webpack.
- `npm run start-dev` – Menjalankan server pengembangan dengan Webpack Dev Server.
- `npm run serve` – Menyajikan build produksi melalui server statis.
- `npm run prettier` – Mengecek format kode sesuai standar Prettier.
- `npm run prettier:write` – Memperbaiki dan memformat ulang kode secara otomatis.

## Struktur Proyek
dyagnosys
├── package.json              # Informasi dependensi dan script npm
├── package-lock.json         # File lock untuk memastikan versi dependensi tetap
├── README.md                 # Dokumentasi utama proyek
├── webpack.common.js         # Konfigurasi umum Webpack
├── webpack.dev.js            # Konfigurasi Webpack untuk pengembangan
├── webpack.prod.js           # Konfigurasi Webpack untuk produksi
└── src                       # Folder utama berisi seluruh sumber daya proyek
    ├── index.html            # Berkas HTML utama aplikasi
    ├── public                # Aset publik aplikasi
    │   ├── images            # Gambar-gambar yang digunakan
    │   ├── model_diabetes_tfjs   # Model TensorFlow.js untuk deteksi diabetes
    │   └── model_HearRisk_tfjs   # Model TensorFlow.js untuk deteksi risiko jantung
    ├── scripts               # Kode JavaScript inti aplikasi
    │   ├── data              # Pengelolaan API dan data eksternal
    │   ├── pages             # Halaman-halaman utama aplikasi
    │   ├── routes            # Konfigurasi dan handler routing
    │   ├── utils             # Fungsi-fungsi pembantu (helper)
    │   ├── templates.js      # Template HTML yang dirender secara dinamis
    │   ├── config.js         # Konfigurasi global aplikasi
    │   ├── sw.js             # Service Worker untuk push notification & caching
    │   └── index.js          # Entry point aplikasi
    └── styles                # Berkas stylesheet
        ├── responsives.css   # CSS untuk tampilan responsif
        └── styles.css        # Gaya visual utama aplikasi
