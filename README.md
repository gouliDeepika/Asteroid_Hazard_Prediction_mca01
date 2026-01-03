Asteroid Hazard Prediction using Machine Learning

Project Overview:-

Asteroids passing close to Earth pose potential risks. This project aims to predict whether an asteroid is hazardous or not using machine learning models trained on a large real-world dataset.
The system provides manual input, dataset-based selection, and live NASA asteroid data, along with visual explanations of predictions.

The application is built as a full-stack ML system with:-

-FastAPI backend for model inference

-React + Tailwind CSS frontend for visualization

-XGBoost as the best-performing ML model

Objectives:-

1 Predict asteroid hazard status (Hazardous / Not Hazardous)

2 Display prediction probability using a visual gauge

3 Explain predictions using:

4 Feature Importance (global)

5 SHAP Explainability (local)

6 Provide an interactive and user-friendly dashboard

 Key Features:-

1 Manual asteroid parameter input

2 Dataset-based asteroid selection with auto-fill

3 Live asteroid data from NASA NEO API

4 Unified prediction API

5 Probability Gauge visualization

6 Feature Importance chart (XGBoost)

7 SHAP Explainability on button click

8 Modern glassmorphism UI

9 Deployed and version-controlled using GitHub

10 Machine Learning Models Used

The following models were trained and evaluated:-

1 Logistic Regression

2 Support Vector Machine (SVM)

3 Random Forest

4 XGBoost(Best performing model)

5 Decision Tree

"XGBoost was selected due to its robustness with 91% Accuracy"

Dataset Details:-

Source: Kaggle (NASA Near-Earth Object data)

Rows: ~90,000+

Columns:

1 Absolute Magnitude

2 Estimated Diameter (Min & Max)

3 Relative Velocity

4 Miss Distance

5 Hazardous (Target variable)

Tech Stack:-

Frontend:-

React (Vite)

Tailwind CSS

Recharts (charts & visualization)

Backend:-

FastAPI

Python

Scikit-learn

XGBoost

SHAP

Tools:-

Git & GitHub

VS Code

Kaggle Dataset

NASA NEO API

Application Modes:-

1 Manual Input

Users manually enter asteroid parameters to predict hazard status.

2 Dataset Mode

Users select an asteroid from the training dataset with auto-filled values (editable).

3 NASA Live Mode

Fetches live asteroid data from NASA’s Near-Earth Object Web Service.

Model Explainability

🔹 Probability Gauge

Visually represents the probability of an asteroid being hazardous.

🔹 Feature Importance

Shows which features are most influential globally in the XGBoost model.

🔹 SHAP Explainability

Provides local, instance-level explanations for individual predictions.

How to Run the Project?

Backend Setup
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload

Frontend Setup
cd frontend
npm install
npm run dev


Open browser:-

http://localhost:5173

Future Enhancements:-

1 Deployment on cloud (AWS / Render / Vercel)

2 Real-time asteroid alerts

3 Improved UI animations

4 More advanced explainability dashboards

 Academic Relevance

This project demonstrates:

1 End-to-end ML pipeline

2 Real-world dataset handling

3 Model comparison and selection

4 Explainable AI (XAI)

5 Full-stack development skills
