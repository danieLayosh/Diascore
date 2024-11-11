from fastapi import FastAPI
import uvicorn
from routers.questions import router_questions

app = FastAPI()

app.include_router(router_questions)

@app.get("/")
def read_root():
    return {"message": "Welcome to the DIASCORE-BASCKEND FastAPI application"}

if __name__ == '__main__':
    uvicorn.run(app, host="127.0.0.1", port=8000)