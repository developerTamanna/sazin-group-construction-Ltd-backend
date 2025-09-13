'use client'
import React from 'react'
import axiosInstance from '@/utils/axios';
import DynamicForm from '@/components/DynamicForm'
import { DangerousContentCheck } from '@/utils/custom-validation/CustomValidation';
const fields = [
  { name: "service", placeholder: "Enter service name", label: "Service Name", type: "text", rules: { required: "Service Name is required", ...DangerousContentCheck } },
  {name: "description", placeholder: "Enter service description", label: "Service Description", type: "textarea", rules: { required: "Service Description is required", ...DangerousContentCheck } },
];
const onSubmit=async(data) => {
  try{
    const response=await axiosInstance.post('/sazin-construction/addAction/add-service', data)
      return response
    }catch(error) {
      throw error
    };
}
function page() {
  return (
    <div>
      <DynamicForm fields={fields} onSubmit={onSubmit} />
    </div>
  )
}

export default page