import stockPredictor
from sklearn.model_selection import GridSearchCV

tickers = ["AAPL", "AMZN", "GOOGL", "NVDA", "AVGO", "META", "PLTR", "ORCL",
           "JPM", "V", "NFLX", "LLY", "WMT", "WEN", "F", "AMD",
           "JNJ", "AAL", "XOM", "MA"]

# define parameters to test for each model
param_grid = {
    'svm': {'C': [0.1, 1], 'kernel': ['rbf', 'linear']},
    'rf': {'n_estimators': [100, 300, 500], 'max_leaf_nodes': [16, 32, None], 'max_depth': [None, 10, 20]},
    'log': {'C': [0.01, 0.1, 1], 'max_iter': [500, 1000]},
    'ada': {'n_estimators': [75, 100, 150, 200], 'learning_rate': [0.1, 0.2, 0.3], 'estimator__max_depth': [2, 3]}
}



#run for each ticker
for ticker in tickers:
    print(ticker)
    stockPredictor.train(ticker)

    #SVM -- n_jobs= -1 uses all cpu cores, very slow otherwise
    grid_svm = GridSearchCV(stockPredictor.svm, param_grid['svm'], cv=5, scoring='accuracy', n_jobs=-1)
    grid_svm.fit(stockPredictor.X_train, stockPredictor.y_train)

    print('svm:', grid_svm.best_params_)

    #RF
    grid_rf = GridSearchCV(stockPredictor.rf, param_grid['rf'], cv=5, scoring='accuracy', n_jobs=-1)
    grid_rf.fit(stockPredictor.X_train, stockPredictor.y_train)

    print('rf:', grid_rf.best_params_)

    #LOG
    grid_log = GridSearchCV(stockPredictor.log, param_grid['log'], cv=5, scoring='accuracy', n_jobs=-1)
    grid_log.fit(stockPredictor.X_train, stockPredictor.y_train)

    print('log:', grid_log.best_params_)

    #ADA
    grid_ada = GridSearchCV(stockPredictor.ada_clf, param_grid['ada'], cv=5, scoring='accuracy', n_jobs=-1)
    grid_ada.fit(stockPredictor.X_train, stockPredictor.y_train)

    print('ada:', grid_ada.best_params_)