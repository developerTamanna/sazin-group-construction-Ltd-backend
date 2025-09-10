'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSidebar } from '@/context/SidebarContext';

export default function DynamicForm({ fields }) {
  const { dynamicTheme } = useSidebar();
  const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting, isValid } } = useForm(
    {
    criteriaMode: 'all',
    shouldUnregister: true,
    mode: 'onChange',
  });
  const [imagePreviews, setImagePreviews] = useState({});
  const watchAll = watch();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    reset();
    setImagePreviews({});
  };

  const handleImageChange = (e, name) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreviews((prev) => ({ ...prev, [name]: URL.createObjectURL(file) }));
    }
  };

  return (
    <div className={`h-auto flex items-center justify-center p-6`}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`w-full h-full max-w-6xl flex flex-col   gap-8 p-6 ${dynamicTheme.formBg} rounded-xl shadow-lg`}
      >
        {fields.map((field) => {
          if (field.conditional && !watchAll[field.conditional]) return null;

          return (
            <div key={field.name} className="space-y-2 ">
              {field.type !== "checkbox" && (
                <label className={`block mb-2 font-medium ${dynamicTheme.formLabel}`}>
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

              {field.type === "checkbox" && (
                <label className="flex items-center gap-2">
                  <input type="checkbox" {...register(field.name, field.rules)} />
                  {field.label}
                </label>
              )}

              {field.type === "select" && (
                <>
                  <select
                    {...register(field.name, field.rules)}
                    className={`w-full p-4 rounded-lg border outline-none ${dynamicTheme.formInput}`}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options.map((opt, i) => (
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
                    onChange={(e) => handleImageChange(e, field.name)}
                    className="hidden"
                    id={field.name}
                  />
                  <label
                    htmlFor={field.name}
                    className={`cursor-pointer flex justify-center items-center h-40 w-full rounded-xl ${dynamicTheme.imageCard} border border-gray-300`}
                  >
                    {imagePreviews[field.name] ? (
                      <img
                        src={imagePreviews[field.name]}
                        alt="Preview"
                        className="object-cover h-full w-full rounded-xl"
                      />
                    ) : (
                      <p className="text-gray-400 text-center">📷 Click to Upload Image</p>
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
            className={`w-full py-4 rounded-lg text-white font-semibold transition ${dynamicTheme.formButton}`}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
