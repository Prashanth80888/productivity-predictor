# 🚀 Student Productivity Predictor (ML + Full Stack)

A full-stack machine learning web application that predicts whether a student is **Focused or Distracted** based on daily habits like study hours, phone usage, sleep, and environment.

---

## 📌 Features

* 🧠 Custom Machine Learning Model (Logistic Regression from scratch)
* 📊 Real-time prediction via API
* 💡 Smart Suggestions (AI-like feedback)
* 📈 Interactive Charts (data visualization)
* 🎨 Modern UI (Vite + React + Tailwind CSS)
* 🌐 Fully deployed (Frontend + Backend)

---

## 🧠 Machine Learning

* Built **Logistic Regression from scratch** (no sklearn)
* Implemented:

  * Sigmoid function
  * Gradient descent
  * Weight updates
* Trained on **synthetic dataset (300+ records)**

---

## 🧱 Tech Stack

### 🔹 Frontend

* React (Vite)
* Tailwind CSS
* Axios
* Chart.js

### 🔹 Backend

* Python
* Flask
* Flask-CORS
* Gunicorn

### 🔹 Deployment

* Frontend: Vercel
* Backend: Render

---

## 📂 Project Structure

```
project-root/
│
├── backend/
│   ├── main.py
│   ├── student_productivity.csv
│   ├── requirements.txt
│   └── Procfile
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/Prashanth80888/productivity-predictor.git
cd your-repo-name
```

---

### 2️⃣ Backend Setup

```
cd backend
pip install -r requirements.txt
python main.py
```

Backend runs on:

```
http://127.0.0.1:5000
```

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🔗 API Endpoint

### POST `/predict`

#### Request:

```json
{
  "study_hours": 6,
  "phone_usage": 2,
  "sleep": 7,
  "breaks": 2,
  "noise": 0
}
```

#### Response:

```json
{
  "prediction": "Focused",
  "probability": 0.78,
  "suggestions": [
    "📱 Reduce phone usage",
    "😴 Improve sleep schedule"
  ]
}
```

---

## 📊 Sample Output

* Prediction: Focused / Distracted
* Confidence Score
* Smart Suggestions
* Data Visualization (Chart)

---

## 🌐 Deployment

* Frontend: https://productivity-predictor-lake.vercel.app/
* Backend: https://productivity-predictor-3-pow5.onrender.com/

---

## 💡 Future Improvements

* User authentication (login/signup)
* Store user history
* Mobile app version (React Native)
* Advanced ML models

---

## 👨‍💻 Author

Prashanth Gouda
GitHub: https://github.com/Prashanth80888
LinkedIn: (Add your link)

---

## ⭐ If you like this project

Give it a star ⭐ and share it!
