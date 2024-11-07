import React, { useState } from "react";
import { useGetAll } from "../hooks/useProductHook";
import ProductItem from "./ProductItem";
import Pagination from "./Pagination";
import { RingLoader } from "react-spinners";

const ProductList = ({ searchTerm }) => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useGetAll({ page, limit: 6 });

  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full h-screen bg-blue-200">
        <RingLoader className="w-full h-full" />
      </div>
    );
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
      <div className="grid  grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5  items-center justify-center mx-5 sm:mt-20 mt-28">
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
