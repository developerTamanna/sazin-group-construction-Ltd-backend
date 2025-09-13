'use client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSidebar } from '@/context/SidebarContext';
import Image from 'next/image';
import toast from "react-hot-toast";

export default function DynamicForm({ fields, onSubmit }) {
  const { dynamicTheme } = useSidebar();
  const { register,handleSubmit, watch, reset, formState: { errors, isValid } } = useForm(
    {
    criteriaMode: 'all',
    shouldUnregister: true,
    mode: 'onChange',
  });
  const [imagePreviews, setImagePreviews] = useState({});
  const watchImage = watch('image');

 const [isSubmitting, setIsSubmitting] = useState(false);

 const Submithandel = async (data) => {
       setIsSubmitting(true); // 🚀 submitting শুরু

  try {
    console.log("form",data);
    
    const formdata = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "image" && value && value.length > 0) {
        formdata.append("image", value[0]);
      } else {
        console.log(key,value);
        formdata.append(key, value);
      }
    });

    console.log("Form Data2:", formdata);

    // ⬅️ এখন backend response না আসা পর্যন্ত wait করবে
    const result = await onSubmit(formdata);
    toast.success(result?.data?.message); // success toast


    reset();
    setImagePreviews({});
  } catch (error) {
          console.error("Submit error:", error);
           const message=error?.response?.data?.message
            if (!message) return;

              if (typeof message === "string") {
                toast.error(message); // সরাসরি string
              } else if (Array.isArray(message)) {
                // যদি array হয়
                message.forEach((msg) => toast.error(msg));
              } else if (typeof message === "object") {
                // object হলে loop করে সব key এর value দেখাবে
                Object.values(message).forEach((val) => {
                  if (Array.isArray(val)) {
                    val.forEach((msg) => toast.error(msg));
                  } else {
                    toast.error(val);
                  }
                });
              }
  } finally {
    setIsSubmitting(false); // ✅ backend থেকে response এলেই বন্ধ হবে
  }
};


  useEffect(()=>{
    if(!watchImage) return;
     if (watchImage?.length===1) {
          console.log('image',watchImage?.length);
          console.log('image',watchImage?.[0]);
          setImagePreviews(() => ({["image"]: URL.createObjectURL(watchImage?.[0]) }));
    }
  },[watchImage])


  return (
    <div className={`h-auto flex items-center justify-center p-6`}>
      <form
        onSubmit={handleSubmit(Submithandel)}
        className={`w-full h-full max-w-6xl flex flex-col   gap-8 p-6 ${dynamicTheme.formBg} rounded-xl shadow-lg`}
      >
        {fields.map((field) => {
          if (field.conditional && !watchAll[field.conditional]) return null;

          return (
            <div key={field.name} className="space-y-2 ">
              {field.type === "checkbox" && (
                <label className={`flex items-center gap-2 mb-2 ${dynamicTheme.formLabel}`}>
                  <input
                    type="checkbox"
                    {...register(field.name)}
                    className="w-4 h-4"
                  />
                  {field.label}
                </label>
              )}

              {["text", "number", 'date'].includes(field.type) && (
                <>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    {...register(field.name, field.rules)}
                    className={`w-full p-4 rounded-lg border outline-none ${dynamicTheme.formInput}`}
                  />
                  {errors[field.name] && (
                    <p className="text-red-500 text-sm mt-1">{errors[field.name].message}</p>
                  )}
                </>
              )}

              {field.type === "textarea" && (
                <>
                  <textarea
                    placeholder={field.placeholder}
                    {...register(field.name, field.rules)}
                    className={`w-full p-4 rounded-lg border outline-none ${dynamicTheme.formInput}`}
                    rows={field.rows || 4}
                  />
                  {errors[field.name] && (
                    <p className="text-red-500 text-sm mt-1">{errors[field.name].message}</p>
                  )}
                </>
              )}


              {field.type === "select" && (
                <>
                  <select
                    {...register(field.name, field.rules)}
                    className={`w-full p-4 rounded-lg border outline-none ${dynamicTheme.formInput}`}
                  >
                    <option value="">Select {field.label}</option>
                    {field?.options?.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {errors[field.name] && (
                    <p className="text-red-500 text-sm mt-1">{errors[field.name].message}</p>
                  )}
                </>
              )}

              {field.type === "image" && (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    {...register(field.name, field.rules)}
                    className="hidden"
                    id={field.name}
                  />
                  <label
                    htmlFor={field.name}
                    className={`cursor-pointer flex justify-center items-center h-auto  w-full rounded-xl ${dynamicTheme.imageCard} border border-gray-300`}
                  >
                    {imagePreviews[field.name] ? (
                      <Image
                        src={imagePreviews[field.name]}
                        alt="Preview"
                        width={150}
                        height={150}
                        className="object-cover h-full max-h-[512px] w-full rounded-xl"
                      />
                    ) : (
                      <p className="text-gray-400 flex items-center justify-center min-h-[200px]">📷 Click to Upload Image</p>
                    )}
                  </label>
                  {errors[field.name] && (
                    <p className="text-red-500 text-sm mt-1">{errors[field.name].message}</p>
                  )}
                </div>
              )}
            </div>
          );
        })}

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting || !isValid}
            className={`${(isSubmitting || !isValid) ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} w-full py-4 rounded-lg text-white font-semibold transition ${dynamicTheme.formButton}`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}
