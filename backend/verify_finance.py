import asyncio
import httpx
import sys

API_URL = "http://localhost:8000/api/v1"

async def verify_finance():
    suffix = sys.argv[1] if len(sys.argv) > 1 else "test"
    email = f"finance_{suffix}@empire.cm"
    
    async with httpx.AsyncClient(timeout=30.0) as client:
        # 1. Register User
        print(f"Registering User: {email}")
        resp = await client.post(f"{API_URL}/auth/register", json={
            "email": email,
            "password": "password123",
            "username": f"Investor_{suffix}"
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
        
        # 2. Check Initial Balance
        print("Checking Initial Balance...")
        resp = await client.get(f"{API_URL}/finance/balance", headers=headers)
        if resp.status_code != 200:
            print(f"Failed to get balance: {resp.text}")
            return
            
        wallet = resp.json()
        print(f"Initial Balance: {wallet['balance']} {wallet['currency']}")
        
        if float(wallet["balance"]) != 0:
            print("ERROR: Initial balance should be 0")
            return

        # 3. Deposit Money (Orange Money)
        amount = 50000
        print(f"Depositing {amount} XAF via ORANGE_MONEY with Ref...")
        resp = await client.post(f"{API_URL}/finance/deposit", headers=headers, json={
            "amount": amount,
            "currency": "XAF",
            "payment_method": "ORANGE_MONEY",
            "transaction_ref": f"OM_{suffix}_REF"
        })
        
        if resp.status_code != 200:
            print(f"Deposit failed: {resp.text}")
            return

        wallet = resp.json()
        print(f"New Balance: {wallet['balance']} {wallet['currency']}")
        
        if float(wallet["balance"]) == amount:
            print("SUCCESS: Deposit successful!")
        else:
            print(f"ERROR: Balance mismatch. Expected {amount}, got {wallet['balance']}")

if __name__ == "__main__":
    asyncio.run(verify_finance())
