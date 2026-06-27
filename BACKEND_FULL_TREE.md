# Backend full file tree (actual)

```text
Backend/
├─ backend/                                (python package)
│  ├─ .env
│  ├─ .env.example
│  ├─ alembic/
│  │  ├─ env.py
│  │  ├─ versions/
│  │  │  └─ 0001_initial_tables.py
│  │  └─ (alembic migrations)
│  ├─ alembic.ini
│  ├─ app.db
│  ├─ app/
│  │  ├─ __init__.py
│  │  ├─ core/
│  │  │  ├─ __init__.py
│  │  │  ├─ config.py
│  │  │  ├─ database.py
│  │  │  └─ security.py
│  │  ├─ models/
│  │  │  ├─ __init__.py
│  │  │  ├─ ai_log.py
│  │  │  ├─ alert.py
│  │  │  ├─ schedule.py
│  │  │  ├─ task.py
│  │  │  └─ user.py
│  │  ├─ routers/
│  │  │  ├─ __init__.py
│  │  │  ├─ ai.py
│  │  │  ├─ alerts.py
│  │  │  ├─ auth.py
│  │  │  ├─ dashboard.py
│  │  │  ├─ schedule.py
│  │  │  ├─ tasks.py
│  │  │  └─ voice.py
│  │  ├─ schemas/
│  │  │  ├─ __init__.py
│  │  │  ├─ ai.py
│  │  │  ├─ alert.py
│  │  │  ├─ dashboard.py
│  │  │  ├─ schedule.py
│  │  │  ├─ task.py
│  │  │  └─ user.py
│  │  └─ services/
│  │     ├─ __init__.py
│  │     ├─ ai_service.py
│  │     ├─ alert_service.py
│  │     ├─ schedule_service.py
│  │     ├─ stats_service.py
│  │     ├─ task_service.py
│  │     └─ voice_service.py
│  ├─ main.py
│  ├─ requirements.txt
│  ├─ test.db
│  └─ tests/
│     ├─ __init__? (not listed)
│     ├─ conftest.py
│     ├─ test_ai.py
│     ├─ test_auth.py
│     ├─ test_tasks.py
│     └─ (pytest cache)
├─ backend/tests/ (handled above inside backend/backend/tests)
├─ backend/__pycache__/ (python cache)
├─ .agents/
├─ .git/
└─ backend/ (top-level python project directory)
```

## Notes
- Some entries in your folder listing are Python cache/build artifacts (e.g., `__pycache__`, `.pytest_cache`).
- The tree above focuses on the source layout: `app/core`, `app/models`, `app/routers`, `app/schemas`, `app/services`, plus tests and alembic migrations.

