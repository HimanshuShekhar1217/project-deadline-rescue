from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

# Initialize the MongoDB client using your Atlas URL from config
client = AsyncIOMotorClient(settings.database_url)

# Connect to the specific database database 
# (It will automatically create "productivity_rescue" if it doesn't exist)
db = client.productivity_rescue

# Helper dependency to get the database instance in routers
async def get_db():
    yield db