import stockPredictor
from sklearn.metrics import accuracy_score

tickers = ["AAPL", "AMZN", "GOOGL", "NVDA", "AVGO", "META", "PLTR", "ORCL",
           "JPM", "V", "NFLX", "LLY", "WMT", "WEN", "F", "AMD",
           "JNJ", "AAL", "XOM", "MA"]

scores= {}

for ticker in tickers:
    print (ticker)
    print("-----------------")

    stockPredictor.train(ticker)

    for clf in (stockPredictor.log, stockPredictor.rf, stockPredictor.svm,
                stockPredictor.voting_clf, stockPredictor.ada_clf):
        clf.fit(stockPredictor.X_train, stockPredictor.y_train)
        y_pred = clf.predict(stockPredictor.X_test)
        print(clf.__class__.__name__, accuracy_score(stockPredictor.y_test, y_pred))

        # first search if model name is in scores list, if not add it
        if clf.__class__.__name__ not in scores:
            scores[clf.__class__.__name__] = []
        # add accuracy to list
        scores[clf.__class__.__name__].append(accuracy_score(stockPredictor.y_test, y_pred))

    print("")

# Print average scores
print("Average Scores")
for name, scores, in scores.items():
    avg = sum(scores) / len(scores)
    print(name, avg)
