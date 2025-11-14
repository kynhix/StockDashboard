import yfinance as yf
from datetime import datetime, timedelta
from typing import List, Dict, Optional
from config.watchlist import WATCHLIST

# cache trending stocks 
_cache = {"data": None, "timestamp": None}
CACHE_DURATION = timedelta(minutes=5)

def get_trending_stocks(limit: int = 25) -> List[Dict]:
    now = datetime.now()
    
    # return cached data if valid
    if _cache["data"] and _cache["timestamp"]:
        if now - _cache["timestamp"] < CACHE_DURATION:
            return _cache["data"][:limit]
    
    stocks = []
    tickers = yf.Tickers(" ".join(WATCHLIST))
    
    # fetch data for each stock in watchlist
    for symbol in WATCHLIST:
        try:
            ticker = tickers.tickers[symbol]
            info = ticker.info
            hist = ticker.history(period="1d")
            
            if hist.empty or len(hist) == 0:
                continue
            
            # calculate price change and percent change
            current_price = hist["Close"].iloc[-1]
            prev_close = info.get("previousClose", current_price)
            price_change = current_price - prev_close
            percent_change = (price_change / prev_close * 100) if prev_close else 0
            volume = hist["Volume"].iloc[-1]
            
            stocks.append({
                "symbol": symbol,
                "current_price": round(float(current_price), 2),
                "price_change": round(float(price_change), 2),
                "percent_change": round(float(percent_change), 2),
                "volume": int(volume)
            })
        except Exception as e:
            continue
    
    # sort by volume active at top
    stocks.sort(key=lambda x: x["volume"], reverse=True)
    
    # update cache
    _cache["data"] = stocks
    _cache["timestamp"] = now
    
    return stocks[:limit]