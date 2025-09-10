'use client'
import React from 'react'
import DynamicForm from '@/components/DynamicForm'
import { DangerousContentCheck, DateValidationCheck } from '@/utils/custom-validation/CustomValidation';
const fields = [
  { name: "job", placeholder: "Enter job title", label: "Job Title", type: "text", rules: { required: "Job Name is required", ...DangerousContentCheck } },
  { name: "location", placeholder: "Enter job location", label: "Job Location", type: "text", rules: { required: "Job Location is required", ...DangerousContentCheck } },
  { name: "deadline", label: "Job Deadline", type: "date", rules: { required: "Job Deadline is required", ...DateValidationCheck } },
  { name: 'jobType', placeholder: "Enter job type", label: "Job Type", type: "select", options: ["Full-time", "Part-time", 'Hybrid', "Contract"], rules: { required: "Job Type is required", ...DangerousContentCheck } },
  {name: "description", placeholder: "Enter job description", label: "Job Description", type: "textarea", rules: { required: "Job Description is required", ...DangerousContentCheck } },
];
function page() {
  return (
    <div>
      <h1>Post Job</h1>
      <DynamicForm fields={fields} />
    </div>
  )
}

export default page