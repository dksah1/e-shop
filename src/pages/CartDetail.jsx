import React, { useEffect, useState } from "react";
import { useGetCartDetails, useUpdateItemInCart } from "../hooks/useCartHooks";
import { HiArrowLeft } from "react-icons/hi";
import { MdDelete } from "react-icons/md";

import { Link } from "react-router-dom";
const CartDetail = () => {
  const [cartDetail, setCartDetail] = useState("");

  const cartId = localStorage.getItem("cart_id");

  const {
    data: cartData,
    isError,
    isLoading,
    refetch,
  } = useGetCartDetails(cartId);

  const filteredValue = cartData?.data?.data?.items.filter(
    (x) => x.quantity > 0
  );
  console.log("filtered ", filteredValue);

  useEffect(() => {
    if (cartData) {
      const filteredValue = cartData?.data?.data?.items.filter(
        (x) => x.quantity > 0
      );
      setCartDetail(filteredValue);
    }
  }, [cartData]);

  const { mutate: updateItemToCart } = useUpdateItemInCart();

  if (isLoading)
    return <div className="text-center text-gray-500">Loading...</div>;
  if (isError)
    return (
      <div className="text-center text-red-500">
        Error loading cart details.
      </div>
    );

  //   const { items } = cartDetail?.data?.data || {};
  console.log("cartdetails", cartDetail);

  const updateItem = (itemId, quantity) => {
    updateItemToCart(
      { cartId, itemId, quantity },
      {
        onSuccess: () => {
          refetch();
          console.log("updated successfully");
        },
        onError: (error) => {
          console.log("error", error);
        },
      }
    );
  };

  return (
    <div className="bg-white mt-16 ">
      <div className="flex justify-around">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Cart Details
        </h2>
        <Link to="/">
          <button>
            <HiArrowLeft className="w-12 h-12 text-blue-500" />
          </button>
        </Link>
      </div>
      <div className=" rounded-lg shadow-md p-4">
        <div className="mt-4">
          <h4 className="text-md font-medium text-gray-700">Items</h4>
          <div className="divide-y divide-gray-200">
            {cartDetail &&
              cartDetail?.map((item) => (
                <div key={item._id} className="py-4 flex">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-16 h-16 object-cover rounded mr-4"
                  />
                  <div className="flex-1">
                    <h5 className="font-semibold text-gray-800">
                      {item.product.title}
                    </h5>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm text-gray-500">
                      Price: ${item.price}
                    </p>
                    <p className="text-sm text-gray-500">
                      Subtotal: ${item.subTotal}
                    </p>
                  </div>
                  <div className="flex h-12">
                    <div className="flex justify-between items-center mx-2 px-4 w-[128px] h-[32] rounded-sm outline  ">
                      <button
                        onClick={() => updateItem(item._id, item.quantity - 1)}
                        className="text-3xl "
                      >
                        -
                      </button>
                      <span> {item.quantity}</span>
                      <button
                        onClick={() => updateItem(item._id, item.quantity + 1)}
                        className="text-2xl"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => updateItem(item._id, 0)}
                      className="flex items-center justify-center  "
                    >
                      <MdDelete className="text-red-500 h-[60px] w-[80px]" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDetail;
