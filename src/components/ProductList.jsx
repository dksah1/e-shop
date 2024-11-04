import React, { useState } from "react";
import { useGetAll } from "../hooks/useProductHook";
import ProductItem from "./ProductItem";
import Pagination from "./Pagination";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, error, isLoading } = useGetAll({ page, limit: 10 });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredProducts = data?.data?.docs?.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageData = data?.data?.pagination;

  const handlePageChange = (page) => {
    setPage(page);
  };
  return (
    <>
      <div className="w-full mx-[12px] my-2 flex justify-around  ">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/2 p-2 border rounded-lg h-[50px]"
        />
        <div className="">
          <Link to="/cart">
            <button>
              <FaShoppingCart className="bg-gray-500 rounded-full h-16 w-16 p-2 " />
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 mx-3 items-center justify-center">
        {filteredProducts?.map((product) => (
          <div key={product._id}>
            <ProductItem key={product._id} product={product} />
          </div>
        ))}
      </div>
      <Pagination pageInfo={pageData} handlePageChange={handlePageChange} />
    </>
  );
};

export default ProductList;
