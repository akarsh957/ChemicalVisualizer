
# 🧪 Chemical Data Visualizer

An interactive full-stack web application for processing, analyzing, and visualizing structured chemical datasets. The platform enables users to explore chemical data insights through dynamic dashboards and automated PDF report generation.

---

## 🚀 Features

* 📊 Interactive React-based dashboard
* 🔍 Dynamic data filtering and visualization
* 📈 Statistical computations (mean, distribution, aggregation)
* 🔗 RESTful API integration (Django backend)
* 🗄️ MongoDB database integration
* 📄 Automated PDF report generation using ReportLab
* ⚡ Modular and scalable backend architecture

---

## 🏗️ Tech Stack

### Frontend

* React.js
* JavaScript (ES6+)
* HTML5 / CSS3

### Backend

* Python
* Django (REST APIs)
* Pandas (Data Processing)
* ReportLab (PDF Generation)

### Database

* MongoDB

---

## 📂 Project Structure

```
ChemicalVisualizer/
│
├── frontend/        # React frontend
├── backend/         # Django backend APIs
├── datasets/        # Sample chemical datasets
├── reports/         # Generated PDF reports
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/akarsh957/ChemicalVisualizer.git
cd ChemicalVisualizer
```

---

### 2️⃣ Backend Setup

```bash
cd backend
pip install -r requirements.txt
python manage.py runserver
```

Make sure MongoDB is running locally.

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

The application will run on:

```
Frontend: http://localhost:3000
Backend:  http://localhost:8000
```

---

## 🔄 API Overview

| Method | Endpoint    | Description                      |
| ------ | ----------- | -------------------------------- |
| GET    | /api/data   | Fetch processed dataset          |
| POST   | /api/upload | Upload dataset                   |
| GET    | /api/report | Generate and download PDF report |

---

## 📊 How It Works

1. User uploads a chemical dataset.
2. Backend processes data using Pandas.
3. Statistical metrics are computed.
4. Processed data is served via REST APIs.
5. Frontend renders visual insights dynamically.
6. Users can export results as a PDF report.

---

## 🔐 Future Improvements

* Authentication system
* Cloud deployment (Azure / AWS)
* Advanced data visualizations (Chart.js / D3)
* Role-based access control
* Docker containerization

---

## 👨‍💻 Author

**Akarsh Mishra**
GitHub: [https://github.com/akarsh957](https://github.com/akarsh957)
LinkedIn: [https://linkedin.com/in/akarshmishra](https://linkedin.com/in/akarshmishra)


