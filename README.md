# 📊Global Insights Dashboard

A **full-stack MERN analytics dashboard** built to visualize, filter, and analyze global insights data using interactive charts, tables, and a modern Vuexy-inspired UI.  
This project was developed as part of an assignment to demonstrate practical usage of the **MERN stack**, authentication, data visualization, and clean UI/UX practices.

---

## 🧠 Problem Statement

Organizations often work with large volumes of unstructured or semi-structured data, which becomes difficult to analyze using raw tables alone.  
The goal of this project is to **convert a raw insights dataset into a meaningful, interactive analytics dashboard** that helps users understand trends, distributions, and key metrics at a glance.

---

## 🎯 Objectives

- Implement a **secure login system**
- Store and retrieve data from **MongoDB**
- Provide **interactive data visualization**
- Allow users to **filter insights dynamically**
- Build a **modern, responsive dashboard UI**
- Follow **real-world MERN stack architecture**

---

## 🛠️ Tech Stack

### Frontend
- **React (Vite)** – Fast and modern frontend framework
- **Axios** – HTTP client for API calls
- **Recharts** – Charts and graphs
- **CSS** – Custom styling (Vuexy-style layout)

### Backend
- **Node.js** – Runtime environment
- **Express.js** – Backend framework
- **MongoDB (Atlas)** – NoSQL database
- **Mongoose** – ODM for MongoDB
- **JWT (JSON Web Token)** – Authentication

---

## ✨ Features

### 🔐 Authentication
- Secure user login using JWT
- Token and user data stored in `localStorage`
- Dashboard access restricted to logged-in users
- Logout clears session and redirects to login

---

### 📊 Dashboard Analytics

#### KPI Cards
- **Total Insights**
- **Average Intensity**
- **Average Likelihood**
- **Average Relevance**

These give a quick summary of the dataset after filters are applied.

---

### 📈 Charts & Graphs
- **Insights by Year** – Line Chart
- **Top Topics Distribution** – Colored Pie Chart
- **Top Countries** – Bar Chart

All charts update dynamically based on applied filters.

---

### 🔍 Filters
- Filter data by:
  - **Year**
  - **Topic**
  - **Country**
- Filters affect:
  - KPI cards
  - Charts
  - Data table

---

### 📁 Data Table
- Displays filtered insights in tabular format
- Shows key fields:
  - Year
  - Topic
  - Country
  - Intensity
  - Likelihood
  - Relevance

---

### 📤 Export Feature
- Export currently filtered data as **CSV**
- Useful for reports and offline analysis

---

### 🎨 UI / UX
- Vuexy-inspired dashboard layout
- Collapsible sidebar
- Sidebar profile section (user name & avatar)
- Dark mode toggle
- Responsive design
- Clean and readable interface

---

## 📂 Project Structure

```text
blackcoffer-dashboard/
│
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── styles/
│   │   │   └── dashboard.css
│   │   └── App.jsx
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── data/
│   ├── server.js
│   └── .env
│
└── README.md


⚙️ Environment Setup

Backend Environment Variables
Create a .env file inside the server directory:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


▶️ How to Run the Project

1️⃣ Start Backend Server
cd server
npm install
npm run dev

Backend will run on:

http://localhost:5000
2️⃣ Start Frontend Client
cd client
npm install
npm run dev

Frontend will run on:
http://localhost:5173

🔑 Login Credentials
Use credentials available in your MongoDB users collection.
Example:
Email: test@example.com
Password: ********

🔐 Authentication Flow

User submits login credentials
Backend verifies credentials
JWT token and user info are returned
Frontend stores token & user in localStorage
Dashboard loads with user-specific data
Logout clears storage and returns to login
