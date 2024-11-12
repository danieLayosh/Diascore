from fastapi import APIRouter
from models.MainLogicRequest import AnswerSumRequest, AnswerSumRuqestWithCred, processrequestDone
from services.check_questions.kids import check_questions as check_kids
from services.check_questions.school import check_questions as check_school
from services.excel_service import process_all_scores

router_questions = APIRouter()

@router_questions.post("/questions/sum/")
async def calculate_answers(request: AnswerSumRequest) -> processrequestDone:
    # age validation
    # TODO: Add age validation
    
    # Extract parameters from the request
    answers = request.answers
    
    if request.age < 6.0:
        processed_dict = check_kids(answers)
    else:
        processed_dict = check_school(answers, request.pORt)
        
    # Creating the AnswerRequest instance and populating 
    result = AnswerSumRuqestWithCred(
        **request.model_dump(),
        preprocessed_scores=processed_dict, 
        kORs="kids" if request.age < 6.0 else "school"
    )
    
    requestDone = process_all_scores(result)
    
    return requestDone

    
@router_questions.get("/questions/body/")
async def get_request_body():
    return AnswerSumRequest.schema_json().split()