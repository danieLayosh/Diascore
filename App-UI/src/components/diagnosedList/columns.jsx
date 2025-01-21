/**
 * @typedef {Object} AnswerSumRequest
 * @property {string} name
 * @property {string} patient_id
 * @property {string} gender
 * @property {number} age
 * @property {string} birth_date
 * @property {string} text_filler_name
 * @property {string} createdAt
 * @property {string} pORt // "p" for parent, "t" for teacher
 * @property {string} kORs // "kids" or "school"
 * @property {number[]} answers
 * @property {string} status
 */


export const columns = [
    {
        key: 'name',
        label: 'NAME',
    },
    {
        key: 'createdAt',
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