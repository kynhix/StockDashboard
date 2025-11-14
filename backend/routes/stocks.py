from fastapi import APIRouter, HTTPException
from services.trending import get_trending_stocks
from services.stock_detail import get_stock_detail
from services.stock_history import get_stock_history

router = APIRouter()

@router.get("/stocks")
async def list_stocks():
    # get 25 trending stocks sorted by volume
    try:
        stocks = get_trending_stocks(limit=25)
        return {"stocks": stocks}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/stock/{symbol}")
async def get_stock(symbol: str):
    # get detailed info for a specific stock
    detail = get_stock_detail(symbol)
    if not detail:
        raise HTTPException(status_code=404, detail="Stock not found")
    return detail

@router.get("/chart/{symbol}")
async def get_chart(symbol: str, period: str = "3mo"):
    # get candlestick chart data
    history = get_stock_history(symbol, period)
    if not history:
        raise HTTPException(status_code=404, detail="Stock not found")
    return history

@router.get("/predict/{symbol}")
async def get_prediction(symbol: str):
    # ML prediction endpoint (placeholder)
    return {"message": "ML model not yet integrated"}