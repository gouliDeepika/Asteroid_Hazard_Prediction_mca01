from fastapi import APIRouter, HTTPException
from app.services.nasa_service import (
    get_today_asteroids,
    get_nasa_asteroid_details,
)

router = APIRouter()


@router.get("/nasa/asteroids")
def list_nasa_asteroids():
    """
    Get today's NASA asteroids for dropdown
    """
    return get_today_asteroids()


@router.get("/nasa/asteroids/{asteroid_id}")
def get_nasa_asteroid(asteroid_id: str):
    """
    Get selected NASA asteroid parameters
    """
    asteroid = get_nasa_asteroid_details(asteroid_id)

    if asteroid is None:
        raise HTTPException(status_code=404, detail="Asteroid not found")

    return asteroid
