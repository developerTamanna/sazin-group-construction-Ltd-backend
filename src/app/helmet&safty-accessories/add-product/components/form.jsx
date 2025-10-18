"use client"
import React from 'react'
import ProductForm from '@/components/ProductForm'
import axiosInstance from '@/utils/axios'  ;
const onSubmit = async(data) => {
      try{
        const response= await  axiosInstance.post('/Helmets&Safety/addAction/add-product', data)
          return response
      }catch(error){
          throw error
        }; 
    }

function Form() {
  return (
    <div>
      <ProductForm onSubmit={onSubmit} />
    </div>
  )
}

export default Form