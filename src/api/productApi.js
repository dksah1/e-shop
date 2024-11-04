import axios from "../services/plugins/AxiosProvider";

export const getProducts = async (params) => {
  // console.log({ params });
  const response = await axios.get(`/product/latest`, { params: params });

  return response;
};

export const getProductDetails = async (slug) => {
  const response = await axios.get(`product/for-public/${slug}`);
  return response;
};

export const createNewCart = async () => {
  const response = await axios.get(`order/user/new-cart`);
  return response;
};

export const getCartDetails = async (cartId) => {
  const response = await axios.get(`order/user/cart-details/${cartId}`);
  return response;
};

export const addItemToCart = async (cartId, item) => {
  const response = await axios.post(`order/add-item/${cartId}`, item);
  return response;
};

export const updateItemInCart = async (cartId, itemId, quantity) => {
  const response = await axios.put(`order/update-item/${cartId}/${itemId}`, {
    quantity,
  });
  return response;
};
