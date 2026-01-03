from fastapi import APIRouter
from app.services.model_loader import get_model

router = APIRouter()

FEATURE_NAMES = [
    "Absolute Magnitude",
    "Diameter Min",
    "Diameter Max",
    "Relative Velocity",
    "Miss Distance",
]

@router.get("/feature-importance")
def feature_importance():
    """
    Return feature importance from XGBoost model
    """
    model = get_model()

    # XGBoost feature importance
    importances = model.feature_importances_.tolist()

    result = []
    for name, value in zip(FEATURE_NAMES, importances):
        result.append({
            "feature": name,
            "importance": round(float(value), 4)
        })

    # Sort descending
    result.sort(key=lambda x: x["importance"], reverse=True)

    return result
