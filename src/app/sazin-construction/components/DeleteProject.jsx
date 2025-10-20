import axiosInstance from '@/utils/axios';
import React from 'react'
import toast from 'react-hot-toast';

async function  DeleteProject(id,path,refetch) {
    console.log(id);
    if (confirm('Are you sure you want to delete this?')) { 
            try{  
              const res = await axiosInstance.delete(`/sazin-construction/manageAction/deleteAction/delete-${path}/${id}`);
              toast.success("deleted successfully")
              console.log("res",res);
                refetch()
              }catch(err){
                  console.log("err",err);                  
                  toast.error(err.response?.data?.message || "request failed")
              }
         }
  };

export default DeleteProject