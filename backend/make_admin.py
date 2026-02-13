from sqlalchemy import create_engine, text
import sys

# Connect to the database using the same URL as fixes
DATABASE_URL = "postgresql://empire_user:empire_password@localhost:5432/empire_db"

def make_admin():
    suffix = sys.argv[1] if len(sys.argv) > 1 else "test_run_1"
    email = f"admin_{suffix}@empire.cm"
    
    engine = create_engine(DATABASE_URL)
    with engine.connect() as conn:
        print(f"Elevating {email} to admin...")
        result = conn.execute(text("UPDATE users SET role = 'admin' WHERE email = :email"), {"email": email})
        conn.commit()
        print(f"Updated {result.rowcount} users.")

if __name__ == "__main__":
    make_admin()
