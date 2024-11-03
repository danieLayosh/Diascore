from pydantic import BaseModel

class ScoreRequest(BaseModel):
    scores: list[int]
    gender: str
    age: float
    pORt: str
    kORs: str