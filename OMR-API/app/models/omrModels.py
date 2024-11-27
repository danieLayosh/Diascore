from fastapi import UploadFile
from pydantic import BaseModel
from typing import Dict

class OMRRequest(BaseModel):
    image: list[UploadFile]

class OMRResponse(BaseModel):
    answers: dict[int, int]