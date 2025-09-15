// api.js
import { productsData } from "../../../data";

export const fetchProducts = async (pageParam = 1, value='',ky='') => {
  if(value ==='' || ky === '') return { data: [], nextPage: undefined };
  const limit = 4; // প্রতি পেজে ৪টা প্রোডাক্ট
  const start = (pageParam - 1) * limit;
  const end = start + limit;
  const filteredProducts = value!='all' ? productsData.filter(product => product[ky] === value) : productsData;
  const pageData = filteredProducts.slice(start, end);

  return {
    data: pageData,
    nextPage: end < filteredProducts.length ? pageParam + 1 : undefined,
  };
};
