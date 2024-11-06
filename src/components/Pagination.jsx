import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export const Pagination = ({ pageInfo, handlePageChange }) => {
  const hasPreviousPage = () => {
    return pageInfo?.perviousPage;
  };

  const hasNextPage = () => {
    return pageInfo?.nextPage;
  };

  const gotoNextPage = () => {
    if (hasNextPage()) {
      handlePageChange(pageInfo?.page + 1);
    }
  };

  const gotoPreviousPage = () => {
    if (hasPreviousPage()) {
      handlePageChange(pageInfo?.page - 1);
    }
  };

  const hasData = () => {
    return pageInfo?.total > 0;
  };

  const startIndex = (pageInfo?.page - 1) * pageInfo?.limit + 1;
  const endIndex = Math.min(startIndex + pageInfo?.limit - 1, pageInfo?.total);
  const displayRange = `${startIndex} - ${endIndex} of ${pageInfo?.total}`;

  return (
    <div className="flex justify-end mx-4 my-3 ">
      {hasData() && (
        <div className="flex items-center">
          <div className="pr-5 text-item text-14 font-500">
            {pageInfo?.total && <p>{displayRange}</p>}
          </div>

          <div className="flex items-center space-x-4">
            <button
              disabled={!hasPreviousPage()}
              onClick={() => gotoPreviousPage()}
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                hasPreviousPage()
                  ? "bg-blue-500 text-white hover:bg-blue-600 shadow-md transition duration-200"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <FaChevronLeft size={16} />
            </button>

            <button
              disabled={!hasNextPage()}
              onClick={() => gotoNextPage()}
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                hasNextPage()
                  ? "bg-blue-500 text-white hover:bg-blue-600 shadow-md transition duration-200"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <FaChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Pagination;
