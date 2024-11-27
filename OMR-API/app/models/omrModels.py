from pydantic import BaseModel

class OMRResponse(BaseModel):
    answers: dict[int, int]