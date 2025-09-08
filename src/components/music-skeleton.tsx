import React from "react";

interface MusicSkeletonProps {
  count?: number;
}

export default function MusicSkeleton({ count = 5,}: MusicSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="w-full grid grid-cols-8 bg-gray-900 p-3 rounded-lg border border-gray-950 shadow gap-2 animate-pulse"
        >
          <div className={ "col-span-1 col-start-1 h-12 bg-gray-800 rounded"} 
          />
          <div className="col-span-7 flex flex-col gap-2">
            <div className="h-5 bg-gray-800 rounded w-3/4" />
            <div className="h-5 bg-gray-800 rounded w-1/3" />
          </div>
        </div>
      ))}
    </>
  );
}
