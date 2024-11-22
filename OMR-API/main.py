from fastapi import FastAPI
import uvicorn
import app.services.omr as omr

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Welcome to the DIASCORE-OMR FastAPI application"}

if __name__ == '__main__':
    # uvicorn.run(app, host="127.0.0.1", port=8000)
    omr.do_omr("OMR-API/app/data/testing_markes_and_angels/IMG_1018.JPG")