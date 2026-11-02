# 🛒 E-Commerce Web Application

A modern, fully responsive e-commerce web application built with **React.js, Vite, and Tailwind CSS**, featuring secure user authentication, product management, shopping cart, and seamless online payment integration.

---

## 🔗 Live Demo
- **Live Preview:** [View Live App](https://e-commerce-seven-eosin-51.vercel.app)[cite: 8]

---

## 🚀 Key Features

- **Secure Authentication & Authorization:** 
  - User sign-up, login, and multi-step password recovery.
  - Protected routes and **JWT Authentication**[cite: 3].
- **Product Browsing & Discovery:**
  - Advanced product filtering, categories, and brands browsing.
  - Detailed product views featuring interactive image sliders.
- **Cart & Order Management:**
  - Add, update, and remove items from the shopping cart with real-time state updates.
  - Global state management for user sessions and cart counters using **Context API**[cite: 3].
- **Checkout & Payment:**
  - Online payment checkout integration and order history tracking.
- **Performance & UX:**
  - Optimized data fetching and caching with **TanStack Query (React Query)**[cite: 3].
  - Form validation handled smoothly via **Formik & Yup**[cite: 3].
  - Toast notifications and loading skeletons for a seamless user experience.

---

## 🛠️ Tech Stack

- **Frontend Core:** React.js, Vite, JavaScript (ES6+)
- **Styling:** Tailwind CSS, Responsive Design
- **State & Data Fetching:** Context API, TanStack Query (React Query), Axios
- **Forms & Validation:** Formik, Yup
- **Authentication:** JWT (JSON Web Tokens)
- **Deployment:** Vercel

---

## 👤 Demo Credentials

You can use the following test account to explore authenticated features:
- **Email:** `demo@example.com`
- **Password:** `123456`

---

## 📂 Project Structure

```text
src/
├── components/   # Reusable UI components (Navbar, Footer, ProductCard, etc.)
├── context/      # Context providers (Auth, Cart state)
├── hooks/        # Custom data-fetching and utility hooks
├── pages/        # Application views (Home, Cart, Products, Login, Checkout)
├── services/     # API configuration and Axios endpoints
└── App.jsx       # Main application entry and routing
