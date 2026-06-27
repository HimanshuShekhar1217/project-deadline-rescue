from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings


def _looks_like_mongodb_url(url: str) -> bool:
    url = (url or "").strip().lower()
    return url.startswith("mongodb://") or url.startswith("mongodb+srv://")


database_url = (settings.database_url or "").strip()

# Initialize the MongoDB client only when DATABASE_URL looks like a MongoDB URI.
# If not, the app currently only supports MongoDB (you can add SQLite later).
if not _looks_like_mongodb_url(database_url):
    raise ValueError(
        "Invalid DATABASE_URL for MongoDB. Expected a URI starting with "
        "'mongodb://' or 'mongodb+srv://'. "
        f"Got: {database_url}"
    )

client = AsyncIOMotorClient(database_url)

# Connect to the specific database database
# (It will automatically create 'productivity_rescue' if it doesn't exist)
db = client.productivity_rescue


# Helper dependency to get the database instance in routers
async def get_db():
    yield db
