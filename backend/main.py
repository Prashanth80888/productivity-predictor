from flask import Flask, request, jsonify
from flask_cors import CORS
import math
import os   # ✅ added for deployment

app = Flask(__name__)
CORS(app)

# -----------------------------
# LOAD DATA
# -----------------------------
data = []

try:
    with open("student_productivity.csv", "r") as f:
        lines = f.readlines()[1:]
        for line in lines:
            values = list(map(int, line.strip().split(",")))
            data.append(values)
except FileNotFoundError:
    print("❌ CSV file not found. Make sure it's in the same folder.")
    exit()

# Split features and labels
X = [row[:-1] for row in data]
y = [row[-1] for row in data]

n_features = len(X[0])
weights = [0.0] * n_features
bias = 0.0

# -----------------------------
# SIGMOID FUNCTION
# -----------------------------
def sigmoid(z):
    try:
        return 1 / (1 + math.exp(-z))
    except OverflowError:
        return 0 if z < 0 else 1

# -----------------------------
# TRAIN MODEL
# -----------------------------
def train_model():
    global weights, bias

    learning_rate = 0.01
    epochs = 1000

    for epoch in range(epochs):
        dw = [0.0] * n_features
        db = 0.0

        for i in range(len(X)):
            z = sum(weights[j] * X[i][j] for j in range(n_features)) + bias
            y_pred = sigmoid(z)
            error = y_pred - y[i]

            for j in range(n_features):
                dw[j] += error * X[i][j]

            db += error

        for j in range(n_features):
            weights[j] -= learning_rate * dw[j] / len(X)

        bias -= learning_rate * db / len(X)

        if epoch % 200 == 0:
            print(f"Epoch {epoch} completed")

    print("✅ Model trained successfully!")

# Train once
train_model()

# -----------------------------
# HEALTH CHECK
# -----------------------------
@app.route("/")
def home():
    return jsonify({"message": "API is running 🚀"})

# -----------------------------
# PREDICT ROUTE
# -----------------------------
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json

        required_fields = ["study_hours", "phone_usage", "sleep", "breaks", "noise"]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing field: {field}"}), 400

        input_data = [
            float(data["study_hours"]),
            float(data["phone_usage"]),
            float(data["sleep"]),
            float(data["breaks"]),
            float(data["noise"])
        ]

        # -----------------------------
        # PREDICTION
        # -----------------------------
        z = sum(weights[j] * input_data[j] for j in range(n_features)) + bias
        prob = sigmoid(z)
        result = 1 if prob > 0.5 else 0

        # -----------------------------
        # SMART SUGGESTIONS
        # -----------------------------
        suggestions = []

        if input_data[1] > 5:
            suggestions.append("📱 Reduce phone usage")

        if input_data[2] < 6:
            suggestions.append("😴 Improve sleep schedule")

        if input_data[0] < 4:
            suggestions.append("📚 Increase study hours")

        if input_data[3] > 4:
            suggestions.append("⏳ Reduce unnecessary breaks")

        if input_data[4] == 1:
            suggestions.append("🔇 Try a quieter environment")

        # -----------------------------
        # RESPONSE
        # -----------------------------
        return jsonify({
            "prediction": "Focused" if result == 1 else "Distracted",
            "probability": round(prob, 4),
            "suggestions": suggestions
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# -----------------------------
# RUN SERVER (IMPORTANT CHANGE)
# -----------------------------
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # ✅ required for Render
    app.run(host="0.0.0.0", port=port)