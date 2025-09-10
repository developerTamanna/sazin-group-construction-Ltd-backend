'use client'
import React from 'react'
import DynamicForm from '@/components/DynamicForm'
import { DangerousContentCheck } from '@/utils/custom-validation/CustomValidation';
const fields = [
  { name: "achievement", placeholder: "Enter achievement name", label: "Achievement Name", type: "text", rules: { required: "Achievement Name is required", ...DangerousContentCheck } },
  {name: "description", placeholder: "Enter achievement description", label: "Achievement Description", type: "textarea", rules: { required: "Achievement Description is required", ...DangerousContentCheck } },
];
function page() {
  return (
    <div>
      <h1>Add Achievement</h1>
      <DynamicForm fields={fields} />
    </div>
  )
}

export default page