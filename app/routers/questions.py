from fastapi import APIRouter
from models.AnswerRequest import AnswerSumRequest, AnswerSumRuqestWithCred
from services.check_questions_service import check_questions

router_questions = APIRouter()

@router_questions.post("/questions/sum/")
async def calculate_answers(request: AnswerSumRequest) -> AnswerSumRuqestWithCred:
    # Extract parameters from the request
    answers = request.answers
    processed_dict = check_questions(answers)
    
    # Creating the AnswerRequest instance and populating 
    result = AnswerSumRuqestWithCred(
        **request.model_dump(),
        preprocessed_scores=processed_dict
    )
    
    return result

    
@router_questions.get("/questions/body/")
async def get_request_body():
    return AnswerSumRequest.schema_json().split()