'use client'
import React from 'react'
import DynamicForm from '@/components/DynamicForm';
import axiosInstance from '@/utils/axios';
import { DangerousContentCheck } from '@/utils/custom-validation/CustomValidation';
const fields = [
  { name:"partner", placeholder: "Enter partner and client", label: "Partner And Client ", type: "text", rules: { required: "Partner And Client is required", ...DangerousContentCheck } },
  { name:"description",placeholder: "Description", label: "description ", type: "textarea", rules: { required: "description is required", ...DangerousContentCheck } }
];

const onSubmit= async(data) => {
  try{
   const response=await  axiosInstance.post('/sazin-construction/addAction/add-client', data)
      return response;
  }catch(error){
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