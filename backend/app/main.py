from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.core.config import settings
from app.services.auth import routes as auth_routes
from app.services.media import routes as media_routes
from app.services.finance import routes as finance_routes
from app.services.intelligence import routes as intelligence_routes
from app.services.admin import routes as admin_routes

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.PROJECT_VERSION,
    description="Empire 2076 Civilizational OS API",
    docs_url="/api/docs",
    openapi_url="/api/openapi.json",
)

# ... (existing middleware and health check)

# Register Routers
app.include_router(auth_routes.router, prefix="/api/v1/auth", tags=["Auth"])
app.include_router(media_routes.router, prefix="/api/v1/media", tags=["Media"])
app.include_router(finance_routes.router, prefix="/api/v1/finance", tags=["Finance"])
app.include_router(intelligence_routes.router, prefix="/api/v1/intelligence", tags=["Intelligence"])
app.include_router(admin_routes.router, prefix="/api/v1/admin", tags=["Admin"])

# CORS Configuration
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Mount Static Files
app.mount("/static", StaticFiles(directory="/app/static"), name="static")

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "version": settings.PROJECT_VERSION,
        "environment": "production"
    }


