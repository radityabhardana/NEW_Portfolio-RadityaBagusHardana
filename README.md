# Portofolio 3D — Raditya Bagus Hardana

Repositori situs portofolio pribadi **Raditya Bagus Hardana** (*Software Engineer* — Bogor, Indonesia). Dirancang dengan estetika editorial gelap (*Nocturne Ledger*) yang memadukan potret 3D interaktif berbasis WebGL, tipografi kontras tinggi, dan koreografi gulir halus lintas perangkat.

---

## Fitur Utama

- **Potret 3D Interaktif (`Three.js` & `Draco`)** — Model 3D kustom dengan pencahayaan HDRI, interaksi arah kursor/sentuhan, pembatasan *pixel ratio* (`≤ 2x`), serta penghentian *render loop* otomatis saat di luar layar agar ringan di perangkat seluler.
- **Koreografi Gulir Editorial (`GSAP`)** — Transisi antarbagian menggunakan `ScrollTrigger`, `ScrollSmoother`, dan `SplitText` yang dikalibrasi khusus untuk layar desktop maupun layar sentuh (`1:1`).
- **Arsip Sertifikat & *Lightbox*** — Pratinjau sertifikat beresolusi penuh tanpa pustaka modal tambahan, lengkap dengan dukungan navigasi papan ketik (`Esc` & penguncian fokus `Tab`).
- **Responsif di Semua Perangkat** — Tata letak adaptif mulai dari ponsel layar kecil (`360px`), tablet, laptop `14"`, hingga monitor desktop lebar.

---

## Teknologi

- **Antarmuka & Bahasa:** React 18, TypeScript, HTML5, CSS3 (`Fraunces`, `Space Grotesk`, `IBM Plex Mono`)
- **Grafika 3D & Animasi:** Three.js, `three-stdlib` (GLTFLoader & DRACOLoader), GSAP
- **Perangkat Pengembangan:** Vite, ESLint, Vercel Analytics

---

## Struktur Direktori

```text
├── public/
│   ├── certificate/                  # Gambar sertifikat & penghargaan
│   ├── draco/                        # Dekoder kompresi mesh 3D Draco
│   ├── models/                       # Model 3D (.glb) & pencahayaan (.hdr)
│   ├── project/                      # Pratinjau proyek portofolio (.webp)
│   ├── favicon.svg                   # Ikon monogram tab browser
│   └── Raditya-Bagus-Hardana-CV.pdf  # Dokumen CV resmi
└── src/
    ├── components/                   # Komponen bagian halaman & adegan 3D
    │   ├── Character/                # Inisialisasi WebGL, kamera, & cahaya
    │   ├── styles/                   # Stylesheet modular per komponen
    │   └── utils/                    # Utilitas koreografi GSAP & SplitText
    ├── context/                      # Pengelola status pemuatan aplikasi
    ├── App.tsx                       # Titik masuk komponen utama
    └── index.css                     # Variabel sistem desain Nocturne Ledger
```

---

## Menjalankan Secara Lokal

Pastikan **Node.js** (disarankan v18+) sudah terpasang:

```bash
# 1. Pasang dependensi
npm install

# 2. Jalankan server pengembangan (http://localhost:5173)
npm run dev

# 3. Periksa kualitas kode & kompilasi produksi
npm run lint
npm run build
```

---

## Kredit

Pondasi awal mekanisme gulir 3D diadaptasi dari proyek sumber terbuka karya [Moncy Yohannan](https://github.com/moncydev), kemudian dirancang ulang secara menyeluruh pada sistem visual, komponen, model 3D, dan struktur kontennya.

---

## Lisensi & Hak Cipta Aset

- **Kode Sumber (`src/`, konfigurasi proyek):** Dilisensikan di bawah **MIT License**.
- **Aset Pribadi (`public/models/`, `public/certificate/`, `public/project/`, `public/Raditya-Bagus-Hardana-CV.pdf`, serta identitas pribadi):** **Hak Cipta Dilindungi Penuh (*All Rights Reserved*)** milik Raditya Bagus Hardana — tidak diperkenankan menyalin, mendistribusikan ulang, atau menggunakan aset pribadi tersebut tanpa izin tertulis.

Lihat berkas [LICENSE](./LICENSE) untuk rincian lengkap.
