# 🚀 TaskMaster - Full Stack MERN Application

TaskMaster is a modern, scalable task management application built to demonstrate full-stack development capabilities. It features secure JWT authentication, a responsive glassmorphism UI, and real-time database interactions.

**Live Demo:** [(https://taskmaster-intern-task-n79s.vercel.app/)]

## ✨ Features

- **🔐 Secure Authentication:** User registration and login using JWT (JSON Web Tokens) and bcrypt password hashing.
- **📝 CRUD Operations:** Create, Read, Update, and Delete tasks in real-time.
- **🔍 Smart Filtering:** Search tasks instantly and filter by status (Pending/Completed).
- **🎨 Modern UI:** Built with React + Tailwind CSS, featuring glassmorphism effects, stats dashboards, and smooth transitions.
- **📱 Responsive:** Fully optimized for desktop and mobile devices.

## 🛠️ Tech Stack

### Frontend

- **React.js (Vite):** For a fast, reactive user interface.
- **Tailwind CSS:** For modern, utility-first styling.
- **Axios:** For efficient API communication.
- **React Router DOM:** For seamless client-side navigation.
- **React Hot Toast:** For professional notification popups.

### Backend

- **Node.js & Express:** Robust REST API architecture.
- **MongoDB Atlas:** Cloud-based NoSQL database for scalability.
- **Mongoose:** ODM for data modeling and validation.
- **Cors:** Cross-Origin Resource Sharing handling.
- **Dotenv:** Environment variable management.

## 🚀 Scaling & Production Architecture

To ensure this application handles production-level traffic, the following strategies were implemented:

1.  **Stateless Authentication:** Using JWT allows the backend to be stateless, meaning we can horizontally scale the server instances without worrying about session affinity.
2.  **Database Indexing:** MongoDB schemas are designed for quick lookups on User IDs.
3.  **Frontend Optimization:** The React app is bundled using Vite for minimal load times and deployed on Vercel's Edge Network.
4.  **Environment Security:** All sensitive keys (Mongo URI, JWT Secrets) are strictly managed via environment variables and never exposed in the codebase.

## 📦 Local Setup Guide

1.  **Clone the Repository**

    ```bash
    git clone [https://github.com/YOUR_USERNAME/taskmaster-intern-task.git](https://github.com/YOUR_USERNAME/taskmaster-intern-task.git)
    cd taskmaster-intern-task
    ```

2.  **Setup Backend**

    ```bash
    cd server
    npm install
    # Create a .env file with: MONGO_URI, JWT_SECRET, PORT=5000
    npm run dev
    ```

3.  **Setup Frontend**
    ```bash
    cd client
    npm install
    npm run dev
    ```

---

_Built by Swaroop B._
