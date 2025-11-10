# TherapyDiary Backend

Backend API for the TherapyDiary mental health app based on Behavioural Activation therapy.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Test the API:**
   Visit http://localhost:3000/api/health

## Project Structure

```
backend/
├── src/
│   ├── controllers/    # Business logic
│   ├── models/         # Database schemas
│   ├── routes/         # API endpoints
│   ├── middleware/     # Auth, validation, etc.
│   └── server.js       # Express app entry point
├── package.json
└── .env.example
```

## Tech Stack

- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (jsonwebtoken)
- **Security:** bcrypt for password hashing
- **Validation:** express-validator

## Available Scripts

- `npm run dev` - Start development server with auto-reload
- `npm start` - Start production server
- `npm test` - Run tests with coverage

## API Endpoints

### Health Check
- `GET /api/health` - Check if API is running

### Authentication (Coming soon)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and receive JWT token

### Diary (Coming soon)
- `GET /api/diary` - Get all diary entries
- `POST /api/diary` - Create new entry
- `PUT /api/diary/:id` - Update entry
- `DELETE /api/diary/:id` - Delete entry

### Activities (Coming soon)
- `GET /api/activities` - Get all activities
- `POST /api/activities` - Create custom activity
- `PUT /api/activities/:id` - Update activity
- `DELETE /api/activities/:id` - Delete activity

### Schedule (Coming soon)
- `GET /api/schedule` - Get scheduled activities
- `POST /api/schedule` - Schedule an activity
- `PATCH /api/schedule/:id/complete` - Mark as completed

### Mood Tracking (Coming soon)
- `GET /api/mood/history` - Get mood history
- `GET /api/mood/stats` - Get mood statistics
