'use client'
import React from 'react'
import DynamicForm from '@/components/DynamicForm'
import { DangerousContentCheck } from '@/utils/custom-validation/CustomValidation';
const fields = [
  { name: "service", placeholder: "Enter service name", label: "Service Name", type: "text", rules: { required: "Service Name is required", ...DangerousContentCheck } },
  {name: "description", placeholder: "Enter service description", label: "Service Description", type: "textarea", rules: { required: "Service Description is required", ...DangerousContentCheck } },
];
function page() {
  return (
    <div>
      <h1>Add Service</h1>
      <DynamicForm fields={fields} />
    </div>
  )
}

export default page