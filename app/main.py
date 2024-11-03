from fastapi import FastAPI
import pandas as pd
from api.endpoints import scores

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI application"}

if __name__ == '__main__':
    # import uvicorn
    # uvicorn.run(app, host="127.0.0.1", port=8000)
    # app()
    scores