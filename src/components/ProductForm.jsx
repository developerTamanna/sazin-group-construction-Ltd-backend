'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSidebar } from '@/context/SidebarContext';

const option = [
  {
    name: "Revvo Helmet",
    submenu: [
      { name: "Full Face" },
      { name: "Modular Face"},
      { name: "Open Face"},
      { name: "Half Face"},
    ],
  },
  {
    name: "Safety Accessories",
    submenu: [
      { name: "Safety Helmets (Hard Hats)"},
      { name: "Safety Goggles / Face Shields"},
      { name: "Ear Plugs / Ear Muffs"},
      { name: "Safety Gloves"},
      { name: "Safety Shoes / Gumboots"},
      { name: "High-Visibility Safety Vests"},
      { name: "Respirators / Masks"},
      { name: "Coveralls / Suits"},
      { name: "Fall Protection Harness"},
      { name: "Welding Helmets & Gloves"},
    ],
  },
];

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
      className={`${dynamicTheme.mainBg} min-h-[92vh] flex items-center justify-center`}
    >
      <div
        className={`w-full max-w-6xl ${dynamicTheme.formBg} shadow-xl rounded-3xl border ${dynamicTheme.cardBorder} p-10`}
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-800">
          Add New Product
        </h2>

        {/* Form with two-column layout */}
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* LEFT SIDE */}
          <div className="space-y-6">
            {/* Product Name */}
            <div>
              <label className={`block mb-2 font-medium ${dynamicTheme.formLabel}`}>
                Product Name
              </label>
              <input
                type="text"
                {...register('productName', { required: 'Product name is required' })}
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
                {...register('title', { required: 'Title is required' })}
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
                {...register('description')}
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
                      <option key={sub.name} value={sub.link}>
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
                    <p className="text-gray-400 text-center">📷 Click to Upload Image</p>
                  )}
                </label>
              </div>
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className={`block mb-2 font-medium ${dynamicTheme.formLabel}`}>
                Price
              </label>
              <input
                type="number"
                {...register('price', { required: 'Price is required', min: 1 })}
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
        </form>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            className={`w-full py-4 rounded-lg text-white font-semibold transition ${dynamicTheme.formButton}`}
          >
            Submit Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;