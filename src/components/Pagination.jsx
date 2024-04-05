const Pagination = ({
  totalItem,
  resultsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let paginationNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItem / resultsPerPage); i++) {
    paginationNumbers.push(i);
  }
  return (
    <div className="pagination">
      {paginationNumbers.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={paginationNumbers === currentPage ? "active" : ""}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};
export default Pagination;
