# Student Notes App

A two-tier web application built with **HTML/CSS/JS** (frontend), **Node.js + Express** (backend), and **MongoDB** (database).

## Project Structure

```
notesapp/
├── frontend/
│   ├── index.html       # Main UI
│   ├── style.css        # Styles
│   └── app.js           # API calls to backend
├── backend/
│   ├── server.js        # Express server + all API routes
│   ├── noteModel.js     # Mongoose schema for Notes
│   ├── package.json     # Node dependencies
│   ├── .env             # MongoDB URI (not committed to Git)
│   └── Dockerfile       # Multi-stage Docker build
├── docker-compose.yml   # Runs all 3 services together
└── k8s/
    ├── deployment.yaml
    └── service.yaml
```

## API Endpoints

| Method | URL              | Description        |
|--------|------------------|--------------------|
| GET    | /api/notes       | Get all notes      |
| POST   | /api/notes       | Create a new note  |
| DELETE | /api/notes/:id   | Delete a note      |

## Run with Docker Compose

```bash
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
