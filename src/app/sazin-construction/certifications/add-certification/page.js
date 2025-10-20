'use client';
import DynamicForm from '@/components/DynamicForm';
import axiosInstance from '@/utils/axios';
import { DangerousContentCheck } from '@/utils/custom-validation/CustomValidation';
const fields = [
  {
    name: 'certificateName',
    placeholder: 'Certificate Name',
    label: 'Certificate Name',
    type: 'text',
    rules: { required: 'Image is required', ...DangerousContentCheck },
  },
  {
    name: 'image',
    label: 'Certificate Image',
    type: 'image',
    rules: { required: 'Image is required' },
  },
];
const onSubmit = async (data) => {
  try {
    const response = await axiosInstance.post(
      '/sazin-construction/addAction/add-certificate',
      data
    );
    return response;
  } catch (error) {
    throw error;
  }
};
function page() {
  return (
    <div>
      <DynamicForm fields={fields} onSubmit={onSubmit} />
    </div>
  );
}

export default page;
