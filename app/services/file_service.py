import os
from fastapi import HTTPException

DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../data/brief'))

def get_fileName_full_path(gender: str, age: float, file_type: str, pORt: str, kORs: str) -> str:
    """Constructs the file name based on gender, age, file type, and kORs."""
    
    # Validate pORt
    if pORt.lower() not in ["p", "t"]:
        raise HTTPException(status_code=400, detail="Invalid pORt specified. Must be 'p' or 't'.")

    # Determine the base directory based on kORs
    if kORs.lower() == "school":
        base_dir = "briefSchool"
    elif kORs.lower() == "kids":
        base_dir = "briefP"
    else:
        raise HTTPException(status_code=400, detail="Invalid kORs specified. Must be 'school' or 'kids'.")

    # Set the correct directory based on the pORt
    dir = os.path.join(DATA_DIR, base_dir, "Parents" if pORt.lower() == "p" else "Teachers")
    
    # Validate the age range
    if age < 2.0 or age > 5.11:
        raise HTTPException(status_code=400, detail="Age not supported")

    age_range = "2.0-3.11" if age <= 3.11 else "4.0-5.11"
    gender_prefix = 'b_' if gender.lower() == 'boy' else 'g_'
    
    # Validate file type
    if file_type.lower() not in ["gen", "i", "s"]:
        raise HTTPException(status_code=400, detail="Invalid file type specified. Must be 'gen', 'I', or 'S'.")

    # Create the file name
    file_name = f"{gender_prefix}{age_range}_{file_type}.xlsx"
    
    # Combine the directory and file name to get the full path
    return os.path.join(dir, file_name)