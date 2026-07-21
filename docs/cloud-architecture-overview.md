# Cloud Architecture Overview

The monorepo contains a React frontend and an Express API. Users interact with the frontend in a web browser, the frontend sends HTTP requests to the API, and the API reads and writes task data in an in-memory SQLite database. Because the database is process-local, task data is lost whenever the API process restarts.

```mermaid
flowchart LR
    user[Todo App User]

    subgraph system[Todo App Monorepo]
        frontend[React Frontend]
        api[Express API]
        store[(In-Memory SQLite Store)]

        frontend -->|HTTP /api/tasks| api
        api -->|SQL reads and writes| store
    end

    user -->|Uses in web browser| frontend
```

## Creating a TODO

The sequence below shows the request flow when a user submits the task form to create a new TODO.

```mermaid
sequenceDiagram
    actor User
    participant Frontend as React Frontend
    participant API as Express API
    participant DB as In-Memory SQLite Store

    User->>Frontend: Enter task title and submit form
    Frontend->>API: POST /api/tasks
    API->>DB: INSERT INTO tasks
    DB-->>API: New task row
    API-->>Frontend: 201 Created (task JSON)
    Frontend-->>User: Show new task in list
```