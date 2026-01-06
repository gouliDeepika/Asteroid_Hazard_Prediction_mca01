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

Explain predictions using:

1 Feature Importance (global)

2 SHAP Explainability (local)

Provide an interactive and user-friendly dashboard for both normal users and experts

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


(UPDATING FEATURES) (04/01/2026)


Dataset Imbalance Handling

The asteroid dataset used in this project contains 90,836 records and is naturally imbalanced.
This means the number of non-hazardous asteroids is much higher than hazardous asteroids.

This imbalance is expected in real-world data because most asteroids do not pose a threat to Earth, and only a small percentage are classified as hazardous.

Why This Is Acceptable

The dataset reflects real asteroid distribution

Imbalanced data is common in real-world machine learning problems

It makes the project more realistic and practical

How Imbalance Is Handled

Instead of relying only on accuracy (which can be misleading for imbalanced data), this project uses:

Confusion Matrix

Precision

Recall

F1-score

Special importance is given to Recall for the Hazardous class, as identifying hazardous asteroids is critical.

Model-Level Solution

To handle class imbalance effectively, class-weighted machine learning models are used.
This ensures that the model pays more attention to the minority (hazardous) class during training.

Conclusion

The imbalanced nature of the dataset does not negatively affect the project.
Proper evaluation metrics and imbalance-handling techniques ensure that the model performs reliably in predicting hazardous asteroids.


(UPDATING FEATURES) (05/01/2026)


Daily Progress & Model Improvement

This project is actively maintained with daily commits as part of continuous learning and improvement.

Dataset Imbalance Handling

The asteroid dataset used in this project is imbalanced, where hazardous asteroids form a minority class.

~90% → Non-Hazardous

~10% → Hazardous

Due to this imbalance, relying only on accuracy can be misleading.

Initial Results

In the initial experiments:

Models achieved ~91% accuracy

However, predictions were biased toward Non-Hazardous asteroids

Several hazardous asteroids were missed

Missing a hazardous asteroid is critical in real-world applications.

Applied Improvements

To make the model safer and more reliable, the following techniques were applied:

1 Class Weight Balancing

Class imbalance was handled using:

class_weight = "balanced"


This forces the model to give higher importance to hazardous asteroids.

2 Hyperparameter Tuning

Model parameters such as:

tree depth

number of estimators

regularization strength

were tuned to improve both accuracy and recall.

3 Ensemble Learning

Advanced ensemble models were used:

Random Forest

XGBoost

These models reduce bias and improve generalization on imbalanced data.

Accuracy vs Recall Trade-off

After applying class balancing:

Accuracy initially dropped to ~79%

Recall and F1-score improved significantly

Hazardous asteroid detection became more reliable

After tuning:

Accuracy improved again to ~88–91%

While maintaining better hazardous detection

✅ In safety-critical systems, recall is more important than raw accuracy.
