# ✈️ SkyRoute – Production-Ready Node.js Backend Template

SkyRoute is a scalable and production-structured Node.js backend starter template built with clean architecture principles and best practices in mind.

This project is designed to serve as a strong foundation for REST APIs, microservices, and large-scale backend systems.

---

## 🚀 Key Features

- Clean layered architecture
- Separation of concerns
- Centralized configuration management
- Scalable folder structure
- Middleware support
- Production-oriented setup
- Easy to extend and maintain

---

## 📁 Project Structure


---

## 📂 Folder Responsibilities

### `src/`
Contains all application source code.  
Testing files should be placed in a separate `tests/` directory at the project root.

---

### `config/`
Handles centralized configuration.

- `config.ts` → Environment variables and server configuration
- `logger.ts` → Logging configuration

---

### `controllers/`
Responsible for handling incoming HTTP requests and returning responses.

Controllers:
- Should not contain business logic
- Should delegate logic to services

---

### `services/`
Contains core business logic.

Responsibilities:
- Process application rules
- Coordinate between controllers and repositories
- Perform validations and transformations

---

### `repositories/`
Handles database interactions.

Responsibilities:
- Execute queries
- Abstract persistence layer
- Isolate database logic from business logic

---

### `routes/`
Defines API endpoints and maps them to controllers.

---

### `middlewares/`
Reusable middleware components such as:

- Authentication
- Authorization
- Error handling
- Logging
- Request validation

---

### `utils/`
Shared helper utilities such as:

- Custom error classes
- Response formatters
- Common reusable functions

---

### `index.ts`
Application entry point.

Responsible for:
- Bootstrapping the server
- Registering middleware
- Mounting routes
- Starting the HTTP server

---

## 🧠 Architecture Flow
