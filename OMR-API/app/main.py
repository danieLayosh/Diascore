from fastapi import FastAPI
import uvicorn
from app.services.omr import do_omr_two_pages
from pprint import pprint  # Importing pprint for neat output formatting

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Welcome to the DIASCORE-OMR FastAPI application"}

if __name__ == '__main__':
    first_page_path = "OMR-API/app/data/testing_markes_and_angels/IMG_1021.JPG"
    second_page_base_path = "OMR-API/app/data/testing_markes_and_angels/second_page/IMG_1172.JPG"

    # Initial test with a specific pair of pages
    result = do_omr_two_pages([
        first_page_path,
        second_page_base_path
    ])

    pprint(result)
