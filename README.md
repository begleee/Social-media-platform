# Fullstack Social Media Platform

A feature-rich, full-stack social media application built with a modern React frontend and a Node.js/Express backend powered by Prisma ORM and PostgreSQL.

---

## Tech Stack

### Frontend (`/client`)
* **Framework:** React 19 + Vite
* **Routing:** React Router v7
* **State Management:** Zustand & TanStack Query (React Query v5)
* **Styling & UI:** Tailwind CSS v4, Base UI, Shadcn UI, Embla Carousel, Lucide React
* **Form Handling:** React Hook Form
* **HTTP Client:** Axios

### Backend (`/server`)
* **Runtime & Framework:** Node.js, Express v5
* **Database & ORM:** PostgreSQL, Prisma ORM (with `@prisma/adapter-pg`)
* **Authentication & Security:** JSON Web Tokens (JWT), bcryptjs, Cookie Parser, CORS
* **File Uploads & Media:** Multer, Cloudinary
* **Mailing:** Nodemailer
* **Language & Dev Tools:** TypeScript, `tsx`, Nodemon

---

## Key Features

* **Authentication & Authorization:** Secure user registration, password hashing (`bcryptjs`), and JWT-based authentication delivered via cookies.
* **Media Management:** File uploading with Multer integrated with Cloudinary for scalable image and asset storage.
* **Email Notifications:** Automated emails (e.g., account verification, password resets) using Nodemailer.
* **Dynamic Feed & UI:** Responsive client interface with carousel components (Embla Carousel), custom utility styling, and optimistic UI updates via TanStack Query.
* **Database & Schema Management:** Type-safe database queries using Prisma client connected to a PostgreSQL database.

---

## Getting Started

### Prerequisites
* **Node.js** (v18 or higher recommended)
* **PostgreSQL** database instance
* **Cloudinary Account** (for media hosting)

---

### Environment Setup

#### Server `.env`
Create a `.env` file in the `server` directory:

```env
PORT=5000
DATABASE_URL="postgresql://username:password@localhost:5432/social_media_db"

JWT_SECRET=your_jwt_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_password

