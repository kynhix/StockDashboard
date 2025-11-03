from sklearn.ensemble import RandomForestClassifier

import yfinance as yf

# Set stock to predict, training %
TICKER = 'AAPL'
TRAINING_DATA_PERCENT = 0.8

# Get stock data past 5 years
data = yf.Ticker(TICKER).history(period='3y')

print("a")
# Extract features from data, % change over 1 day in price and volume, and price range for that day
data['Returns_1d'] = data['Close'].pct_change(1)
data['Volume_Change'] = data['Volume'].pct_change(1)
data['Price_Range'] = (data['High'] - data['Low']) / data['Close']


# Label over 3 days, 1 if went up, 0 if went down
price_in_3_days = data['Close'].shift(-3)
data['Label'] = (price_in_3_days > data['Close']).astype(int)

# Remove incomplete data rows (last 3 in this case)
data = data.dropna()


features = ['Returns_1d', 'Volume_Change', 'Price_Range']

# Set features & Label
X = data[features].values
Y = data['Label'].values

# Set training and test sizes based on selected %
trainingsize = int(len(X) * TRAINING_DATA_PERCENT)
testsize = len(X) - trainingsize


X_train = X[:trainingsize]
y_train = Y[:trainingsize]

X_test = X[trainingsize:]
y_test = Y[trainingsize:]


# Random Forest training
print("Training model with ", trainingsize, " samples")
rf = RandomForestClassifier(n_estimators=150, max_depth=6, random_state=42)
rf.fit(X_train, y_train)

# Predictions
print("Predicting on test set with ", testsize, " samples")
predictions = rf.predict(X_test)
results = rf.predict(X_test)

# Calculate accuracy
from sklearn.metrics import accuracy_score

accuracy = accuracy_score(y_test, predictions)
correct = int(accuracy * testsize)

print(f"\nAccuracy: {accuracy:.2%}")
print(f"Correct: {correct}/{testsize}")

# Get last data for last prediction (dsiplay)
latest_data = X[-1:]

# Make predicion
prediction = rf.predict(latest_data)[0]

# Display results
if prediction == 1:
    print("\nPrediction: Buy")
else:
    print("\nPrediction: Sell")

# Display current price
last_price = data['Close'].values[-1]
print(f"Current price: ${last_price:.2f}")
