import React, { useState } from "react";
import { useGetAll } from "../hooks/useProductHook";
import ProductItem from "./ProductItem";
import Pagination from "./Pagination";

const ProductList = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, error, isLoading } = useGetAll({ page, limit: 5 });

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
      <div className=" w-full mt-12 flex items-center justify-between px-4 pt-3  shadow-sm border-b border-gray-200">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200 transition h-[50px]"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-3 items-center justify-center mt-4">
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
