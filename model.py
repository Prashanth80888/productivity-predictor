import math

# -----------------------------
# STEP 1: Load Dataset (CSV)
# -----------------------------
data = []

with open("student_productivity.csv", "r") as f:
    lines = f.readlines()[1:]  # skip header
    for line in lines:
        values = line.strip().split(",")
        values = list(map(int, values))
        data.append(values)

# Split features and labels
X = [row[:-1] for row in data]
y = [row[-1] for row in data]

# -----------------------------
# STEP 2: Initialize weights
# -----------------------------
n_features = len(X[0])
weights = [0.0] * n_features
bias = 0.0

# -----------------------------
# STEP 3: Sigmoid function
# -----------------------------
def sigmoid(z):
    return 1 / (1 + math.exp(-z))

# -----------------------------
# STEP 4: Train model
# -----------------------------
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

    # Update weights
    for j in range(n_features):
        weights[j] -= learning_rate * dw[j] / len(X)

    bias -= learning_rate * db / len(X)

    if epoch % 100 == 0:
        print(f"Epoch {epoch} completed")

# -----------------------------
# STEP 5: Prediction function
# -----------------------------
def predict(input_data):
    z = sum(weights[j] * input_data[j] for j in range(n_features)) + bias
    prob = sigmoid(z)
    return 1 if prob > 0.5 else 0

# -----------------------------
# STEP 6: Test the model
# -----------------------------
test = [6, 2, 7, 2, 0]  # sample input

result = predict(test)

print("Prediction:", "Focused" if result == 1 else "Distracted")