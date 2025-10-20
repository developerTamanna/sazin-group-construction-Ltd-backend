'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSidebar } from '@/context/SidebarContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import axiosInstance from '@/utils/axios';
import { DangerousContentCheck, NumberValidationCheck } from '@/utils/custom-validation/CustomValidation';

const option = [
  {
    name: "Revvo Helmet",
    submenu: [
      { name: "Full Face" },
      { name: "Modular Face" },
      { name: "Open Face" },
      { name: "Half Face" },
    ],
  },
  {
    name: "Safety Accessories",
    submenu: [
      { name: "Safety Helmets (Hard Hats)" },
      { name: "Safety Goggles / Face Shields" },
      { name: "Ear Plugs / Ear Muffs" },
      { name: "Safety Gloves" },
      { name: "Safety Shoes / Gumboots" },
      { name: "High-Visibility Safety Vests" },
      { name: "Respirators / Masks" },
      { name: "Coveralls / Suits" },
      { name: "Fall Protection Harness" },
      { name: "Welding Helmets & Gloves" },
    ],
  },
];

function ProductUpdate({data,setUpdateData,refetch }) {
  const { dynamicTheme } = useSidebar();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm(
    {
    criteriaMode: 'all',
    shouldUnregister: true,
    mode: 'onChange',
    }
  );

  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const watchImage = watch('image');
  const hasDiscount = watch('hasDiscount');

  // 🧩 Handle Submit
  const Submithandel = async (formValues) => {
    setIsSubmitting(true);
    try {
      const formdata = new FormData();
      Object.entries(formValues).forEach(([key, value]) => {
        if (key === "image" && value && value.length > 0) {
          formdata.append("image", value[0]);
        } else {
          formdata.append(key, value);
        }
      });

      const result = await axiosInstance.put(`/Helmets&Safety/editAction/update-product/${data?._id}`, formdata);
      toast.success(result?.data?.message || "Product updated successfully!");
      refetch();
    } catch (error) {
      console.error("Submit error:", error);
      const message = error?.response?.data?.message || "Request failed";
      if (typeof message === "string") toast.error(message);
      else if (Array.isArray(message)) message.forEach((msg) => toast.error(msg));
      else if (typeof message === "object")
        Object.values(message).forEach((val) =>
          Array.isArray(val)
            ? val.forEach((msg) => toast.error(msg))
            : toast.error(val)
        );
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🧩 Image preview when new file uploaded
  useEffect(() => {
    if (!watchImage || watchImage.length === 0) return;
    setImagePreview(URL.createObjectURL(watchImage[0]));
  }, [watchImage]);

  // 🧩 Load existing data into form (Reset with data)
  useEffect(() => {
    if (data) {
      reset({
        productName: data.productName || "",
        title: data.title || "",
        description: data.description || "",
        category: data.category || "",
        price: data.price || "",
        hasDiscount: data.hasDiscount || false,
        discountPercent: data.discountPercent || "",
        isFeatured: data.isFeatured || false,
      });
      if (data.imageUrl) {
        setImagePreview(data.imageUrl);
      }
    }
  }, [data, reset]);

  return (
<motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`${dynamicTheme.mainBg}  fixed top-16 bottom-1 flex items-center justify-center md:p-4 p-2`}
    >

      <div
        className={`w-full h-full relative max-w-4xl ${dynamicTheme.formBg} shadow-xl rounded-3xl border ${dynamicTheme.cardBorder} p-2 overflow-auto`}
      >
        <button
          onClick={()=>setUpdateData(null)}
          className='cursor-pointer sticky z-[999] top-1 pr-4 w-full text-right text-red-600 text-2xl font-bold'>
          X
        </button>
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-800">
          Update Product
        </h2>

        <form onSubmit={handleSubmit(Submithandel)} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* LEFT SIDE */}
          <div className="space-y-6">
            {/* Product Name */}
            <div>
              <label className={`block mb-2 font-medium ${dynamicTheme.formLabel}`}>
                Product Name
              </label>
              <input
                type="text"
                {...register('productName', { required: 'Product name is required',...DangerousContentCheck })}
                className={`w-full p-4 rounded-lg outline-none border ${dynamicTheme.formInput}`}
                placeholder="Enter product name"
              />
              {errors.productName && (
                <p className="text-red-500 text-sm mt-1">{errors.productName.message}</p>
              )}
            </div>

            {/* Title */}
            <div>
              <label className={`block mb-2 font-medium ${dynamicTheme.formLabel}`}>
                Title
              </label>
              <input
                type="text"
                {...register('title', { required: 'Title is required',...DangerousContentCheck })}
                className={`w-full p-4 rounded-lg outline-none border ${dynamicTheme.formInput}`}
                placeholder="Enter title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className={`block mb-2 font-medium ${dynamicTheme.formLabel}`}>
                Description
              </label>
              <textarea
                {...register('description',{...DangerousContentCheck})}
                className={`w-full p-4 rounded-lg outline-none border ${dynamicTheme.formInput}`}
                placeholder="Enter description"
                rows={4}
              />
            </div>

            {/* Category */}
            <div>
              <label className={`block mb-2 font-medium ${dynamicTheme.formLabel}`}>
                Category
              </label>
              <select
                {...register('category', { required: 'Category is required' })}
                className={`w-full p-4 rounded-lg outline-none border ${dynamicTheme.formInput}`}
              >
                <option value="">-- Select Category --</option>
                {option.map((category) => (
                  <optgroup key={category.name} label={category.name}>
                    {category.submenu.map((sub) => (
                      <option key={sub.name} value={sub.name}>
                        {sub.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
              )}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className={`block mb-2 font-medium ${dynamicTheme.formLabel}`}>
                Product Image
              </label>
              <div className={`${dynamicTheme.imageCard} cursor-pointer`}>
                <input
                  type="file"
                  accept="image/*"
                  {...register('image')}
                  id="productImage"
                  className="hidden"
                />
                <label
                  htmlFor="productImage"
                  className="cursor-pointer flex justify-center items-center h-40"
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="object-cover h-full w-full rounded-xl"
                    />
                  ) : (
                    <p className="text-gray-400 text-center">📷 Click to Upload Image</p>
                  )}
                </label>
              </div>
            </div>

            {/* Price */}
            <div>
              <label className={`block mb-2 font-medium ${dynamicTheme.formLabel}`}>
                Price
              </label>
              <input
                type="number"
                {...register('price', { required: 'Price is required',...NumberValidationCheck })}
                className={`w-full p-4 rounded-lg outline-none border ${dynamicTheme.formInput}`}
                placeholder="Enter price"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
              )}
            </div>

            {/* Discount */}
            <div>
              <div className="flex items-center gap-2">
                <input type="checkbox" {...register('hasDiscount')} />
                <label className="font-medium">Has Discount?</label>
              </div>
              {hasDiscount && (
                <div className="mt-2">
                  <label className={`block mb-2 font-medium ${dynamicTheme.formLabel}`}>
                    Discount %
                  </label>
                  <input
                    type="number"
                    {...register('discountPercent', {
                      min: { value: 1, message: 'Minimum 1%' },
                      max: { value: 100, message: 'Maximum 100%' },
                      ...NumberValidationCheck
                    })}
                    className={`w-full p-4 rounded-lg outline-none border ${dynamicTheme.formInput}`}
                    placeholder="Enter discount percentage"
                  />
                  {errors.discountPercent && (
                    <p className="text-red-500 text-sm mt-1">{errors.discountPercent.message}</p>
                  )}
                </div>
              )}
            </div>

            {/* Featured */}
            <div className="flex items-center gap-2">
              <input type="checkbox" {...register('isFeatured')} />
              <label className="font-medium">Is Featured?</label>
            </div>
          </div>

          {/* Submit */}
          <div className="mt-8 col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-lg text-white font-semibold transition ${dynamicTheme.formButton}`}
            >
              {isSubmitting ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
</motion.div>
  );
}

export default ProductUpdate;
