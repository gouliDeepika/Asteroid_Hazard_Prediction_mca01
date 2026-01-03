import shap
import numpy as np
import joblib

model = joblib.load("models/xgboost.pkl")

explainer = shap.Explainer(model)

def get_shap_values(data):
    shap_values = explainer(data)
    return shap_values.values.tolist()
