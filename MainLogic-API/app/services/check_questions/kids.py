from fastapi import HTTPException
from typing import List

INCONSISTENCY_ROWS_A = [ 1, 3, 5, 10, 11, 16, 18, 33, 43, 48]
INCONSISTENCY_ROWS_B = [ 11, 33, 45, 20, 26, 21, 52, 38, 52, 54]
NEGATIVITY_ROWS = [ 30, 44, 46, 47, 53, 55, 56, 57, 59, 63]

INHIBITION_ROWS = [ 3, 8, 13, 18, 23, 28, 33, 38, 43, 48, 52, 54, 56, 58, 60, 62 ] 
SHIFTING_ROWS = [ 5, 10, 15, 20, 25, 30, 35, 40, 45, 50 ] 
EMOTIONAL_CONTROL_ROWS = [ 1, 6, 11, 16, 21, 26, 31, 36, 41, 46 ] 
WORKING_MEMORY_ROWS = [ 2, 7, 12, 17, 22, 27, 32, 37, 42, 47, 51, 53, 55, 57, 59, 61, 63 ] 
PLAN_ORG_ROWS = [ 4, 9, 14, 19, 24, 29, 34, 39, 44, 49 ]


def check_questions(answers: List[int]):    
    # Check if all questions have been answered
    if len(answers) != 63:
        raise HTTPException(status_code=400, detail=f"All questions must be answered, only {len(answers)} questions were answered")
    
    scores = {}
    
    # Sum all the scores
    scores['total'] = sum(answers)
    scores['inhibition'] = sum(answers[row - 1] for row in INHIBITION_ROWS)
    scores['shifting'] = sum(answers[row - 1] for row in SHIFTING_ROWS)
    scores['emotional control'] = sum(answers[row - 1] for row in EMOTIONAL_CONTROL_ROWS)
    scores['working memory'] = sum(answers[row - 1] for row in WORKING_MEMORY_ROWS)
    scores['plan/org'] = sum(answers[row - 1] for row in PLAN_ORG_ROWS)
    
    # Calculate the combination scores
    scores['isci'] = scores['inhibition'] + scores['emotional control']
    scores['fi'] = scores['shifting'] + scores['emotional control']
    scores['emi'] = scores['working memory'] + scores['plan/org']
    
    # Check if the scores dict is empty
    if not scores:
        raise HTTPException(status_code=400, detail="An error occurred while calculating the scores")
    
    inconsistency_value = check_inconsistency(answers)
    negativity_count = check_negativity(answers)
    
    scores['negativity_count'] = negativity_count
    scores['inconsistency'] = inconsistency_value
    
    if len(scores) != 11:
        raise HTTPException(status_code=400, detail=f"An error occurred while calculating the scores, expected 13 scores, got {len(scores)}")
    
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