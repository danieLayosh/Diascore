from fastapi import APIRouter, HTTPException
from services.excel_service import load_excel_file, return_scores

router = APIRouter()

@router.get("/scores/kids/")
async def get_scores(scores: list, gender: str, age: float, pORt: str, kORs: str):
    # Validate gender
    if gender.lower() not in ["boy", "girl"]:
        raise HTTPException(status_code=400, detail="Invalid gender specified. Must be 'boy' or 'girl'.")

    # Load the correct Excel file based on gender, age, and file type
    total_pd = load_excel_file(gender.lower(), age, "gen", pORt, kORs)
    combind_pd = load_excel_file(gender.lower(), age, "I", pORt, kORs)
    normal_pd = load_excel_file(gender.lower(), age, "S", pORt, kORs)
        
    return return_scores(scores, combind_pd, total_pd, normal_pd)
