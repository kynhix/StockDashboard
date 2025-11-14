import yfinance as yf
from typing import Dict, List, Optional

def get_stock_history(symbol: str, period: str = "3mo") -> Optional[Dict]:
    #fetch historical ohlc data for candlestick charts
    try:
        ticker = yf.Ticker(symbol)
        hist = ticker.history(period=period)
        
        if hist.empty:
            return None
        
        # format data for chart.js financial
        data = []
        for index, row in hist.iterrows():
            data.append({
                "x": index.strftime("%Y-%m-%d"), 
                "o": round(float(row["Open"]), 2),  
                "h": round(float(row["High"]), 2),  
                "l": round(float(row["Low"]), 2),   
                "c": round(float(row["Close"]), 2), 
                "v": int(row["Volume"])  
            })
        
        return {
            "symbol": symbol.upper(),
            "data": data
        }
    except Exception as e:
        return None