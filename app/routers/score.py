from fastapi import APIRouter
from services.excel_service import process_all_scores
from models.ScoreRequest import ProcessingRequest, processrequestDone

router = APIRouter()

@router.post("/scores/kids/")
async def get_scores(request: ProcessingRequest) -> processrequestDone:
    requestDone = process_all_scores(request)
    return requestDone