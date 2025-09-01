'use client'
import React, { useState } from "react";
import { useForm } from "react-hook-form";

function ProductForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [imagePreview, setImagePreview] = useState(null);

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  // Watch discount checkbox
  const hasDiscount = watch("hasDiscount");

  // Watch image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Product Name */}
        <div>
          <label className="block mb-1 font-medium">Product Name</label>
          <input
            type="text"
            {...register("productName", { required: "Product name is required" })}
            className="w-full border p-2 rounded"
            placeholder="Enter product name"
          />
          {errors.productName && (
            <p className="text-red-500 text-sm">{errors.productName.message}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-medium">Product Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: "Image is required" })}
            onChange={handleImageChange}
            className="w-full"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded"
            />
          )}
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full border p-2 rounded"
            placeholder="Enter title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            {...register("description")}
            className="w-full border p-2 rounded"
            placeholder="Enter description"
            rows={3}
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            {...register("price", { required: "Price is required" })}
            className="w-full border p-2 rounded"
            placeholder="Enter price"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>

        {/* Discount Checkbox */}
        <div className="flex items-center gap-2">
          <input type="checkbox" {...register("hasDiscount")} />
          <label className="font-medium">Has Discount?</label>
        </div>

        {/* Discount Percentage */}
        {hasDiscount && (
          <div>
            <label className="block mb-1 font-medium">Discount %</label>
            <input
              type="number"
              {...register("discountPercent", {
                min: 1,
                max: 100,
              })}
              className="w-full border p-2 rounded"
              placeholder="Enter discount percentage"
            />
          </div>
        )}

        {/* Featured */}
        <div className="flex items-center gap-2">
          <input type="checkbox" {...register("isFeatured")} />
          <label className="font-medium">Is Featured?</label>
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full border p-2 rounded"
          >
            <option value="">-- Select Category --</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="home">Home</option>
            <option value="toys">Toys</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
