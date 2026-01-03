import pandas as pd
import os

asteroid_df = None


def load_dataset():
    global asteroid_df

    BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
    DATA_PATH = os.path.join(BASE_DIR, "data", "asteroid_data.csv")

    asteroid_df = pd.read_csv(DATA_PATH)

    print("✅ Dataset loaded successfully")
    print("📌 Dataset columns:", list(asteroid_df.columns))


def get_asteroid_list(limit: int = 200):
    """
    Return asteroid id and name for dropdown
    """
    return asteroid_df.head(limit)[["id", "name"]].to_dict(orient="records")


def get_asteroid_by_id(asteroid_id):
    """
    Fetch single asteroid and normalize feature names
    """
    row = asteroid_df[asteroid_df["id"] == int(asteroid_id)]

    if row.empty:
        return None

    r = row.iloc[0]

    # ✅ EXACT mapping based on YOUR dataset
    return {
        "absolute_magnitude": float(r["absolute_magnitude"]),
        "estimated_diameter_min": float(r["est_diameter_min"]),
        "estimated_diameter_max": float(r["est_diameter_max"]),
        "relative_velocity": float(r["relative_velocity"]),
        "miss_distance": float(r["miss_distance"]),
    }
