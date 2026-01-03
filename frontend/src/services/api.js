import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Prediction
export const predictUnified = (payload) => {
  return API.post("/predict/unified", payload);
};

// Dataset APIs
export const fetchAsteroids = () => {
  return API.get("/asteroids");
};

export const fetchAsteroidById = (id) => {
  return API.get(`/asteroids/${id}`);
};
// NASA APIs
export const fetchNasaAsteroids = () => {
  return API.get("/nasa/asteroids");
};

export const fetchNasaAsteroidById = (id) => {
  return API.get(`/nasa/asteroids/${id}`);
};
export const fetchFeatureImportance = () => {
  return API.get("/feature-importance");
};
export const fetchShapExplanation = (payload) => {
  return API.post("/explain/shap", payload);
};
