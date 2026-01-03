import requests
from datetime import date

NASA_API_KEY = "DEMO_KEY"  # you can replace with your own key later
NASA_FEED_URL = "https://api.nasa.gov/neo/rest/v1/feed"


def get_today_asteroids():
    """
    Fetch today's near-earth asteroids (id + name)
    """
    today = date.today().isoformat()

    params = {
        "start_date": today,
        "end_date": today,
        "api_key": NASA_API_KEY,
    }

    response = requests.get(NASA_FEED_URL, params=params)
    response.raise_for_status()

    data = response.json()

    asteroids = []
    for neo in data["near_earth_objects"][today]:
        asteroids.append({
            "id": neo["id"],
            "name": neo["name"],
        })

    return asteroids


def get_nasa_asteroid_details(asteroid_id):
    """
    Fetch one asteroid's parameters and normalize them
    """
    today = date.today().isoformat()

    params = {
        "start_date": today,
        "end_date": today,
        "api_key": NASA_API_KEY,
    }

    response = requests.get(NASA_FEED_URL, params=params)
    response.raise_for_status()

    data = response.json()

    for neo in data["near_earth_objects"][today]:
        if neo["id"] == asteroid_id:
            approach = neo["close_approach_data"][0]

            return {
                "absolute_magnitude": float(neo["absolute_magnitude_h"]),
                "estimated_diameter_min": float(
                    neo["estimated_diameter"]["kilometers"]["estimated_diameter_min"]
                ),
                "estimated_diameter_max": float(
                    neo["estimated_diameter"]["kilometers"]["estimated_diameter_max"]
                ),
                "relative_velocity": float(
                    approach["relative_velocity"]["kilometers_per_hour"]
                ),
                "miss_distance": float(
                    approach["miss_distance"]["kilometers"]
                ),
            }

    return None
