// api.js
import axiosInstance from "@/utils/axios";

export const fetchProducts = async (pageParam = 1, value = "", ky = "",isFeature='') => {
  
  const limit = 10;
  // query params build
  const params = new URLSearchParams({
    page: pageParam,
    limit,
  });

  if (value && ky) {
    params.append(ky, value);
  }
  if(isFeature){
    params.append("isFeature",true);
  }

  // API call (axios auto json parse kore)
  const res = await axiosInstance.get(
    `/sazin-construction/manageAction/getAction/project?${params.toString()}`
  );

  const json = res.data; // ✅ ekhane data ashbe

  console.log("fjhfj", json);

  if (!json.success) {
    throw new Error(json.message || "Failed to fetch products");
  }

  return {
    data: json.data,
    nextPage:
      json.pagination.page < json.pagination.totalPages
        ? pageParam + 1
        : undefined,
  };
};
