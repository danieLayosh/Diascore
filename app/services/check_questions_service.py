from fastapi import HTTPException

INCONSISTENCY_ROWS = [
    1, 3, 5, 10, 11, 16, 18, 33, 43,
    48, 11, 33, 45, 20, 26, 21, 52, 38,
    52, 54
]
NEGATIVITY_ROWS = [
    30, 44, 46, 47, 53, 55, 56, 57, 59, 63
]
ISCI_COMBO = [
    'inhibition', 'emotional control'
]
FI_COMBO = [
    'shifting', 'emotional control'   
]
EMI_COMBO = [
    'working memory', 'plan/org'
]
INHIBITION_ROWS = [ 3, 8, 13, 18, 23, 28, 33, 38, 43, 48, 52, 54, 56, 58, 60, 62 ] #16
SHIFTING_ROWS = [ 5, 10, 15, 20, 25, 30, 35, 40, 45, 50 ] #10
EMOTIONAL_CONTROL_ROWS = [ 1, 6, 11, 16, 21, 26, 31, 36, 41, 46 ] #10
WORKING_MEMORY_ROWS = [ 2, 7, 12, 17, 22, 27, 32, 37, 42, 47, 51, 53, 55, 57, 59, 61, 63 ] #17
PLAN_ORG_ROWS = [ 4, 9, 14, 19, 24, 29, 34, 39, 44, 49 ] #10

def check_questions(answers: list):
    # Check if all questions have been answered
    if len(answers) != 63:
        raise HTTPException(status_code=400, detail="All questions must be answered")
    
    # Check if all scores are either 1, 2, or 3
    are_all_valid = all(score in [1, 2, 3] for score in answers)
    if not are_all_valid:
        raise HTTPException(status_code=400, detail="All scores must be 1, 2, or 3")
    
    # Sum all the scores to get GEC score
    total = sum(answers)
    
    
    