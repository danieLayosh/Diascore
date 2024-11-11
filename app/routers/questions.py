from fastapi import APIRouter
from models.MainLogicRequest import AnswerSumRequest, AnswerSumRuqestWithCred, processrequestDone
from services.check_questions_service import check_questions
from services.excel_service import process_all_scores

router_questions = APIRouter()

@router_questions.post("/questions/sum/")
async def calculate_answers(request: AnswerSumRequest) -> processrequestDone:
    # age validation
    
    
    # Extract parameters from the request
    answers = request.answers
    processed_dict = check_questions(answers)
    
    # Creating the AnswerRequest instance and populating 
    result = AnswerSumRuqestWithCred(
        **request.model_dump(),
        preprocessed_scores=processed_dict, 
        kORs="kids" if request.age < 6 else "school"
    )
    
    requestDone = process_all_scores(result)
    
    return requestDone

    
@router_questions.get("/questions/body/")
async def get_request_body():
    return AnswerSumRequest.schema_json().split()