/**
 * @typedef {Object} AnswerSumRequest
 * @property {string} patientName
 * @property {string} patient_id
 * @property {string} gender
 * @property {number} age
 * @property {string} birth_date
 * @property {string} text_filler_name
 * @property {string} diagnosisDate
 * @property {string} pORt // "p" for parent, "t" for teacher
 * @property {string} kORs // "kids" or "school"
 * @property {number[]} answers
 * @property {string} status
 */


export const columns = [
    {
        key: 'patientName',
        label: 'NAME',
    },
    {
        key: 'diagnosisDate',
        label: 'CREATED AT',
    },
    {
        key: 'status',
        label: 'STATUS',
    },
];

export const statusOptions = [
    {
        name: "COMPLETED",
        uid: "completed"
    },
    {
        name: "IN PROGRESS",
        uid: "in_progress"
    },
    {
        name: "PENDING",
        uid: "pending"
    },
    {
        name: "CANCELLED",
        uid: "cancelled"
    },
]