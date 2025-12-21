AuthNest – Backend

AuthNest is a scalable authentication and authorization backend built using Node.js, Express, MongoDB, Redis, and Docker. 
The project follows production-ready practices such as containerization, secure CORS configuration, and clean architecture.

Features
- Backend authentication system (JWT based – upcoming)
- MongoDB for persistent data storage
- Redis for caching and session/token management
- Secure CORS setup for frontend communication
- Fully Dockerized backend (no local Node, Mongo, or Redis required)
- Clean and scalable folder structure
- Health and status APIs

Tech Stack
- Node.js
- Express.js
- MongoDB
- Redis
- Docker & Docker Compose

Project Structure
backend/
 ├─ src/
 │   ├─ config/
 │   │   ├─ db.js
 │   │   └─ redis.js
 │   ├─ routes/
 │   ├─ controllers/
 │   ├─ services/
 │   ├─ app.js
 │   └─ server.js
 ├─ Dockerfile
 ├─ docker-compose.yml
 ├─ package.json
 └─ README.md

Environment Variables
Create a .env file inside backend folder:

PORT=5000
MONGO_URI=mongodb://mongo:27017/authnest
REDIS_URL=redis://redis:6379

Running the Project (Docker Only)

docker-compose up --build

Backend URL
http://localhost:5000

API Endpoints

GET /status
Response:
{ "message": "Backend is working!" }

CORS Configuration
Allowed origin:
http://localhost:8080

Design Decisions
- Docker-first architecture for consistent environments
- Redis and MongoDB run as separate containers
- Strict CORS configuration instead of wildcard
- Environment-based configuration

Upcoming Features
- User Signup and Login
- JWT Access and Refresh Tokens
- Role-Based Access Control
- Rate Limiting with Redis
- Logout and token blacklisting

Author
Mayank Rai
Backend Engineer (Node.js | MongoDB | Redis)

License
MIT
