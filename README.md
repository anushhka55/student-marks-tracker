# Student Marks Tracker (Full Stack)

A simple full stack CRUD application.

- **Frontend:** HTML, CSS, vanilla JavaScript
- **Backend:** Node.js + Express (REST API)
- **Storage:** JSON file (`data.json`)

## Features
- Add, view, edit and delete student marks
- Auto grade calculation
- Live stats: total, average, highest

## Run locally
```bash
npm install
npm start
```
Open http://localhost:3000

## API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/students | List all |
| POST | /api/students | Add new |
| PUT | /api/students/:id | Update |
| DELETE | /api/students/:id | Delete |

## Future improvements
Replace JSON file with MongoDB/MySQL, add login, add search & charts.
