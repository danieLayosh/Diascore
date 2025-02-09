{ /* <NewDiagnosisForm /> 
 This is the form that will be used to create a new diagnosis. It will contain the following fields:
 - Patient Name
 - Patient ID 
 - Patient gender
 - Patient Date of Birth
 - Diagnosis Date
 - diagnosis filler name
 - pORt (Parent or teacher - p or t)
 - kORs (kids or students - kids or school)
 - Diagnosis (link to Diagnosis Form || Dianosis Form Photo || Fill Manual)
*/}
import { Form, Input, Button, CheckboxGroup, Checkbox, DateInput} from '@heroui/react';
import {CalendarDate, parseDate} from "@internationalized/date";
import { useState } from 'react';

const NewDiagnosisForm = () => {
    const [submitted, setSubmitted] = useState(false);
    const [selectedGender, setSelectedGender] = useState(["boy"]);

    const handleChange = (values) => {
        setSelectedGender(values.slice(-1));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Your form submission logic here.
        // For example, you might set the submitted state:
        setSubmitted({
            patientName: e.target.patientName.value,
            patientID: e.target.patientID.value,
        });
    };


    return (
        <Form
        onSubmit={handleSubmit}
        className="flex w-full flex-wrap md:flex-nowrap lg:size-96 sm:size-72"
        validationBehavior="native"
        >
            <Input
                isRequired
                className="max-w-[220px]"
                label="Patient Name"
                name="patientName"
                labelPlacement='outside'
                type="text"
                variant="bordered" 
                classNames={{ 
                    label: "text-lg text-black",
                    input: "border-none focus:outline-none focus:ring-0", // Removes inner border and focus ring
                }}
                onClear={() => console.log("input cleared")}
            />
            <Input 
                isRequired
                className="max-w-[220px]"
                label="Patient ID" 
                labelPlacement='outside'
                name='patientID'
                type="text" 
                variant="bordered" 
                minLength={9}
                classNames={{ 
                    label: "text-lg text-black",
                    input: "border-none focus:outline-none focus:ring-0", // Removes inner border and focus ring
                }}
                onClear={() => console.log("input cleared")}
            />
            <div className="border-white border-2 p-2 rounded-xl mt-5">
                <CheckboxGroup
                    isRequired
                    size="lg"
                    label="gender"
                    name='gender'
                    defaultValue={["boy"]}
                    orientation="horizontal"
                    value={selectedGender}
                    onChange={handleChange}
                    classNames={{ label: "text-lg text-black" }}
                    className='flex flex-row'
                >
                    <Checkbox value="boy">Boy</Checkbox>
                    <Checkbox value="girl">Girl</Checkbox>
                </CheckboxGroup>
            </div>
            <div className="flex w-full flex-wrap mt-5">
                <DateInput
                    isRequired
                    defaultValue={parseDate("2024-04-04")}
                    className="max-w-[220px]"
                    label="Birth date"
                    name='birthDate'
                    placeholderValue={new CalendarDate(1995, 11, 6)}
                    variant='bordered'
                    classNames={{ 
                        label: "text-lg text-black",
                        input: "text-lg mb-2 ",
                        errorMessage: "text-red-500 text-lg",
                    }}
                 />
            </div>


            <Button type="submit" variant="bordered">
                Submit
            </Button>
            {submitted && (
                <div className="text-small text-default-500">
                    You submitted: <code>{JSON.stringify(submitted)}</code>
                </div>
            )}
        </Form>
    );
};

export default NewDiagnosisForm;