# Product Management System

A full-stack Product Management System built using **Angular 22**, **Node.js**, **Express.js**, **PostgreSQL**, and **Sequelize ORM**.

The application provides secure user authentication, category management, product management with image upload, dashboard analytics, and Excel export functionality.

---

# Features

## Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Logout

## Dashboard

* Total Products
* Total Categories
* Total Inventory Value
* Latest Products
* Dynamic Dashboard Cards

## Category Management

* Create Category
* Update Category
* Delete Category
* View Categories

## Product Management

* Create Product
* Update Product
* Delete Product
* Upload Product Image
* Product Listing
* Category Mapping

## Export

* Export Products to Excel (.xlsx)

---

# Technology Stack

## Frontend

* Angular 22
* Angular Material
* Bootstrap 5
* Bootstrap Icons
* Reactive Forms
* HttpClient
* SweetAlert2

## Backend

* Node.js
* Express.js
* Sequelize ORM
* JWT Authentication
* Multer
* XLSX

## Database

* PostgreSQL

---

# Project Structure

Backend

```
Backend
│
├── config
├── controllers
├── middleware
├── models
├── routes
├── services
├── uploads
├── app.js
└── package.json
```

Frontend

```
Frontend
│
├── src
│   ├── app
│   │   ├── pages
│   │   ├── services
│   │   ├── guards
│   │   ├── layout
│   │   └── shared
│   └── assets
└── package.json
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
```

---

## Backend

```bash
cd Backend

npm install

npm run dev
```

---

## Frontend

```bash
cd Frontend

npm install

ng serve
```

---

# Environment Variables

Create a `.env` file inside Backend.

```
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=ProductManagement
DB_USER=postgres
DB_PASSWORD=********

JWT_SECRET=********
```

---

# API Endpoints

Authentication

```
POST /api/auth/register

POST /api/auth/login
```

Categories

```
GET /api/categories

POST /api/categories

PUT /api/categories/:id

DELETE /api/categories/:id
```

Products

```
GET /api/products

POST /api/products

PUT /api/products/:id

DELETE /api/products/:id
```

Dashboard

```
GET /api/dashboard
```

Export

```
GET /api/products/export/excel
```

---

# Security

* JWT Authentication
* Password Hashing using Bcrypt
* Protected APIs
* Route Guard in Angular
* Input Validation

---

# Future Enhancements

* Product Search
* Pagination
* Product Filtering
* Role-Based Authentication
* Dashboard Charts
* Dark Theme
* Docker Deployment
* CI/CD Pipeline

---

# Author

**Ketankumar Singh**

Assistant Manager – Software Developer

ASP.NET | .NET Core | Angular | Node.js | SQL Server | PostgreSQL | C# | JavaScript | REST APIs
