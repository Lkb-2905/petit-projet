import asyncio
import httpx
import sys

API_URL = "http://localhost:8000/api/v1"

async def verify_gamification():
    suffix = sys.argv[1] if len(sys.argv) > 1 else "test"
    email = f"gamer_{suffix}@empire.cm"
    
    async with httpx.AsyncClient() as client:
        # 1. Register User
        print(f"Registering User: {email}")
        resp = await client.post(f"{API_URL}/auth/register", json={
            "email": email,
            "password": "password123",
            "username": f"Gamer_{suffix}"
        })
        
        if resp.status_code != 201:
            print(f"Failed to register user: {resp.text}")
            return
            
        print("Logging in to get token...")
        resp = await client.post(f"{API_URL}/auth/token", data={
            "username": email,
            "password": "password123"
        })
        
        if resp.status_code != 200:
             print(f"Failed to login: {resp.text}")
             return

        token = resp.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}"}
        
        # 2. Check Initial Progress (Iron)
        print("Checking Initial Progress...")
        resp = await client.get(f"{API_URL}/intelligence/gamification/progress", headers=headers)
        progress = resp.json()
        print(f"Initial State: Tier={progress['current_tier']}, Score={progress['current_score']}")
        
        if progress["current_tier"] != "iron":
            print("ERROR: Initial tier should be iron")
            return

        # 3. Simulate Points (Reach Gold)
        print("Simulating 1000 points (Reach Gold)...")
        resp = await client.post(f"{API_URL}/intelligence/gamification/simulate", headers=headers, json={
            "action_type": "CUSTOM",
            "custom_points": 1000
        })
        print(f"Simulation Result: {resp.json()}")
        
        # 4. Check Progress Again
        resp = await client.get(f"{API_URL}/intelligence/gamification/progress", headers=headers)
        progress = resp.json()
        print(f"Updated State: Tier={progress['current_tier']}, Score={progress['current_score']}")

        if progress["current_tier"] == "gold":
            print("SUCCESS: User upgraded to Gold!")
        else:
            print(f"ERROR: User failed to upgrade. Current Tier: {progress['current_tier']}")

if __name__ == "__main__":
    asyncio.run(verify_gamification())
