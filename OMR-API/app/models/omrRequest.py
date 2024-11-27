from fastapi import UploadFile, File
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Annotated

class OMRRequest(BaseModel):
    pass

class OMRResponse(BaseModel):
    answers: dict[int, int]