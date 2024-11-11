from pydantic import BaseModel
from typing import List

class AnswerSumRequest(BaseModel):
    name: str
    gender: str
    age: float
    birth_date: str
    text_filler_name: str
    date: str
    answers: List[int]
    pORt: str # p for parent, t for teacher
    
class AnswerSumRuqestWithCred(AnswerSumRequest):
    preprocessed_scores: dict[str, int]
    kORs: str # kids or school    
    
class processrequestDone(AnswerSumRuqestWithCred):
    converted_scores: dict[str, int]