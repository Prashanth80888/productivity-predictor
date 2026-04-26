import pandas as pd
import random

data = []

for i in range(300):
    study_hours = random.randint(1, 10)
    phone_usage = random.randint(1, 10)
    sleep = random.randint(4, 9)
    breaks = random.randint(1, 6)
    noise = random.randint(0, 1)  # 0 = low, 1 = high

    # Simple logic for label (you can improve later)
    if study_hours > 5 and phone_usage < 5 and sleep >= 6:
        label = 1  # Focused
    else:
        label = 0  # Distracted

    data.append([study_hours, phone_usage, sleep, breaks, noise, label])

df = pd.DataFrame(data, columns=[
    "study_hours", "phone_usage", "sleep", "breaks", "noise", "label"
])

df.to_csv("student_productivity.csv", index=False)

print("Dataset created successfully!")