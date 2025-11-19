# Chemical Equipment Parameter Visualizer (Hybrid Web + Desktop)

This is a full-stack, hybrid application built for an intern screening task. It allows users to upload a CSV file of chemical equipment data, which is then analyzed by a Django backend and visualized on both a React web application and a PyQt5 desktop application.

## 🚀 Features

* **Hybrid Application:** Single Django backend serves both a web (React) and desktop (PyQt5) client.
* **CSV Upload & Analysis:** Users can upload a `.csv` file for data parsing and analysis using Pandas.
* **Data Visualization:** Displays summary statistics (counts, averages) and charts (equipment distribution).
* **Secure Authentication:** All API endpoints are secured. Users must log in via JWT (JSON Web Tokens) to access the application.
* **Upload History:** The backend stores the last 5 upload summaries, which can be viewed on both clients.
* **PDF Report Generation:** Users can download a PDF summary for any historical upload.
* **Modern UI:**
    * **Web:** Built with Material-UI (MUI) for a clean, responsive design.
    * **Desktop:** Styled with `qt-material` for a modern, themed look.

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Backend** | Python, Django, Django REST Framework | Common backend API |
| **Authentication** | djangorestframework-simplejwt | JWT Token Authentication |
| **Frontend (Web)** | React.js, Material-UI (MUI), Chart.js, Axios | Web client UI & charts |
| **Frontend (Desktop)** | PyQt5, qt-material, Matplotlib, Requests | Desktop client UI & charts |
| **Data Handling** | Pandas | Reading CSV & analytics |
| **PDF Generation** | ReportLab | Creating PDF reports |
| **Database** | SQLite | Store last 5 uploaded datasets |
| **Version Control** | Git & GitHub | Collaboration & submission |

---

## ⚙️ Setup and Installation

### 1. Backend (`backend/`)

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Create and activate a virtual environment:
    ```bash
    # Use py launcher (which we fixed!)
    py -m venv venv
    venv\Scripts\activate
    ```
3.  Install the required packages:
    ```bash
    pip install -r requirements.txt
    ```
4.  Run database migrations:
    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```
5.  Create a user to log in with:
    ```bash
    python manage.py createsuperuser
    ```
6.  Run the backend server:
    ```bash
    python manage.py runserver
    ```
    The backend is now running at `http://127.0.0.1:8000`.

### 2. Frontend - Web (`frontend-web/`)

1.  Navigate to the web frontend directory in a **new terminal**:
    ```bash
    cd frontend-web
    ```
2.  Install all node modules:
    ```bash
    npm install
    ```
3.  Run the React development server:
    ```bash
    npm start
    ```
    The web app is now running at `http://localhost:3000`.

### 3. Frontend - Desktop (`frontend-desktop/`)

1.  Navigate to the desktop frontend directory in a **new terminal**:
    ```bash
    cd frontend-desktop
    ```
2.  Create and activate a virtual environment:
    ```bash
    py -m venv venv
    venv\Scripts\activate
    ```
3.  Install the required packages:
    ```bash
    pip install -r requirements.txt
    ```
4.  Run the desktop application:
    ```bash
    python main_app.py
    ```
    The desktop application window will open.
    USER NAME : admin
    password : 12345
    
