from fastapi import APIRouter, HTTPException
import pandas as pd
import os

router = APIRouter()

# Define the path to the Excel files directory
DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../data/breif/briefP'))

def get_file_name(gender: str, age: float, file_type: str, pORt: str) -> str:
    """Constructs the file name based on gender, age, and file type."""
       
    if pORt.lower() not in ["p", "t"]:
        raise HTTPException(status_code=400, detail="Invalid pORt specified. Must be 'p' or 't'.")

    # Set the correct directory based on the pORt
    if pORt.lower() == "p":
        dir = os.path.join(DATA_DIR, "Parents")
    else:
        dir = os.path.join(DATA_DIR, "Teachers")
    
    # Validate the age range
    if age >= 2.0 and age <= 3.11:
        age_range = "2.0-3.11"
    elif age >= 4.0 and age <= 5.11:
        age_range = "4.0-5.11"
    else:
        raise HTTPException(status_code=400, detail="Age not supported")

    gender_prefix = 'b_' if gender.lower() == 'boy' else 'g_'
    
    # Create the file name
    file_name = f"{gender_prefix}{age_range}_{file_type}.xlsx"
    return file_name

def load_excel_file(gender: str, age: float, file_type: str) -> pd.DataFrame:
    """Loads the appropriate Excel file based on gender, age, and file type."""
    file_name = get_file_name(gender, age, file_type)
    file_path = os.path.join(DATA_DIR, file_name)

    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail=f"File {file_name} not found")
    
    return pd.read_excel(file_path)

@router.get("/scores/{raw_score}")
async def get_scores(raw_score: int, gender: str, age: float, file_type: str):
    # Validate gender
    if gender.lower() not in ["boy", "girl"]:
        raise HTTPException(status_code=400, detail="Invalid gender specified. Must be 'boy' or 'girl'.")

    # Load the correct Excel file based on gender, age, and file type
    score_df = load_excel_file(gender.lower(), age, file_type)

    # Search for the raw score in the data
    row = score_df[score_df['raw_score'] == raw_score]

    if row.empty:
        raise HTTPException(status_code=404, detail="Score not found")

    # Return the found score as a dictionary
    result = {
        "isci": row['isci'].values[0],
        "fi": row['fi'].values[0],
        "emi": row['emi'].values[0]
    }
    return result
