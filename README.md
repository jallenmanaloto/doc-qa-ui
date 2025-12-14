# Doc Q&A - Frontend (NextJS & Typescript)

## Overview

A simple frontend for uploading documents and asking natural-language questions to your knowledge base. Built with Next.js + TypeScript and a clean, minimal UI.

## Features

- Add Documents (`/docs`)
    - Add one or more documents with id, title, and content.
    - Submits to backend POST /ingest.
    - Displays success/error messages.

- Ask Questions (`/ask`)
    - Input a natural-language question.
    - Submits to backend `POST` /ask.
    - Displays answer and list of sources (doc ID + title + optional score).

- Responsive and modern UI using Tailwind CSS.
- Basic client-side form validation for empty fields.

## Tech Stack

- Frontend Framework: Next.js 16 (app router)
- Language: TypeScript
- UI & Icons: Tailwind CSS + Lucide React icons
- State Management: React useState hooks

## Pages

`/docs` - Add Documents
- Form to create one or more documents.
- Each document has:
    - id (string)
    - title (string)
    - content (textarea, plain text)

- Features:
    - Add/Remove documents dynamically.
    - Form validation to prevent empty fields.
    - Upload button calls backend API POST /ingest.

`/ask` - Ask a Question
- Input field for natural-language question.
- Submit triggers backend API POST /ask.
- Displays:
    - Answer returned by backend.
    - List of sources with doc ID and title.

## Folder Structure

```bash
src/
└─ app/
   ├─ page.tsx
   ├─ layout.tsx
   ├─ globals.css
   ├─ docs/
   │  └─ page.tsx
   └─ ask/
      └─ page.tsx
```

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Environment Variables

Create a `.env.local` file with the backend endpoints
```bash
NEXT_PUBLIC_INGEST_ENDPOINT=http://localhost:3001/ingest
NEXT_PUBLIC_ASK_ENDPOINT=http://localhost:3001/ask
```

## Tradeoffs & Production Consideration

1. Page Structure & Componentization
    - For simplicity, each page (`/`, `/docs`, `/ask`) is implemented as a single `page.tsx`.
    - This keeps the assessment easy to read and avoids premature abstraction.
    - Production-grade code would extract shared UI (inputs, buttons, alerts, forms) into reusable components to improve maintainability and reduce duplication.

2. State Management & Async Handling
    - Async state (loading, success, error) is managed manually using `useState`.
    - In production, a library such as TanStack Query would:
        - Handle loading/error states automatically
        - Enable request deduplication and caching
        - Simplify retries and background refetching

3. Form Validation
    - Basic validation is done inline (checking for empty fields before submission).
    - This keeps the logic lightweight and easy to follow.
    - Production-grade validation would use schema-based validation (e.g., Zod) to:
        - Enforce consistent input rules
        - Provide clearer error messages
        - Share validation logic between frontend and backend
