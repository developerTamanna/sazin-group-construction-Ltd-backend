'use client'
import React, { useRef, useEffect} from "react";
import Card from './component/Card'
import DynamicQuery from "../../components/DynamicQuery";
export default function Page(){
  const{
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch
  }=DynamicQuery('client');

  useEffect(() => {
    refetch();
  }, [refetch]);

  const loadMoreRef = useRef();

  useEffect(() => {
    if (!loadMoreRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );
    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (status === "pending") return <p className="text-center">Loading...</p>;
  if (status === "error") return <p className="text-center">Error fetching products!</p>;

  return (
      <>

  <div className="w-full flex flex-wrap items-start justify-center gap-4 bg-white shadow-md rounded-lg p-4">

            {data?.pages.map((page, i) => (
              <React.Fragment key={i}>
                {page?.data?.map((item, index) => (
                 <Card key={index} post={item}></Card>
                ))}
              </React.Fragment>
            ))}
      </div>
  

      {/* Sentinel element for IntersectionObserver */}
      <div ref={loadMoreRef} className=" w-full z-[999]  h-10 mt-5 text-center">
        {isFetchingNextPage && <p className='text-red-500'>Loading more...</p>}
        {!hasNextPage && <p className="text-gray-500">No more Certificates</p>}
      </div>
    </>
  );
}
