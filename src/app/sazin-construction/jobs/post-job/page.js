'use client'
import React from 'react'
import DynamicForm from '@/components/DynamicForm'
import axiosInstance from '@/utils/axios';
import { DangerousContentCheck, DateValidationCheck, NumberValidationCheck } from '@/utils/custom-validation/CustomValidation';
const fields = [
  { name: "job", placeholder: "Enter job title", label: "Job Title", type: "text", rules: { required: "Job Name is required", ...DangerousContentCheck } },
  { name:'salary', placeholder: "Enter job salary", label: "Salary", type: "number", rules: { required: "Job Salary is required", min: { value: 0, message: "Salary must be a positive number" }, ...NumberValidationCheck } },
  { name: "location", placeholder: "Enter job location", label: "Job Location", type: "text", rules: { required: "Job Location is required", ...DangerousContentCheck } },
  { name: "deadline", label: "Job Deadline", type: "date", rules: { required: "Job Deadline is required", ...DateValidationCheck } },
  { name: 'jobType', placeholder: "Enter job type", label: "Job Type", type: "select", options: ["Full-time", "Part-time", 'Hybrid', "Contract"], rules: { required: "Job Type is required", ...DangerousContentCheck } },
   {name: "description", placeholder: "Enter job description", label: "Job Description", type: "textarea", rules: { required: "Job Description is required", ...DangerousContentCheck } },
];
const onSubmit=async(data) => {
  try {
    const response = await axiosInstance.post('/sazin-construction/addAction/add-job', data);
    return response;
  } catch (error) {
    throw error;
  }
};
function page() {
  return (
    <div>
      <DynamicForm fields={fields} onSubmit={onSubmit} />
    </div>
  )
}

export default page
