import React from 'react'
const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages <= 7) {
    return (
      <>
        {[...Array(totalPages)].map((_, idx) => {
          const page = idx + 1;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 text-sm rounded border ${
                currentPage === page
                  ? 'bg-red-500 text-white border-red-500'
                  : 'bg-white hover:bg-gray-100 border-gray-300 text-gray-700'
              }`}
            >
              {page}
            </button>
          );
        })}
      </>
    );
  }

  // when many pages, show condensed pagination with neighbors and ellipsis
  const pageList = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1)
      pageList.push(i);
    else if (i === 2 && pageList[pageList.length - 1] !== 2) pageList.push(2);
    else if (
      i === totalPages - 1 &&
      pageList[pageList.length - 1] !== totalPages - 1
    )
      pageList.push(totalPages - 1);
  }

  // build unique ordered list with possible holes for ellipsis
  const unique = Array.from(new Set(pageList)).sort((a, b) => a - b);
  const rendered = [];
  for (let i = 0; i < unique.length; i++) {
    const p = unique[i];
    const prev = unique[i - 1];
    if (i > 0 && p - prev > 1) {
      rendered.push('ellipsis-' + i); // placeholder
    }
    rendered.push(p);
  }

  return (
    <>
      {rendered.map((item) =>
        typeof item === 'string' && item.startsWith('ellipsis') ? (
          <span key={item} className="px-2 text-sm text-gray-500">
            …
          </span>
        ) : (
          <button
            key={item}
            onClick={() => onPageChange(item)}
            className={`px-3 py-1 text-sm rounded border ${
              currentPage === item
                ? 'bg-red-500 text-white border-red-500'
                : 'bg-white hover:bg-gray-100 border-gray-300 text-gray-700'
            }`}
          >
            {item}
          </button>
        )
      )}
    </>
  );
};

export default Pagination