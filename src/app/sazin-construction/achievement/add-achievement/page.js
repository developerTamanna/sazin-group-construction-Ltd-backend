'use client'
import React from 'react'
import DynamicForm from '@/components/DynamicForm'
import { DangerousContentCheck } from '@/utils/custom-validation/CustomValidation';
import axiosInstance from '@/utils/axios';
const fields = [
  { name: "achievement", placeholder: "Enter achievement name", label: "Achievement Name", type: "text", rules: { required: "Achievement Name is required", ...DangerousContentCheck } },
  {name: "description", placeholder: "Enter achievement description", label: "Achievement Description", type: "textarea", rules: { required: "Achievement Description is required", ...DangerousContentCheck } },
];

const onSubmit = async(data) => {
  try{
     const response= await  axiosInstance.post('/sazin-construction/addAction/add-achievement', data)
      return response
  }catch(error){
      throw error
    }; 
}
function page() {
  return (
    <div>
      <DynamicForm fields={fields}  onSubmit={onSubmit}/>
    </div>
  )
}

export default page