# 📝 Task Manager API

RESTful API sederhana untuk mengelola daftar tugas harian (to-do list), dibuat menggunakan **Node.js** dan **Hapi.js** framework, dengan database **SQLite**.

---

## 🚀 Fitur

- 🔐 Buat dan ambil data user
- ✅ Buat, baca, update, dan hapus tugas
- 🔍 Filter tugas berdasarkan status dan pengguna
- 📄 Validasi input dengan Joi
- 🎯 Mengikuti style guide Airbnb + Prettier

---

## 🛠️ Teknologi

- [Node.js](https://nodejs.org/)
- [Hapi.js](https://hapi.dev/)
- [SQLite](https://www.sqlite.org/)
- [Joi](https://joi.dev/)
- [ESLint Airbnb Base](https://github.com/airbnb/javascript)
- [Prettier](https://prettier.io/)

---

## 📦 Instalasi

```bash
git clone [https://github.com/saabet/simple-task-manager.git]
cd simple-task-manager

npm install
node server.js
```

---

## ⚙️ Struktur Folder

```bash
.
├── db/              # Koneksi dan setup database SQLite
├── handlers/        # Logic untuk endpoint users & tasks
├── models/          # SQL schema
├── routes/          # Definisi endpoint Hapi.js
├── validations/     # Validasi input menggunakan Joi
├── utils/           # Helper function (optional)
├── .eslintrc        # Aturan linting (Airbnb + Prettier)
├── .prettierrc      # Aturan format kode
├── server.js        # Entry point server
```

---

## 📫 Endpoint Utama

🔹 User
  * `POST /users` → Buat user
  * `GET /users/{id}` → Ambil data user

🔹 Task
  * `POST /tasks` → Tambah tugas
  * `GET /tasks` → Lihat semua tugas
  * `GET /tasks/{id}` → Lihat detail tugas
  * `PUT /tasks/{id}` → Ubah tugas
  * `DELETE /tasks/{id}` → Hapus tugas
  * `GET /users/{id}/tasks` → Lihat tugas berdasarkan user
  * `GET /tasks?status=done` → Filter berdasarkan status

---

## ✅ Contoh Request

### 📤 POST /tasks

```json
{
  "title": "Belajar Hapi.js",
  "description": "Mengerjakan backend task manager",
  "due_date": "2025-07-01",
  "user_id": 1
}

```

## 🧪 Linting & Formatting

```bash
npm run lint       # Cek masalah
npm run lint:fix   # Perbaiki otomatis
npm run format     # Format semua file pakai Prettier
```

## 📃 Lisensi
MIT © 2025 Sabet Maulana
