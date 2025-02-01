from datetime import datetime as date
import numpy as np
import csv, os, random
SCHOOLS = {
    "MSU": ["case", "brody", "shaw"] 
}
FOOD_TYPES = ["beef", "cheese", "milk", "rice", "bread"]

for name, halls in SCHOOLS.items():
    for hall in halls:
        folder = f"./public/{name}/{hall}/"
        # Food Input
        data = [["date", "amount", "type"]]
        for day in range(1, 31+1):
            for _ in range(random.randint(1, 5)):
                index = random.randint(0, len(FOOD_TYPES)-1)
                data.append([date(2025, 1, day).strftime("%Y-%m-%d"), random.randint(10, 30), FOOD_TYPES[index]])
            
        with open(os.path.join(folder, "input.csv"), 'w', newline='') as file:
            writer = csv.writer(file)
            writer.writerows(data)
        # Food Waste
        data = [["date", "amount"]]
        for day in range(1, 31+1):
            data.append([date(2025, 1, day).strftime("%Y-%m-%d"), random.randint(10, 30)])
            
        with open(os.path.join(folder, "waste.csv"), 'w', newline='') as file:
            writer = csv.writer(file)
            writer.writerows(data)
        # Student Flow
        data = [["dateTime", "amount"]]
        for day in range(1, 31+1):
            for hour in range(8, 12+9):
                data.append([date(2025, 1, day, hour, 0, 0).strftime("%Y-%m-%d:%H-%M"), random.randint(100, 300)])
            
        with open(os.path.join(folder, "flow.csv"), 'w', newline='') as file:
            writer = csv.writer(file)
            writer.writerows(data)
