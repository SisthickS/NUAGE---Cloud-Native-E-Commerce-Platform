from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
import uvicorn

app = FastAPI(title="User Service", version="1.0.0")

class UserCreate(BaseModel):
    email: str
    name: str
    password: str

class User(BaseModel):
    user_id: str
    email: str
    name: str

# In-memory storage (replace with DynamoDB later)
users_db = {}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "user-service"}

@app.post("/users", response_model=User)
async def create_user(user: UserCreate):
    if user.email in users_db:
        raise HTTPException(status_code=400, detail="User already exists")
    
    user_id = user.email.split("@")[0]  # Simple ID generation
    users_db[user_id] = {
        "user_id": user_id,
        "email": user.email,
        "name": user.name
    }
    return users_db[user_id]

@app.get("/users/{user_id}", response_model=User)
async def get_user(user_id: str):
    user = users_db.get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.get("/users")
async def list_users():
    return list(users_db.values())

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
