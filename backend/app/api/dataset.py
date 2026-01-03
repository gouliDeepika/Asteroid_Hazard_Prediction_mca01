from fastapi import APIRouter, HTTPException
from app.services.dataset_service import (
    get_asteroid_list,
    get_asteroid_by_id
)

router = APIRouter()

@router.get("/asteroids")
def list_asteroids():
    """
    Get asteroids for dropdown.
    """
    return get_asteroid_list()

@router.get("/asteroids/{asteroid_id}")
def get_asteroid(asteroid_id: int):
    """
    Get selected asteroid data for autofill.
    """
    asteroid = get_asteroid_by_id(asteroid_id)

    if asteroid is None:
        raise HTTPException(status_code=404, detail="Asteroid not found")

    return asteroid
