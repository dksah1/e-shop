import { useQuery } from "@tanstack/react-query";
import { getProductDetails, getProducts } from "../api/productApi";
export const useGetAll = (payload) =>
  useQuery({
    queryKey: ["products", payload],
    queryFn: async () => {
      const res = await getProducts(payload);
      return res?.data;
    },
  });

export const useGetProductDetails = (slug) =>
  useQuery({
    queryKey: ["productsDetails", slug],
    queryFn: async () => {
      const res = await getProductDetails(slug);
      return res?.data;
    },
  });
