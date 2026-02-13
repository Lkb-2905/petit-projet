from sqlalchemy import create_engine, text
import os

# Connect to the database using the same URL as alembic
# Since I'm running from outside Docker, need localhost
DATABASE_URL = "postgresql://empire_user:empire_password@localhost:5432/empire_db"

def fix_alembic_version():
    engine = create_engine(DATABASE_URL)
    with engine.connect() as conn:
        # Check current version
        result = conn.execute(text("SELECT version_num FROM alembic_version"))
        current = result.scalar()
        print(f"Current version in DB: {current}")
        
        if current == '90442d4ac9a2':
            print("Reverting to 81b833f39151...")
            # Ideally update, but we can delete and insert or just update
            conn.execute(text("UPDATE alembic_version SET version_num = '81b833f39151'"))
            conn.commit()
            print("Successfully reverted version.")
        else:
            print("Version is not the problematic one. No changes made.")

if __name__ == "__main__":
    fix_alembic_version()
