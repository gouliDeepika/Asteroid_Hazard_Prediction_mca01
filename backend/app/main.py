from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.feature_importance import router as feature_importance_router
from app.api.shap_explain import router as shap_router

from app.services.model_loader import load_models
from app.services.dataset_service import load_dataset

from app.api.dataset import router as dataset_router
from app.api.nasa import router as nasa_router
from app.api.unified_predict import router as unified_predict_router

app = FastAPI(
    title="Asteroid Hazard Prediction API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    load_models()
    load_dataset()

# 👇 THESE THREE ARE REQUIRED
app.include_router(dataset_router, prefix="/api")
app.include_router(nasa_router, prefix="/api")
app.include_router(unified_predict_router, prefix="/api")
app.include_router(feature_importance_router, prefix="/api")
app.include_router(shap_router, prefix="/api")


@app.get("/")
def root():
    return {"message": "Asteroid Hazard Prediction API is running 🚀"}
