'use client'
import React from 'react'
import DynamicForm from '@/components/DynamicForm'
import { DangerousContentCheck } from '@/utils/custom-validation/CustomValidation';
const fields = [
  { name: "partner", placeholder: "Enter partner and client", label: "Partner And Client ", type: "text", rules: { required: "Partner And Client is required", ...DangerousContentCheck } },
];
function page() {
  return (
    <div>
      <h1>Add Clients And Partners</h1>
      <DynamicForm fields={fields} />
    </div>
  )
}

export default page