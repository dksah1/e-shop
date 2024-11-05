import React from "react";
// import pagiLeft from "../assets/img/icons/arrow-left.svg";
// import pagiright from "../assets/img/icons/arrow-right.svg";

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
    <div className="pagination-wrapper">
      {hasData() && (
        <div className="flex items-center">
          <div className="pr-5 text-item text-14 font-500">
            {pageInfo?.total && <p>{displayRange}</p>}
          </div>
          <div className="flex">
            <div className="pr-1 common-btn pagi-btn">
              <button
                disabled={!hasPreviousPage()}
                onClick={() => gotoPreviousPage()}
              >
                {"<"}
                {/* <img src={pagiLeft} /> */}
              </button>
            </div>
            <div className="common-btn pagi-btn">
              <button disabled={!hasNextPage()} onClick={() => gotoNextPage()}>
                {/* <img src={pagiright} /> */}
                {">"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Pagination;
