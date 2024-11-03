from fastapi import APIRouter, HTTPException
from models.ScoreRequest import ScoreRequest
from services.excel_service import load_excel_file, return_scores

router = APIRouter()

@router.post("/scores/kids/")
async def get_scores(request: ScoreRequest):
    # Extract parameters from the request
    scores = request.scores
    gender = request.gender
    age = request.age
    pORt = request.pORt
    kORs = request.kORs
    
    # Validate gender
    if gender.lower() not in ["boy", "girl"]:
        raise HTTPException(status_code=400, detail="Invalid gender specified. Must be 'boy' or 'girl'.")

    # Load the correct Excel file based on gender, age, and file type
    total_pd = load_excel_file(gender.lower(), age, "gen", pORt, kORs)
    combind_pd = load_excel_file(gender.lower(), age, "I", pORt, kORs)
    normal_pd = load_excel_file(gender.lower(), age, "S", pORt, kORs)
        
    return return_scores(scores, combind_pd, total_pd, normal_pd)
