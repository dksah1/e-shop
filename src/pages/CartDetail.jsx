import React, { useEffect, useState } from "react";
import { useGetCartDetails, useUpdateItemInCart } from "../hooks/useCartHooks";
import { HiArrowLeft } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";
const CartDetail = () => {
  const [cartDetail, setCartDetail] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  const cartId = localStorage.getItem("cart_id");

  const {
    data: cartData,
    isError,
    isLoading,
    refetch,
  } = useGetCartDetails(cartId);
  const { mutate: updateItemToCart } = useUpdateItemInCart();

  useEffect(() => {
    if (cartData) {
      const filteredValue = cartData?.data?.data?.items.filter(
        (x) => x.quantity > 0
      );
      setCartDetail(filteredValue);

      const total = filteredValue.reduce(
        (sum, item) => sum + item?.subTotal,
        0
      );
      setTotalAmount(total);
    }
  }, [cartData]);

  const updateItem = (itemId, quantity) => {
    updateItemToCart(
      { cartId, itemId, quantity },
      {
        onSuccess: () => {
          refetch();
        },
        onError: (error) => {
          console.log("Error", error);
        },
      }
    );
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full h-screen bg-blue-200">
        <RingLoader className="w-full h-full" />
      </div>
    );
  if (isError)
    return (
      <div className="text-center text-red-500">
        Error loading cart details.
      </div>
    );

  return (
    <div className="bg-white mt-16 flex justify-center px-4">
      <div className="flex flex-col w-full max-w-5xl">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Cart Details
          </h2>
          <Link to="/">
            <button>
              <HiArrowLeft className="w-10 h-10 text-blue-500" />
            </button>
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Cart Items Section */}
          <div className="flex-1 w-full lg:w-2/3 rounded-lg shadow-md p-4 bg-white">
            <h4 className="text-lg font-medium text-gray-700">Items</h4>
            <div className="divide-y divide-gray-200">
              {cartDetail &&
                cartDetail.map((item) => (
                  <div key={item._id} className="py-4 flex items-center">
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
                        Subtotal: ${item.subTotal.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center border px-2 rounded-md">
                        <button
                          onClick={() =>
                            updateItem(item._id, item.quantity - 1)
                          }
                          className="text-xl px-2"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateItem(item._id, item.quantity + 1)
                          }
                          className="text-xl px-2"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => updateItem(item._id, 0)}
                        className="text-red-500"
                      >
                        <MdDelete className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Checkout Section */}
          <div className="w-full lg:w-1/3 p-6 bg-gray-100 rounded-lg shadow-lg">
            <h4 className="text-lg font-semibold text-gray-800">
              Order Summary
            </h4>
            <div className="my-4">
              <p className="text-gray-700 text-sm">Total Amount:</p>
              <p className="text-2xl font-bold text-gray-800">
                ${totalAmount.toFixed(2)}
              </p>
            </div>
            <button
              className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
              onClick={() => console.log("Proceeding to checkout")}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDetail;
