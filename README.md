# Gridly – Authentication & Dashboard

A full-stack scalable web application with authentication and a protected dashboard.  
The project demonstrates modern frontend practices, secure backend integration, and clean architecture designed for scalability.

## Tech Stack

### Frontend
- React.js
- TypeScript
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt (password hashing)


## API Documentation

### Auth APIs
POST /api/auth/signup  
POST /api/auth/login  

### User APIs
GET /api/user/profile  
PUT /api/user/profile  

### Task APIs (Protected)
GET /api/tasks  
POST /api/tasks  
PUT /api/tasks/:id  
DELETE /api/tasks/:id  

### Authentication
- JWT-based authentication
- Pass token in headers:
Authorization: Bearer <token>

## Backend
- cd server
- npm i
- npm run dev

## Frontend
- cd client
- npm i
- npm run dev

## Frontend runs on:  http://localhost:5173

## Backend runs on:  http://localhost:5000

## Scalability & Production Considerations

- Frontend and backend are decoupled, allowing independent scaling
- Axios instance with interceptors centralizes API communication
- JWT authentication enables stateless backend scaling
- Modular folder structure (routes, controllers, middleware)
- User-task relationship ensures multi-user scalability
- MongoDB schema is designed to support large datasets
- In production, tokens can be stored in HttpOnly cookies
- Backend can be containerized using Docker
- Application can be deployed behind a load balancer