import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.routers import auth

app = FastAPI(title=settings.app_name, version=settings.app_version)

# Wire CORS using your lower-case config parameter
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include your updated async authentication router
app.include_router(auth.router)

@app.get("/")
def health_check():
    return {
        "status": "healthy", 
        "service": settings.app_name,
        "version": settings.app_version,
        "database": "MongoDB Atlas Connected"
    }

if __name__ == "__main__":
    # Runs your development server on localhost:8000 with auto-reload
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)