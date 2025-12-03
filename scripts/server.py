from flask import Flask, json
from flask_cors import CORS
import yfinance as yf
import stockPredictor

app = Flask(__name__)
CORS(app)

# 25 stocks I tested that have PE/ PEG/ PB, some smaller stocks do not have that info
STOCKS = [
    "AAPL",
    "TSLA",
    "AMZN",
    "GOOGL",
    "NVDA",
    "AVGO",
    "META",
    "LLY",
    "WMT",
    "JPM",
    "V",
    "WEN",
    "ORCL",
    "PG",
    "NKE",
    "SOFI",
    "F",
    "AMD",
    "PFE",
    "WBD",
    "JNJ",
    "AAL",
    "MA",
    "XOM",
    "NFLX",
]

CACHE = {}


# Send the result from machine learning
@app.route("/predict/<ticker>", methods=["GET"])
def result(ticker):
    # call the prediction function in stockpredictor.py
    result = stockPredictor.prediction(ticker)

    resultsDict = {
        "model": "Soft Voting Classifier Composed of RandomForest, LogisticRegression, SVM, and an AdaBoostClassifier using DecisionTreeClassifiers",
        "accuracy": result[0],
        "precision": result[1],
        "recall": result[2],
        "prediction": result[3],
        "last_price": result[4],
        "ticker": result[5],
    }

    return resultsDict


# /stocks endpoint to retrieve info on 25 predetermined stocks for the sidebar
@app.route("/stocks", methods=["GET"])
def get_stocks():
    # fill with loop
    stockData = []

    # loop for all stocks
    for stock in STOCKS:
        # get data from 7d
        data = CACHE[stock]["history"]

        currentPrice = data["Close"].values[-1]

        # calculate pct change over 1 day as a per
        pctChange1d = (
            (float(data["Close"].values[-1]) - float(data["Close"].values[-2]))
            / float(data["Close"].values[-2])
            * 100
        )
        name = CACHE[stock]["name"]

        # dict to send
        extracted_data = {
            "symbol": stock,
            "price": round(currentPrice, 2),
            "change": round(pctChange1d, 2),
            "name": name,
        }

        stockData.append(extracted_data)

    # convert dictionary to JSON string and send
    resultString = json.dumps(stockData)
    return resultString


# /stock endpoint to fetch more detailed data for a single stock
@app.route("/stock/<stock>", methods=["GET"])
def get_stock(stock):
    # fetch past 7 days data
    data = CACHE[stock]["history"]

    currentPrice = data["Close"].values[-1]

    # calculate absolute price change 1d
    change1d = float(data["Close"].values[-1]) - float(data["Close"].values[-2])

    # dict to send
    extracted_data = {
        "symbol": stock,
        "price": round(currentPrice, 2),
        "change": round(change1d, 2),
        "open": round(data["Open"].values[-1], 2),
        "high": round(data["High"].values[-1], 2),
        "low": round(data["Low"].values[-1], 2),
        "close": round(data["Close"].values[-1], 2),
        "volume": int(data["Volume"].values[-1]),
        "pe": CACHE[stock]["pe"],
    }

    return extracted_data


# Run the server
if __name__ == "__main__":
    # train the model
    # stockPredictor.train()

    # cache data so the requests don't take forever
    for stock in STOCKS:
        # convert stock to ticker object
        ticker = yf.Ticker(stock)

        # get data from 7d
        history = ticker.history(period="7d")

        name = ticker.info["longName"]
        pe = ticker.info["trailingPE"] or None

        CACHE[stock] = {"history": history, "name": name, "pe": pe}

    # start the server
    app.run(port=8000)
