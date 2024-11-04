from pydantic import BaseModel
import datetime
from typing import List

class AnswerSumRequest(BaseModel):
    name: str
    sex: str
    age: float
    birth_date: str
    text_filler_name: str
    date: datetime.datetime
    answers: List[int]