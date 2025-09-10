'use client'
import React from 'react'
import DynamicForm from '@/components/DynamicForm'
import { DangerousContentCheck } from '@/utils/custom-validation/CustomValidation';
const fields = [
  { name: "partner", placeholder: "Equipment or Capability Name", label: "Equipment or Capability Name", type: "text", rules: { required: "Equipment or Capability Name is required", ...DangerousContentCheck } },
];
function page() {
  return (
    <div>
      <h1>Equipment or Capability Name</h1>
      <DynamicForm fields={fields} />
    </div>
  )
}

export default page