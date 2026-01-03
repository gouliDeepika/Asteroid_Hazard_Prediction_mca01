import joblib
import os

_model = None
_scaler = None

def load_models():
    global _model, _scaler

    BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
    MODELS_DIR = os.path.join(BASE_DIR, "models")

    print("🔄 Loading XGBoost model and scaler...")

    _model = joblib.load(os.path.join(MODELS_DIR, "xgboost.pkl"))
    _model.set_params(n_jobs=1)  # IMPORTANT: fast on Windows

    _scaler = joblib.load(os.path.join(MODELS_DIR, "scaler.pkl"))

    print("✅ Model and scaler loaded successfully")

def get_model():
    return _model

def get_scaler():
    return _scaler
