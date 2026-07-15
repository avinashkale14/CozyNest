# 🏡 CozyNest

A modern full-stack accommodation listing web application built with Node.js, Express.js, MongoDB, and EJS. CozyNest allows users to explore destinations, create and manage property listings, upload images, and share reviews through a secure authentication system.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)

---


## 📸 Preview

> **Add screenshots here after deployment**

| Home Page | Listing Details |
|-----------|-----------------|
| ![Home](screenshots/home.png) | ![Listing](screenshots/listing.png) |

| Login | Add Listing |
|-------|-------------|
| ![Login](screenshots/login.png) | ![New Listing](screenshots/new-listing.png) |

---

# ✨ Features

- 🔐 Secure User Authentication (Signup/Login)
- 🏠 Create, Edit & Delete Listings
- 🖼️ Image Upload using Cloudinary
- ⭐ Add & Delete Reviews
- 📍 Interactive Maps using Mapbox
- ⚡ Flash Messages & Validation
- 📂 MVC Architecture
- ☁️ MongoDB Atlas Database
- 📱 Responsive Design (Work in Progress)

---

# 🛠️ Tech Stack

### Frontend

- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- EJS

### Backend

- Node.js
- Express.js

### Database

- MongoDB Atlas
- Mongoose

### Authentication

- Passport.js
- Express Session

### Cloud Services

- Cloudinary
- Mapbox

---

# 📁 Project Structure

```
CozyNest
│
├── controllers/
├── init/
├── models/
├── public/
│   ├── css/
│   ├── images/
│   └── js/
├── routes/
├── utils/
├── views/
│   ├── includes/
│   ├── layouts/
│   ├── listings/
│   └── users/
│
├── app.js
├── middleware.js
├── schema.js
├── cloudConfig.js
├── package.json
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/avinashkale14/CozyNest.git
```

## Move into Project

```bash
cd CozyNest
```

## Install Dependencies

```bash
npm install
```

## Create a `.env` File

```env
DB_URL=your_mongodb_connection_string
SECRET=your_secret_key

CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

MAP_TOKEN=your_mapbox_token
```

## Run the Application

```bash
node app.js
```

Open your browser:

```
http://localhost:8080/listings
```

---

# 📦 NPM Packages Used

- express
- mongoose
- ejs
- ejs-mate
- passport
- passport-local
- passport-local-mongoose
- express-session
- connect-flash
- method-override
- multer
- multer-storage-cloudinary
- cloudinary
- joi
- mapbox-gl
- dotenv

---

# 🚀 Future Enhancements

- Mobile Responsive UI
- Search & Advanced Filters
- Wishlist
- Booking System
- Payment Gateway
- User Profile
- Admin Dashboard
- Notifications

---

# 👨‍💻 Developed By

**Avinash Kale**

- GitHub: https://github.com/avinashkale14

---

# ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub.
