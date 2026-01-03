from pydantic import BaseModel, Field

class AsteroidInput(BaseModel):
    """
    Input features required for prediction.
    Values should match training dataset order.
    """

    absolute_magnitude: float = Field(..., example=22.5)
    estimated_diameter_min: float = Field(..., example=0.15)
    estimated_diameter_max: float = Field(..., example=0.35)
    relative_velocity: float = Field(..., example=45000)
    miss_distance: float = Field(..., example=750000)

    class Config:
        json_schema_extra = {
         "example": {
            "absolute_magnitude": 22.5,
            "estimated_diameter_min": 0.15,
            "estimated_diameter_max": 0.35,
            "relative_velocity": 45000,
            "miss_distance": 750000
        }
    }

from typing import Optional

class UnifiedPredictionInput(BaseModel):
    """
    Unified input for all prediction modes
    """

    source: str  # manual | dataset | nasa

    # manual input
    absolute_magnitude: Optional[float] = None
    estimated_diameter_min: Optional[float] = None
    estimated_diameter_max: Optional[float] = None
    relative_velocity: Optional[float] = None
    miss_distance: Optional[float] = None

    # dataset input
    asteroid_id: Optional[int] = None

    # nasa input
    nasa_asteroid_id: Optional[str] = None
