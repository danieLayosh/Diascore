from fastapi import APIRouter, UploadFile, HTTPException
from models.omrModels import OMRResponse
from services.omr import do_omr_two_pages, read_image
from typing import List

omrRouter = APIRouter()

@omrRouter.post("/process-omr", response_model=OMRResponse)
async def process_omr(files: List[UploadFile]):
    try:
        # Convert each uploaded file into an image
        images = [read_image(file) for file in files]
        # Call the OMR function with the list of images
        answers = do_omr_two_pages(images)
        sorted_answers = {k: answers[k] for k in sorted(answers)}
        return {"answers": sorted_answers}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")