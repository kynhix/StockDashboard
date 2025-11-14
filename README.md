# stock dashboard

## setup

### backend


cd backend
pip install -r requirements.txt
uvicorn main:app --reload


optional: use a virtual environment

python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload


### dashboard


cd dashboard
npm install
npm run dev

