from typing import List, Union
from pydantic import AnyHttpUrl, PostgresDsn, RedisDsn, field_validator
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Empire Platform"
    PROJECT_VERSION: str = "0.1.0"
    
    # Security
    SECRET_KEY: str = "changethis_in_production_extremely_secret_key"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # CORS
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = [
        "http://localhost:3000",
        "http://localhost:8000",
    ]

    @field_validator("BACKEND_CORS_ORIGINS", mode="before")
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    # Database
    DATABASE_URL: str = "postgresql://empire_user:empire_password@localhost:5432/empire_db"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
