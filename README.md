# 📝 Task Manager API

RESTful API sederhana untuk mengelola daftar tugas harian (to-do list), dibuat menggunakan **Node.js** dan **Hapi.js** framework, dengan database **SQLite**.

---

## 🚀 Fitur

- ✅ CRUD Users
- ✅ CRUD Tasks
- ✅ Filter task berdasarkan `status`
- ✅ Lihat semua task berdasarkan `user_id`
- ✅ Validasi data menggunakan Joi
- ✅ Response formatter standar (`success`, `fail`, `error`)
- ✅ Penanganan 404 endpoint tidak ditemukan
- ✅ Cek apakah user benar-benar ada sebelum mengambil task miliknya

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
git clone https://github.com/saabet/simple-task-manager.git
cd simple-task-manager

npm install
node server.js
```

---

## ⚙️ Struktur Folder

```bash
.
├── db/
│   └── database.js
├── handlers/
│   ├── usersHandler.js
│   └── tasksHandler.js
├── routes/
│   ├── usersRoutes.js
│   └── tasksRoutes.js
├── validations/
│   ├── userValidation.js
│   └── taskValidation.js
├── utils/
│   └── responseFormatter.js
├── .gitignore
├── README.md
└── server.js
```

---

## 📫 Endpoint API

🔹 User

- `POST /users` → Membuat user baru
- `GET /users/{id}` → Mengambil data user

🔹 Task

- `POST /tasks` → Menambah tugas
- `GET /tasks` → Melihat semua tugas
- `GET /tasks/{id}` → Melihat detail tugas
- `PUT /tasks/{id}` → Mengubah tugas
- `DELETE /tasks/{id}` → Menghapus tugas
- `GET /users/{id}/tasks` → Melihat tugas berdasarkan user
- `GET /tasks?status=done` → Memfilter tugas berdasarkan status

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
npm run lint
npm run format
```

## 📃 Lisensi

© 2025 Sabet Maulana
