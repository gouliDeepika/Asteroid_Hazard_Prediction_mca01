import numpy as np
import shap
from fastapi import APIRouter, HTTPException

from app.schemas.input_schema import UnifiedPredictionInput
from app.services.model_loader import get_model, get_scaler

router = APIRouter()

FEATURE_NAMES = [
    "Absolute Magnitude",
    "Diameter Min",
    "Diameter Max",
    "Relative Velocity",
    "Miss Distance",
]

@router.post("/explain/shap")
def explain_with_shap(data: UnifiedPredictionInput):
    """
    SHAP explainability – runs ONLY on demand
    """

    # Validate inputs
    values = [
        data.absolute_magnitude,
        data.estimated_diameter_min,
        data.estimated_diameter_max,
        data.relative_velocity,
        data.miss_distance,
    ]

    if any(v is None for v in values):
        raise HTTPException(status_code=400, detail="Missing feature values")

    X = np.array([values])

    model = get_model()
    scaler = get_scaler()

    X_scaled = scaler.transform(X)

    # TreeExplainer (FAST for XGBoost)
    explainer = shap.TreeExplainer(model)
    shap_values = explainer.shap_values(X_scaled)

    # For binary classification → take class 1
    if isinstance(shap_values, list):
        shap_values = shap_values[1]

    result = []
    for name, value in zip(FEATURE_NAMES, shap_values[0]):
        result.append({
            "feature": name,
            "shap_value": round(float(value), 5)
        })

    return result
