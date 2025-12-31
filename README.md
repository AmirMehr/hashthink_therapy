## Hashthink Therapy – Backend Technical Test (RAG)

### Overview

This project implements a backend system for logging therapy sessions, summarizing conversations, and enabling semantic search across past sessions using **Retrieval-Augmented Generation (RAG)** concepts.

The focus is **architecture, clarity, and AI awareness**, not production AI accuracy.

---

## Key Features

- Create and manage therapy sessions
- Log therapist and client conversation entries
- Generate session summaries (mocked AI)
- Convert summaries into embeddings (vector representation)
- Perform semantic search across sessions (RAG)
- In-memory persistence (no external DB required)

---

## Tech Stack

- **Node.js**
- **TypeScript**
- **Express.js**
- **In-memory repositories**
- **Mock AI services (swappable by design)**

No external AI APIs are required.

---

## Architecture Principles

- Clean Architecture
- SOLID principles
- Dependency inversion
- Replaceable AI implementations
- Clear separation between:

  - Controllers
  - Services (use cases)
  - Domain models
  - Infrastructure

---

## Project Structure

```
src/
├── controllers/        # HTTP controllers
├── routes/             # Express route definitions
├── services/
│   ├── interfaces/     # AI & domain contracts
│   ├── implementations/# Mock AI implementations
│   ├── factories/      # Service factories
│   └── usecases/       # Core business logic
├── repositories/       # In-memory data storage
├── domain/             # Entities & types
├── utils/              # Helpers (UUID, similarity, etc.)
├── app.ts              # Express app setup
└── server.ts           # Server bootstrap
```

---

## API Endpoints

### Health Check

```
GET /
```

Response:

```json
{
  "status": "ok",
  "service": "Hashthink Therapy Backend",
  "timestamp": "ISO_DATE"
}
```

---

### Create Session

```
POST /sessions
```

Body:

```json
{
  "therapistId": "t1",
  "clientId": "c1",
  "startTime": "2025-01-01T10:00:00Z"
}
```

---

### Add Entry

```
POST /sessions/:id/entries
```

Body:

```json
{
  "speaker": "client",
  "content": "I feel anxious today",
  "timestamp": "2025-01-01T10:05:00Z"
}
```

---

### Transcribe Session (Mock STT)

```
POST /sessions/:id/transcribe
```

Automatically adds diarized entries.

---

### Summarize Session

```
GET /sessions/:id/summary
```

Returns an AI-generated summary (mocked).

---

### Embed Session

```
POST /sessions/:id/embed
```

Converts summary text → numeric vector.

---

### Semantic Search (RAG)

```
GET /search/sessions?q=anxiety
```

Searches sessions by **meaning**, not keywords.

---

## RAG Explanation (Simple)

1. Session summaries are converted into vectors (embeddings)
2. User query is also embedded
3. Vectors are compared using cosine similarity
4. Most relevant past sessions are returned
5. Results could be passed into an LLM (conceptually)

This demonstrates **Retrieval-Augmented Generation** without external APIs.

---

## Why In-Memory Storage?

- Explicitly allowed by the task
- Keeps focus on architecture and AI concepts
- Easy to replace with MongoDB / PostgreSQL later

---

## UUID Strategy

Uses Node.js built-in `crypto.randomUUID()`:

- No external dependencies
- No ESM/CommonJS issues
- Fully typed
- Production-safe

---

## What Was Intentionally Skipped

- Authentication
- Authorization
- Real AI API calls
- Persistent database
- Frontend UI

These are **out of scope** per instructions.

---

## How to Run

```bash
npm install
npm run dev
```

Server runs on:

```
http://localhost:3000
```

---

## Final Notes

This project prioritizes:

- Correct abstractions
- Maintainability
- AI system understanding
- Senior-level backend design

All AI services are **mocked but replaceable**.

---

## Submission Status

✅ All required endpoints implemented
✅ RAG concept demonstrated
✅ Clean architecture applied
✅ Ready for review

---
