import pandas as pd
import os
from fastapi import HTTPException
from .file_service import get_fileName_full_path

def load_excel_file(gender: str, age: float, file_type: str, pORt: str, kORs: str) -> pd.DataFrame:
    """Loads the appropriate Excel file based on gender, age, and file type."""
    file_path = get_fileName_full_path(gender, age, file_type, pORt, kORs)

    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail=f"File {file_path} not found")
    
    return pd.read_excel(file_path)

def return_scores(score_list: list, total_df: pd.DataFrame, combind_pd: pd.DataFrame, normal_pd: pd.DataFrame) -> dict:
    """Returns the scores as a dictionary."""
    result = {}
    
    result['total'] = [int(get_total_score(score_list[0], total_df))]  # Convert to int
    
    combind_scores = score_list[1:4]  # Extracts 3 scores starting from the second item
    result['combind'] = [int(get_combind_score(combind_scores, combind_pd))]  # Convert to int
    
    normal_scores = score_list[4:9]  # Extracts 5 scores starting from the fifth item
    result['normal'] = [int(get_normal_score(normal_scores, normal_pd))]  # Convert to int
    
    return result

def get_total_score(raw_score: int, pd: pd.DataFrame) -> int:
    """Returns the total score based on the raw score."""
    pd.columns = pd.columns.str.strip().str.lower()

    if 'raw score' not in pd.columns:
        raise ValueError("Column 'raw score' not found in the DataFrame")

    res = pd[pd['raw score'] == raw_score]

    if not res.empty:
        return int(res['t score'].values[0])  # Convert to int
    else:
        raise ValueError(f"No matching entry found for raw score: {raw_score}")


def get_combind_score(scores: list, pd: pd.DataFrame) -> int:
    """Returns the combind score based on the raw score."""
    # Implement your logic here
    return 0  # Placeholder

def get_normal_score(scores: list, pd: pd.DataFrame) -> int:
    """Returns the normal score based on the raw score."""
    # Implement your logic here
    return 0  # Placeholder
