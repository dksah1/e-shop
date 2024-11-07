import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getCartDetails,
  addItemToCart,
  updateItemInCart,
} from "../api/productApi";

export const useGetCartDetails = (cartId) =>
  useQuery({
    queryKey: ["cartDetails", cartId],
    queryFn: async () => {
      const data = await getCartDetails(cartId);
      return data;
    },
    enabled: !!cartId,
  });

export const useAddItemToCart = () => {
  return useMutation({
    mutationFn: async ({ cartId, item }) => {
      let res = await addItemToCart(cartId, item);
      return res;
    },
  });
};
export const useUpdateItemInCart = () =>
  useMutation({
    mutationFn: async ({ cartId, itemId, quantity }) => {
      console.log({ cartId, itemId, quantity });
      let res = await updateItemInCart(cartId, itemId, quantity);
      return res;
    },
  });
