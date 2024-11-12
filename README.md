# Diascore API Documentation

This document provides example API requests for the Diascore service. The examples show how to submit answers for clients in different contexts.

---

## Example API Requests

### Example 1: Kindergarten Client, Filled by Parent
This example demonstrates a request for a client in kindergarten, with answers filled by a parent.

**Request**
```http
POST http://127.0.0.1:8000/questions/sum/
```json
{
  "name": "John Doe",
  "id": "111222333",
  "gender": "boy",
  "age": 2.2,
  "birth_date": "1998-01-01",
  "text_filler_name": "Test Filler",
  "date": "2024-11-05", 
  "answers": [
    3, 2, 3, 1, 3, 1, 1, 1, 1, 3,
    2, 2, 1, 1, 2, 1, 1, 1, 1, 3,
    1, 1, 2, 1, 1, 1, 2, 2, 2, 1,
    1, 2, 2, 2, 1, 1, 1, 2, 1, 1,
    1, 1, 1, 1, 2, 1, 1, 2, 1, 1,
    1, 1, 1, 2, 1, 3, 1, 2, 1, 1,
    2, 1, 3
  ],
  "pORt": "p",
  "kORs": "kids"
}
```
```

### Example 2: School Client, Filled by Teacher
```http
POST http://127.0.0.1:8000/questions/sum/
{
  "name": "John Doe",
  "id": "327888999",
  "gender": "boy",
  "age": 7.5,
  "birth_date": "1998-01-01",
  "text_filler_name": "Test Filler",
  "date": "2024-11-13", 
  "answers": [1, 2, 1, 3, 1, 1, 1, 1, 2, 2, 3, 1, 1, 3, 3, 1, 2, 3, 1, 1, 3, 1, 2, 2, 1, 1, 1, 2, 3, 1, 3, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 3, 1, 2, 1, 3, 1, 1, 1, 1, 3, 1, 3, 1, 1, 1, 1, 1, 1, 2, 3, 3, 1, 1, 3, 1, 2, 2, 3, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1],
  "pORt": "t",
  "kORs": "school"
}
```