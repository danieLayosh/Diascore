from pydantic import BaseModel

class ScoreRequest(BaseModel):
    scores: dict[str, int]
    gender: str
    age: float
    pORt: str
    kORs: str