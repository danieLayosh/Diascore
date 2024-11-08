from models.AnswerRequest import AnswerSumRuqestWithCred

class ProcessingRequest(AnswerSumRuqestWithCred):
    pORt: str
    kORs: str
    
class processrequestDone(ProcessingRequest):
    converted_scores: dict[str, int]