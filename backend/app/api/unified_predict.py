import numpy as np
from fastapi import APIRouter, HTTPException

from app.schemas.input_schema import UnifiedPredictionInput
from app.schemas.output_schema import PredictionResponse
from app.services.model_loader import get_model, get_scaler

router = APIRouter()


@router.post("/predict/unified", response_model=PredictionResponse)
def unified_prediction(data: UnifiedPredictionInput):
    """
    Unified prediction endpoint for:
    - manual
    - dataset (editable)
    - nasa (editable)

    All modes finally send FULL feature values.
    """

    # -------------------------------
    # Validate source
    # -------------------------------
    if data.source not in ["manual", "dataset", "nasa"]:
        raise HTTPException(status_code=400, detail="Invalid source type")

    # -------------------------------
    # Validate required features
    # -------------------------------
    required_fields = [
        data.absolute_magnitude,
        data.estimated_diameter_min,
        data.estimated_diameter_max,
        data.relative_velocity,
        data.miss_distance,
    ]

    if any(v is None for v in required_fields):
        raise HTTPException(
            status_code=400,
            detail="Missing one or more asteroid feature values",
        )

    # -------------------------------
    # Prepare feature vector
    # Order MUST match training
    # -------------------------------
    features = [
        data.absolute_magnitude,
        data.estimated_diameter_min,
        data.estimated_diameter_max,
        data.relative_velocity,
        data.miss_distance,
    ]

    X = np.array([features])

    # -------------------------------
    # Load model & scaler (already in memory)
    # -------------------------------
    model = get_model()
    scaler = get_scaler()

    # -------------------------------
    # Scale input
    # -------------------------------
    X_scaled = scaler.transform(X)

    # -------------------------------
    # Prediction
    # -------------------------------
    proba = model.predict_proba(X_scaled)[0]
    hazard_probability = float(proba[1])

    prediction_label = (
        "Hazardous" if hazard_probability >= 0.5 else "Not Hazardous"
    )

    # -------------------------------
    # Response
    # -------------------------------
    return PredictionResponse(
        prediction=prediction_label,
        probability=round(hazard_probability, 4),
    )
