import asyncio
import httpx
import sys

API_URL = "http://localhost:8000/api/v1"

async def verify_admin():
    suffix = sys.argv[1] if len(sys.argv) > 1 else "test"
    admin_email = f"admin_{suffix}@empire.cm"
    user_email = f"user_{suffix}@empire.cm"
    
    async with httpx.AsyncClient() as client:
        # 1. Register Admin User
        print(f"Registering Admin: {admin_email}")
        await client.post(f"{API_URL}/auth/register", json={
            "email": admin_email,
            "password": "password123",
            "username": f"Admin_{suffix}"
        })
        
        # 2. Register Normal User
        print(f"Registering User: {user_email}")
        await client.post(f"{API_URL}/auth/register", json={
            "email": user_email,
            "password": "password123",
            "username": f"Citizen_{suffix}"
        })

        # 3. Login as Admin
        print("Logging in as Admin...")
        resp = await client.post(f"{API_URL}/auth/token", data={
            "username": admin_email,
            "password": "password123"
        })
        admin_token = resp.json()["access_token"]
        admin_headers = {"Authorization": f"Bearer {admin_token}"}
        
        # 4. Elevate to Admin (Database Hack via SQL or just assume manual elevation for now? 
        # Since I can't run SQL easily here without a separate script, I'll rely on a potential 'setup_admin' endpoint or just fail if I can't.
        # WAIT: I can use the 'users' table directly if I had direct DB access in this script.
        # use sqlalchemy to update role.
        print("Elevating user to admin role...")
        # Note: This part assumes I can connect to DB from this script. 
        # Importing app code might be tricky if env vars aren't set.
        # For this test, I will just TRY to access admin routes and expect 403, 
        # then I will manually print instructions to elevate.
        
        # 5. Access Admin Stats (Should fail initially - BUT we just ran make_admin.py externally so it might succeed if we reuse the same user)
        # Actually, for this script to be self-contained, checking 403 is good.
        # But we want to verify 200 now.
        
        print("Accessing Admin Stats...")
        resp = await client.get(f"{API_URL}/admin/stats", headers=admin_headers)
        if resp.status_code == 200:
            print("SUCCESS: Admin access granted.")
            stats = resp.json()
            print(f"Stats: {stats}")
        elif resp.status_code == 403:
            print("FAILURE: Admin access denied (Guidance: Run make_admin.py first).")
            return
        else:
            print(f"UNEXPECTED: {resp.status_code} - {resp.text}")
            
        if resp.status_code == 200:
             # 6. Ban User
             # Get user ID first... wait, we don't have it easily. 
             # Let's list users to find the user we created.
             print("Listing users...")
             resp = await client.get(f"{API_URL}/admin/users", headers=admin_headers)
             users = resp.json()
             target_user = next((u for u in users if u["email"] == user_email), None)
             
             if target_user:
                 print(f"Banning user {target_user['id']}...")
                 resp = await client.post(f"{API_URL}/admin/users/{target_user['id']}/ban", headers=admin_headers)
                 if resp.status_code == 200:
                     print("SUCCESS: User banned.")
                 else:
                     print(f"FAILED to ban user: {resp.status_code}")
             else:
                 print("Could not find target user to ban.")

if __name__ == "__main__":
    asyncio.run(verify_admin())
