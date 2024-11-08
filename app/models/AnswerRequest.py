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
    
class AnswerSumRuqestWithCred(AnswerSumRequest):
    preprocessed_scores: dict[str, int]