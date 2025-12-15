# 📚 Study & Project Tracker

> Kelola tugas kuliah dan project pribadi dalam satu dashboard interaktif.

**Study & Project Tracker** adalah aplikasi web berbasis React yang membantu mahasiswa mengatur tugas kuliah, project, dan deadline dengan tampilan modern, interaktif, dan responsif.

Aplikasi ini **100% frontend**, tanpa backend, dan menyimpan data langsung di browser menggunakan **localStorage**.

---

## ✨ Fitur Utama

- 🗂️ **Kanban Board** (Backlog • In Progress • Done)
- ⏰ **Sorting otomatis berdasarkan deadline terdekat**
- 🔍 **Search & Filter berdasarkan project**
- 📝 **Tambah, edit, dan hapus task**
- 🎯 **Prioritas task** (Low • Medium • High)
- 🖱️ **Drag & Drop antar kolom**
- 📊 **Statistik task**
- 💾 **Auto-save ke localStorage**
- 🌌 **Animated Background (ReactBits GridScan)**
- 💡 **Glow Card + efek interaktif**

---

## 🎨 Tampilan

- UI modern dengan **dark theme**
- Animated **GridScan background**
- Glow card yang responsif terhadap interaksi
- Smooth animation (ringan & tidak berat)

---

## 🛠️ Tech Stack

| Teknologi | Digunakan untuk |
|---------|----------------|
| **React + Vite** | Frontend framework |
| **Tailwind CSS** | Styling |
| **@dnd-kit** | Drag & Drop |
| **ReactBits** | Animated background |
| **LocalStorage** | Penyimpanan data |
| **Vercel** | Deployment |

---

## 🚀 Live Demo

🔗 **Live Website:**  
👉 https://study-project-tracker.vercel.app  
*(ganti dengan URL Vercel kamu kalau beda)*

---

## 🧠 Cara Kerja Aplikasi

- Semua data task disimpan di **browser pengguna**
- Tidak ada akun / login
- Setiap pengguna punya data masing-masing
- Refresh halaman **tidak menghapus data**
- Data hanya hilang jika:
  - Clear browser data
  - Pakai incognito
  - Buka dari device lain

---

## 🧑‍💻 Cara Menjalankan Secara Lokal

```bash
# Clone repository
git clone https://github.com/CaesarAidarus22/study-project-tracker.git

# Masuk ke folder
cd study-project-tracker

# Install dependencies
npm install

# Jalankan development server
npm run dev


## Struktur Folder
src/
├── components/
│   ├── backgrounds/
│   │   └── GridScanBG.jsx
│   ├── BoardColumn.jsx
│   ├── TaskCard.jsx
│   ├── TaskForm.jsx
│   ├── Filters.jsx
│   ├── Stats.jsx
│   └── Header.jsx
├── hooks/
│   └── useLocalStorage.js
├── data/
│   └── seed.js
├── App.jsx
└── main.jsx

❓ FAQ

Apakah aplikasi ini butuh backend?

❌ Tidak.
Aplikasi ini sepenuhnya frontend dan menggunakan localStorage.

Apakah data bisa dibagikan ke orang lain?

❌ Tidak secara otomatis.
Setiap pengguna punya data sendiri di browser masing-masing.

Apakah aman?

✔️ Aman untuk penggunaan pribadi dan tugas kuliah.
❗ Tidak disarankan untuk data sensitif.

⸻

📌 Cocok Digunakan Untuk
	•	Mahasiswa Informatika
	•	Project pribadi
	•	Tugas kuliah
	•	Personal productivity
	•	Showcase portfolio frontend

⸻

👤 Author

Caesar Aidarus
Mahasiswa Informatika
Universitas Syiah Kuala