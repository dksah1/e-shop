import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAddItemToCart } from "../hooks/useCartHooks";
import { useGetProductDetails } from "../hooks/useProductHook";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import { createNewCart } from "../api/productApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { data: product, isLoading, isError } = useGetProductDetails(slug);
  const [quantity, setQuantity] = useState(1);
  const [cartId, setCartId] = useState(localStorage.getItem("cart_id"));

  const { mutate: addItemToCart } = useAddItemToCart();
  const handleAddToCart = async () => {
    if (!cartId) {
      const cartRes = await createNewCart();
      const newCartId = cartRes.data.data._id;
      console.log("newcartId", { newCartId });
      setCartId(newCartId);
      localStorage.setItem("cart_id", newCartId);
    }

    if (cartId) {
      addItemToCart(
        {
          cartId: cartId,
          item: {
            product: product.data._id,
            quantity,
            variantType: "None",
          },
        },
        {
          onSuccess: () => {
            console.log("Item added to cart successfully.");
            toast.success("Item added successfully!");
            navigate("/cart");
          },
          onError: (error) => {
            console.log("Error adding item to cart:", error);
            toast.error(error?.response?.data?.message);
          },
        }
      );
    }
  };

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full h-screen bg-blue-200">
        <RingLoader className="w-full h-full" />
      </div>
    );
  if (isError) return <div>Error loading product details.</div>;

  const productData = product?.data;

  const {
    images,
    title,
    price,
    strikePrice,
    offPercent,
    description,
    ratings,
    brand,
    category,
    sizeVariants,
  } = productData;

  return (
    <div className="mx-auto mt-16 p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="flex gap-4 items-center lg:items-start">
          <div className="sm:flex sm:flex-col hidden gap-4 mb-4 lg:mb-8">
            {images.map((image, idx) => (
              <img
                key={idx}
                src={image}
                alt={`Thumbnail ${idx + 1}`}
                className="w-16 h-16 rounded-md cursor-pointer border border-gray-200"
              />
            ))}
          </div>
          <img
            src={images[0]}
            alt={title}
            className="w-full max-w-md object-cover rounded-lg shadow-md"
          />
        </div>

        <div className="flex flex-col justify-between p-6  bg-white rounded-lg shadow-lg">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
            <p className="text-sm text-gray-500 mb-4">
              {brand?.name} - {category?.title}
            </p>

            <div className="flex items-center mb-4">
              <span className="text-3xl font-semibold text-gray-900">
                ${price}
              </span>
              <span className="text-xl text-gray-400 line-through ml-3">
                ${strikePrice}
              </span>
              <span className="text-green-500 ml-4 font-bold">
                {offPercent}% off
              </span>
            </div>

            {sizeVariants && sizeVariants.length > 0 && (
              <div className="mb-4">
                <p className="text-lg font-medium text-gray-700">
                  Available Sizes:
                </p>
                <div className="flex flex-col sm:flex-row gap-2 mt-2">
                  {sizeVariants.map((variant) => (
                    <button
                      key={variant._id}
                      className="px-4 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-200 transition"
                    >
                      {variant.variantName}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex   items-center mt-4 gap-2">
              <span className="font-semibold text-gray-700"> Quantity:</span>
              <button
                onClick={decrementQuantity}
                disabled={quantity === 1}
                className={`px-3 py-1 border rounded-md ${
                  quantity === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                -
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="px-3 py-1 border rounded-md text-gray-700 hover:bg-gray-200"
              >
                +
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center px-4 py-2 bg-orange-600 text-white font-semibold rounded-md hover:bg-orange-700 transition"
              >
                <FiShoppingCart className="mr-2" />
                Add to Cart
              </button>
              <button className="flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300 transition">
                <FiHeart className="mr-2" />
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Ratings and Reviews
        </h2>
        <div className="flex items-center mb-4">
          <div className="text-yellow-500 text-xl">
            {Array.from({ length: Math.floor(ratings) }).map((_, i) => "★")}
            {ratings % 1 ? "☆" : ""}
          </div>
          <p className="text-gray-600 ml-2">{ratings} / 5</p>
        </div>
        <p className="text-gray-500">No reviews yet.</p>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Product Description
        </h2>
        <div className="product-description-container">
          <p
            dangerouslySetInnerHTML={{ __html: description }}
            className="text-gray-600 description-text"
          ></p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
