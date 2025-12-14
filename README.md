# 📚 Study & Project Tracker

A modern **Personal Study & Project Tracker** built with **React** to help students manage coursework, projects, and deadlines in one interactive dashboard.

> Designed for university students who handle multiple subjects and projects simultaneously.

---

## ✨ Features

- 🗂 **Kanban Board**
  - Backlog, In Progress, Done
  - Drag & Drop antar kolom (DnD Kit)

- ⏰ **Smart Deadline Sorting**
  - Deadline terdekat otomatis di atas
  - Tugas tanpa deadline di bawah
  - Priority-aware (High → Med → Low)

- ✏️ **Inline Task Editing**
  - Edit judul, project, deadline, dan prioritas langsung di kartu

- 🔍 **Search & Filter**
  - Cari tugas berdasarkan judul / project
  - Filter berdasarkan mata kuliah / project

- 💾 **Persistent Storage**
  - Data otomatis tersimpan di `localStorage`
  - Tidak hilang saat refresh browser

- 🎨 **Interactive UI**
  - Glow card effect
  - Animated Lightning background (ReactBits / WebGL)
  - Smooth micro-interactions

---

## 🖼 Preview

> (Tambahkan screenshot di sini kalau mau)

```text
Backlog | In Progress | Done

🛠 Tech Stack
Technology
Description
⚛️ React
UI framework
⚡ Vite
Fast build tool
🎨 Tailwind CSS
Styling
🧲 @dnd-kit
Drag & Drop
🌩 ReactBits Lightning
Animated WebGL background
💾 LocalStorage
Persistent data

📂 Project Structure
src/
├─ components/
│  ├─ backgrounds/
│  │  ├─ Lightning.jsx
│  │  ├─ LightningBG.jsx
│  │  └─ Lightning.css
│  ├─ BoardColumn.jsx
│  ├─ TaskCard.jsx
│  ├─ TaskForm.jsx
│  ├─ Filters.jsx
│  ├─ Stats.jsx
│  └─ GlowCard.jsx
├─ hooks/
│  └─ useLocalStorage.js
├─ data/
│  └─ seed.js
├─ App.jsx
└─ main.jsx


🚀 Getting Started
1️⃣ Clone Repository
git clone https://github.com/CaesarAidarus22/study-project-tracker.git
cd study-project-tracker

2️⃣ Install Dependencies
npm install

3️⃣ Run Development Server
npm run dev

App akan berjalan di:
http://localhost:5173


🎯 Use Case
	•	📖 Mahasiswa dengan banyak mata kuliah
	•	💻 Project-based learning
	•	📅 Manajemen deadline UAS / tugas besar
	•	🧠 Personal productivity dashboard

⸻

📌 Future Improvements
	•	🌙 Dark / Light Mode toggle
	•	🔔 Deadline notification
	•	📊 Analytics per mata kuliah
	•	☁️ Cloud sync (Firebase / Supabase)
	•	📱 Mobile responsive optimization

⸻

👤 Author

Caesar Aidarus
Informatics Student
Universitas Syiah Kuala

📌 GitHub:
https://github.com/CaesarAidarus22


⭐ Appreciation

If you find this project useful, feel free to ⭐ the repository!

Built with ❤️ and a lot of deadlines 😄
---

## ✅ Cara Pakai
1. Buka file `README.md` di project kamu
2. **Replace isinya** dengan teks di atas
3. Commit & push:

```bash
git add README.md
git commit -m "docs: add project README"
git push