# 📝 DeepDraft — Full-Stack Blog Application

DeepDraft is a full-stack blog application built using **Spring Boot**, **React**, and **MySQL**.  
It follows a clean layered architecture with **DTO (Data Transfer Object) based APIs** and **JPA/Hibernate** for persistence, where database tables are **automatically generated at runtime**. Users only need to create the database — no manual table creation is required.

The application runs locally on **localhost** and demonstrates real-world full-stack development practices suitable for production-grade systems.

---

## 🚀 Tech Stack

### Backend
- Java 17+
- Spring Boot
- Spring Web
- Spring Data JPA (Hibernate)
- DTO Pattern (Entity ↔ DTO mapping)
- MySQL
- Maven

### Frontend
- React
- Axios
- React Router
- Bootstrap / Custom CSS

### Database
- MySQL 8+
- Automatic table generation via JPA (`ddl-auto`)

---

## ✨ Features

- Create, read, update, and delete blog posts
- DTO-based request and response handling
- Automatic database table creation using Hibernate
- RESTful API design
- Clean separation of concerns (Controller → Service → Repository)
- React frontend integrated with Spring Boot backend

---

## ⚙️ Prerequisites

Ensure the following are installed on your system:

- Java 17 or higher
- Maven
- Node.js (v18+ recommended)
- MySQL Server
- Git

---

## 🛠️ Backend Setup (Spring Boot)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Pragati2303/DeepDraft-Blog.git

