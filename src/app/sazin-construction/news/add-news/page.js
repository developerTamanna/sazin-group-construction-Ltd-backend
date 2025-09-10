'use client'
import React from 'react'
import DynamicForm from '@/components/DynamicForm'
import { DangerousContentCheck, DateValidationCheck } from '@/utils/custom-validation/CustomValidation';
const fields = [
  {name: "newstitle", placeholder: "Enter news title", label: "News Title", type: "text", rules: { required: "News Title is required", ...DangerousContentCheck } },
  {name: "description", placeholder: "Enter news description", label: "News Description", type: "textarea", rules: { required: "News Description is required", ...DangerousContentCheck } },
  {name: "author", placeholder: "Enter news author", label: "News Author", type: "text", rules: { required: "News Author is required", ...DangerousContentCheck } },
  {name: "date", label: "News Date", type: "date", rules: { required: "News Date is required", ...DateValidationCheck } },
  {name: "image", label: "News Image", type: "image", rules: { required: "News Image is required"} },
];
function page() {
  return (
    <div>
      <h1>Add News</h1>
      <DynamicForm fields={fields} />
    </div>
  )
}

export default page