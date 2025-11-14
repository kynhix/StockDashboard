import yfinance as yf
from typing import Dict, Optional

def get_stock_detail(symbol: str) -> Optional[Dict]:
    try:
        ticker = yf.Ticker(symbol)
        info = ticker.info
        hist = ticker.history(period="1d")
        
        if hist.empty:
            return None
        
        # calculate price movement
        current_price = hist["Close"].iloc[-1]
        prev_close = info.get("previousClose", current_price)
        price_change = current_price - prev_close
        percent_change = (price_change / prev_close * 100) if prev_close else 0
        
        # return all relevant stock metrics
        return {
            "symbol": symbol.upper(),
            "name": info.get("longName", symbol),
            "current_price": round(float(current_price), 2),
            "price_change": round(float(price_change), 2),
            "percent_change": round(float(percent_change), 2),
            "market_cap": info.get("marketCap"),
            "pe_ratio": info.get("trailingPE"),
            "volume": int(hist["Volume"].iloc[-1]),
            "avg_volume": info.get("averageVolume"),
            "high_52w": info.get("fiftyTwoWeekHigh"),
            "low_52w": info.get("fiftyTwoWeekLow"),
            "dividend_yield": info.get("dividendYield"),
            "beta": info.get("beta"),
            "eps": info.get("trailingEps"),
            "revenue": info.get("totalRevenue"),
            "earnings": info.get("netIncomeToCommon")
        }
    except Exception as e:
        return None