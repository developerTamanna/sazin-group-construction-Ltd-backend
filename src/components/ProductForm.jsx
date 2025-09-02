'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSidebar } from '@/context/SidebarContext';

function ProductForm() {
  const { dynamicTheme } = useSidebar();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [imagePreview, setImagePreview] = useState(null);

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    reset();
    setImagePreview(null);
  };

  const hasDiscount = watch('hasDiscount');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  return (
    <div
      className={`${dynamicTheme.bgColor} min-h-screen flex items-center justify-center p-6`}
    >
      <div
        className={`w-full max-w-3xl ${dynamicTheme.formBg} shadow-xl rounded-3xl border ${dynamicTheme.cardBorder} p-10`}
      >
        <h2 className={`text-3xl font-bold mb-8 ${dynamicTheme.textColor}`}>
          Add New Product
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Product Name */}
          <div>
            <label
              className={`block mb-2 font-medium ${dynamicTheme.formLabel}`}
            >
              Product Name
            </label>
            <input
              type="text"
              {...register('productName', {
                required: 'Product name is required',
              })}
              className={`w-full p-4 rounded-lg outline-none border ${dynamicTheme.formInput}`}
              placeholder="Enter product name"
            />
            {errors.productName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.productName.message}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label
              className={`block mb-2 font-medium ${dynamicTheme.formLabel}`}
            >
              Product Image
            </label>
            <div className={`${dynamicTheme.imageCard} cursor-pointer`}>
              <input
                type="file"
                accept="image/*"
                {...register('image', { required: 'Image is required' })}
                onChange={handleImageChange}
                className="hidden"
                id="productImage"
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
                  <p className="text-gray-400 text-center">
                    📷 Click to Upload Image
                  </p>
                )}
              </label>
            </div>
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* Title */}
          <div>
            <label
              className={`block mb-2 font-medium ${dynamicTheme.formLabel}`}
            >
              Title
            </label>
            <input
              type="text"
              {...register('title', { required: 'Title is required' })}
              className={`w-full p-4 rounded-lg outline-none border ${dynamicTheme.formInput}`}
              placeholder="Enter title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              className={`block mb-2 font-medium ${dynamicTheme.formLabel}`}
            >
              Description
            </label>
            <textarea
              {...register('description')}
              className={`w-full p-4 rounded-lg outline-none border ${dynamicTheme.formInput}`}
              placeholder="Enter description"
              rows={4}
            />
          </div>

          {/* Price */}
          <div>
            <label
              className={`block mb-2 font-medium ${dynamicTheme.formLabel}`}
            >
              Price
            </label>
            <input
              type="number"
              {...register('price', { required: 'Price is required', min: 1 })}
              className={`w-full p-4 rounded-lg outline-none border ${dynamicTheme.formInput}`}
              placeholder="Enter price"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Discount */}
          <div className="flex items-center gap-2">
            <input type="checkbox" {...register('hasDiscount')} />
            <label className="font-medium">Has Discount?</label>
          </div>
          {hasDiscount && (
            <div>
              <label
                className={`block mb-2 font-medium ${dynamicTheme.formLabel}`}
              >
                Discount %
              </label>
              <input
                type="number"
                {...register('discountPercent', {
                  min: { value: 1, message: 'Minimum 1%' },
                  max: { value: 100, message: 'Maximum 100%' },
                })}
                className={`w-full p-4 rounded-lg outline-none border ${dynamicTheme.formInput}`}
                placeholder="Enter discount percentage"
              />
              {errors.discountPercent && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.discountPercent.message}
                </p>
              )}
            </div>
          )}

          {/* Featured */}
          <div className="flex items-center gap-2">
            <input type="checkbox" {...register('isFeatured')} />
            <label className="font-medium">Is Featured?</label>
          </div>

          {/* Category */}
          <div>
            <label
              className={`block mb-2 font-medium ${dynamicTheme.formLabel}`}
            >
              Category
            </label>
            <select
              {...register('category', { required: 'Category is required' })}
              className={`w-full p-4 rounded-lg outline-none border ${dynamicTheme.formInput}`}
            >
              <option value="">-- Select Category --</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home</option>
              <option value="toys">Toys</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={`w-full py-4 rounded-lg text-white font-semibold transition ${dynamicTheme.formButton}`}
          >
            Submit Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
