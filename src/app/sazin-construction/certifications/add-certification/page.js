import React from 'react'
import DynamicForm from '@/components/DynamicForm'
const fields = [
  { name: "image", label: "Certificate Image", type: "image",  rules: { required: "Image is required" } },
];
function page() {
  return (
    <div>
      <h1>Add Certification</h1>
      <DynamicForm fields={fields} />
    </div>
  )
}

export default page