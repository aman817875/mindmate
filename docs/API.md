# MindMate API Documentation

## Base URL
- Development: `http://localhost:5000/api`
- Production: `https://your-app.herokuapp.com/api`

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Authentication Routes

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

### Mood Tracking Routes

#### Get Mood Entries
```http
GET /mood
Authorization: Bearer <token>
```

#### Create Mood Entry
```http
POST /mood
Authorization: Bearer <token>
Content-Type: application/json

{
  "mood": 8,
  "emotions": ["happy", "energetic"],
  "notes": "Had a great day at work!"
}
```

### Journal Routes

#### Get Journal Entries
```http
GET /journal
Authorization: Bearer <token>
```

#### Create Journal Entry
```http
POST /journal
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My Day",
  "content": "Today was amazing...",
  "mood": 7,
  "tags": ["work", "family"],
  "isPrivate": true
}
```

### Meditation Routes

#### Get Meditation Sessions
```http
GET /meditation
Authorization: Bearer <token>
```

#### Start Meditation Session
```http
POST /meditation
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "breathing",
  "duration": 10
}
```

### Assessment Routes

#### Get Assessments
```http
GET /assessment
Authorization: Bearer <token>
```

#### Submit Assessment
```http
POST /assessment
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "anxiety",
  "responses": [
    {"question": "q1", "answer": 3},
    {"question": "q2", "answer": 2}
  ]
}
```

### Community Routes

#### Get Community Posts
```http
GET /community/posts
Authorization: Bearer <token>
```

#### Create Community Post
```http
POST /community/posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Feeling anxious today",
  "content": "Looking for support...",
  "isAnonymous": false
}
```

### Analytics Routes

#### Get Mood Analytics
```http
GET /analytics/mood
Authorization: Bearer <token>
```

**Response:**
```json
{
  "averageMood": 7.2,
  "moodTrend": "improving",
  "weeklyData": [...],
  "monthlyData": [...]
}
```

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error message",
  "status": 400
}
```

### Common Error Codes
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Rate Limiting

API requests are limited to 100 requests per 15 minutes per IP address.
