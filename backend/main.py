from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.stocks import router as stocks_router

app = FastAPI(title="Stock Dashboard API", version="1.0.0")

# allow requests from next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# stock endpoints
app.include_router(stocks_router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Stock Dashboard API", "version": "1.0.0"}

@app.get("/health")
async def health():
    return {"status": "healthy"}