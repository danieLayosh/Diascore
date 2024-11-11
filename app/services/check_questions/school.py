from fastapi import HTTPException
from typing import List

INCONSISTENCY_ROWS_A = [7, 11, 27, 33, 38, 41, 42, 44, 53, 55]
INCONSISTENCY_ROWS_B = [25, 22, 17, 32, 59, 65, 63, 54, 60, 44]
NEGATIVITY_ROWS = [8, 13, 23, 30, 62, 71, 80, 83, 85]

INHIBITION_ROWS = [38, 41, 43, 44, 54, 55, 56, 59, 65]
SHIFTING_ROWS = [5, 6, 8, 12, 13, 23, 30, 39]
EMOTIONAL_CONTROL_ROWS = [1, 7, 20, 25, 26, 45, 50, 62, 64, 70]
INITIATE_ROWS = [3, 10, 16, 47, 48, 61, 66, 71]
WORKING_MEMORY_ROWS = [2, 9, 17, 20, 24, 27, 32, 33, 37, 57]
PLAN_ORG_ROWS = [11, 15, 18, 22, 28, 35, 36, 40, 46, 51, 53, 58]
ORG_OF_MAT_ROWS = [4, 29, 67, 68, 69, 72]
MONITOR_ROWS = [14, 21, 31, 34, 42, 52, 60, 63]

def check_questions(answers: List[int]):
     # Check if the answers list is empty
    if not answers:
        raise HTTPException(status_code=400, detail="Answers list cannot be empty")
    
    # Check if all questions have been answered
    if len(answers) != 86:
        raise HTTPException(status_code=400, detail="All questions must be answered")
    
    # Check if all scores are either 1, 2, or 3
    if not all(score in [1, 2, 3] for score in answers):
        raise HTTPException(status_code=400, detail="All scores must be 1, 2, or 3")
    
    scores = {}
    
    # Sum all the scores
    scores['total'] = sum(answers)
    scores['inhibition'] = sum(answers[row - 1] for row in INHIBITION_ROWS)
    scores['shifting'] = sum(answers[row - 1] for row in SHIFTING_ROWS)
    scores['emotional control'] = sum(answers[row - 1] for row in EMOTIONAL_CONTROL_ROWS)
    scores['initiate'] = sum(answers[row - 1] for row in INITIATE_ROWS)
    scores['working memory'] = sum(answers[row - 1] for row in WORKING_MEMORY_ROWS)
    scores['plan/org'] = sum(answers[row - 1] for row in PLAN_ORG_ROWS)
    scores['org of mat'] = sum(answers[row - 1] for row in ORG_OF_MAT_ROWS)
    scores['monitor'] = sum(answers[row - 1] for row in MONITOR_ROWS)
    
    # Calculate the combination scores
    scores['bri'] = scores['shifting'] + scores['emotional control'] + scores['initiate']
    scores['mi'] = scores['initiate'] + scores['working memory'] + scores['plan/org'] + scores['org of mat'] + scores['monitor']
    scores['gec'] = scores['bri'] + scores['mi']
    
    # Check if the scores dict is empty
    if not scores:
        raise HTTPException(status_code=400, detail="An error occurred while calculating the scores")
    
    inconsistency_value = check_inconsistency(answers)
    negativity_count = check_negativity(answers)
    
    scores['negativity_count'] = negativity_count
    scores['inconsistency'] = inconsistency_value
    
    if len(scores) != 14:
        raise HTTPException(status_code=400, detail="An error occurred while calculating the scores")
    
    return scores
        
    
def check_negativity(answers):
    """Check for negativity in the answers"""
    
    # count how many questions were answered with 3
    negativity_count = sum(1 for row in NEGATIVITY_ROWS if answers[row - 1] == 3)
    return negativity_count

def check_inconsistency(answers):
    """Check for inconsistency in the answers"""
    
    # Check for valid indices
    if len(INCONSISTENCY_ROWS_A) != len(INCONSISTENCY_ROWS_B):
        raise HTTPException(status_code=400, detail="Inconsistency row lists must have the same length")
    
    # Calculate the inconsistency
    num_list = []
    for i in range(len(INCONSISTENCY_ROWS_A)):
        if (INCONSISTENCY_ROWS_A[i] - 1) < len(answers) and (INCONSISTENCY_ROWS_B[i] - 1) < len(answers):
            inconsistency_value = answers[INCONSISTENCY_ROWS_A[i] - 1] - answers[INCONSISTENCY_ROWS_B[i] - 1]
            num_list.append(inconsistency_value)
            
    return sum(abs(num) for num in num_list)