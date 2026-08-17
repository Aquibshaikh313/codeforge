# CodeForge

A coding practice platform I'm building from scratch to learn and apply real-world software engineering.

## Current Status

🚧 In Development

## What I'm Building

CodeForge is a coding practice platform where users will be able to:

- Browse coding problems
- Search and filter problems
- Solve problems
- Submit solutions
- Track their progress
- View their coding activity


### Current Storage

Problems are currently stored in an in-memory JavaScript array.

This means data is lost whenever the server restarts.

MongoDB integration is planned as the next major backend step.



### Backend

- [x] Express server setup
- [x] GET all problems
- [x] GET problem by ID
- [x] POST new problem
- [x] Search problems
- [x] Update problem
- [x] Delete problem
- [x] Request validation
- [x] Error handling
- [x] Middleware basics
- [x] Unique problem ID generation
- [ ] MongoDB integration
- [ ] Mongoose models
- [ ] User authentication
- [ ] Submission systema

### Frontend

- [ ] React application
- [ ] Problem listing
- [ ] Search
- [ ] Problem page
- [ ] Code editor
- [ ] Submission UI

## Tech Stack

### Currently

- Node.js
- Express.js
- JavaScript

### Planned

- React
- MongoDB
- Mongoose
- Tailwind CSS

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/problems` | Get all problems |
| GET | `/api/problems/:id` | Get a specific problem |
| POST | `/api/problems` | Create a problem |
| PUT | `/api/problems/:id` | Update a problem |
| DELETE | `/api/problems/:id` | Delete a problem |
| GET | `/search?q=` | Search problems |

## What I'm Learning

This project is being built as a hands-on engineering project rather than following a tutorial.

I'm using it to learn:

- REST APIs
- HTTP methods
- Request/response lifecycle
- Express.js
- API validation
- Error handling
- Git & GitHub
- Databases
- Authentication
- Backend architecture
- Middleware
- HTTP status codes
- Query parameters
- Route parameters
- Conventional commits

## Project Status

🚧 Actively building.