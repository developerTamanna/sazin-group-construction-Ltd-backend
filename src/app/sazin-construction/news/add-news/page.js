'use client'
import React from 'react'
import DynamicForm from '@/components/DynamicForm'
import { DangerousContentCheck, DateValidationCheck } from '@/utils/custom-validation/CustomValidation';
import axiosInstance from '@/utils/axios';
const fields = [
  {name: "newstitle", placeholder: "Enter news title", label: "News Title", type: "text", rules: { required: "News Title is required", ...DangerousContentCheck } },
  {name: "description", placeholder: "Enter news description", label: "News Description", type: "textarea", rules: { required: "News Description is required", ...DangerousContentCheck } },
  {name: "author", placeholder: "Enter news author", label: "News Author", type: "text", rules: { required: "News Author is required", ...DangerousContentCheck } },
  {name: "date", label: "News Date", type: "date", rules: { required: "News Date is required", ...DateValidationCheck } },
  {name: "image", label: "News Image", type: "image", rules: { required: "News Image is required"} },
];
const onSubmit = async(data) => {
  try{
     const response= await  axiosInstance.post('/sazin-construction/addAction/add-news', data)
      return response
  }catch(error){
      throw error
    }; 
}
function page() {
  return(
    <div>
      <DynamicForm fields={fields} onSubmit={onSubmit} />
    </div>
  )
}

export default page