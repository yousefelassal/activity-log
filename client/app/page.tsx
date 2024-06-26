'use client'
import useSWRInfinite from "swr/infinite";
import { baseUrl } from "@/lib/utils";
import { getEvents } from "@/services/events";

const PAGE_SIZE = 10;

export default function Home() {
  const {
    data,
    isLoading,
    size,
    setSize
  } = useSWRInfinite((index)=> `${baseUrl}/events?page=${index + 1}&limit=${PAGE_SIZE}`, getEvents);

  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  return (
    <main className="py-12 px-8">
      <h1 className="text-4xl font-bold text-center mb-8">Events</h1>
      {isLoading && <p>Loading...</p>}
      {data && data.map((events, index) => (
        <div key={index}>
          {events.map((event) => (
            <div key={event.id} className="border p-4 my-4">
              <h2 className="font-bold text-lg">{event.actor.email}</h2>
              <p>{event.occurred_at}</p>
              <p>{event.id}</p>
            </div>
          ))}
        </div>
      ))}
      <button
        className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        disabled={isReachingEnd || isLoadingMore}
        onClick={() => setSize(size + 1)}
      >
        {isLoadingMore ? "Loading..." : isReachingEnd ? "No more events" : "Load more"}
      </button>
    </main>
  );
}
