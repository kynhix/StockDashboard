from sklearn.ensemble import RandomForestClassifier, VotingClassifier, AdaBoostClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.metrics import precision_score, recall_score
from sklearn.tree import DecisionTreeClassifier
import yfinance as yf



# training %
TRAINING_DATA_PERCENT = 0.8


def train(ticker):

    global data, X_train, X_test, y_train, y_test, rf, \
        trainingsize, testsize, X, log, svm, voting_clf, bag_clf, ada_clf
    # Get stock data past 5 years
    data = yf.Ticker(ticker).history(period='5y')

    # Extract features from data, % change over 1 day in price and volume, and price range for that day
    data['Returns_1d'] = data['Close'].pct_change(1)
    data['Volume_Change'] = data['Volume'].pct_change(1)
    #FIX ME: ADD Price_Range TO FEATURES WHEN UNCOMMENTED
    #data['Price_Range'] = (data['High'] - data['Low']) / data['Close']
    #FIX ME: ADD SMA_20 TO FEATURES WHEN UNCOMMENTED
    #data['SMA_20'] = data['Close'].rolling(window=20).mean()

    #Rsi down to 7 from 14
    delta = data['Close'].diff(1)
    gain = delta.where(delta > 0, 0)
    loss = -delta.where(delta < 0, 0)
    avg_gain = gain.rolling(window = 7).mean()
    avg_loss = loss.rolling(window = 7).mean()
    rs = avg_gain / avg_loss
    data['RSI'] = 100 - (100 / (1 + rs))

    #MACD
    data['MACD'] = data['Close'].ewm(span=2).mean() - data['Close'].ewm(span=5).mean()


    # Label over 3 days, 1 if went up, 0 if went down
    price_in_3_days = data['Close'].shift(-3)
    data['Label'] = (price_in_3_days > data['Close']).astype(int)

    # Remove incomplete data rows (last 3 in this case)
    data = data.dropna()


    features = ['Returns_1d', 'Volume_Change', 'RSI', 'MACD']

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


    # Models for soft voting classifier

    svm = SVC(probability=True, C=0.1, kernel='rbf')
    svm.fit(X_train, y_train)

    rf = RandomForestClassifier(max_depth= 10, max_leaf_nodes= 16, n_estimators= 100, n_jobs=-1)
    rf.fit(X_train, y_train)

    log = LogisticRegression(C=0.1, max_iter=500)
    log.fit(X_train, y_train)

    ada_clf = AdaBoostClassifier(
        DecisionTreeClassifier(max_depth=2), learning_rate=0.1, n_estimators=100)
    ada_clf.fit(X_train, y_train)

    # Soft voting classifier
    voting_clf = VotingClassifier(
        estimators=[('rf', rf), ('log', log), ('svm', svm), ('ada_clf', ada_clf)],
        voting='soft', n_jobs=-1
    )
    voting_clf.fit(X_train, y_train)


def prediction(ticker):

    train(ticker)

    # Predictions
    print("Predicting on test set with ", testsize, " samples")
    predictions = voting_clf.predict(X_test)

    # Calculate accuracy
    from sklearn.metrics import accuracy_score

    accuracy = accuracy_score(y_test, predictions)
    precision = precision_score(y_test, predictions, average='weighted')
    recall = recall_score(y_test, predictions, average='weighted')
    correct = int(accuracy * testsize)

    print(f"\nAccuracy: {accuracy:.2%}")
    print(f"Correct: {correct}/{testsize}")

    # Get last data for last prediction (display)
    latest_data = X[-1:]

    # Make prediction
    latest_prediction = rf.predict(latest_data)[0]

    if latest_prediction == 1:
        predictionString = "Buy"
    else:
        predictionString = "Sell"

    last_price = data['Close'].values[-1]
    print(f"Current price: ${last_price:.2f}")


    evaluation = [accuracy, precision, recall, predictionString, last_price, ticker]

    return evaluation