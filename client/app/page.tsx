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

  const events = data ? data.flat() : [];
  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  return (
    <main className="py-12 px-8">
      <div className="relative rounded-[15px_15px_13px_13px] border border-border shadow-[0px_3px_5px_0px_rgba(0,0,0,0.02)] w-full overflow-auto">
      <table className="w-full overflow-hidden">
        <thead className="bg-foreground overflow-auto uppercase">
          <tr className="text-left">
            <th className="">Actor</th>
            <th className="">Occurred At</th>
            <th className="">ID</th>
          </tr>
        </thead>
        <tbody className="overflow-auto">
          {isEmpty && <tr><td colSpan={3} className="text-center">No events found</td></tr>}
          {isLoading && <tr><td colSpan={3} className="text-center">Loading...</td></tr>}
          {events.map((event) => (
            <tr key={event.id} className="border-b">
              <td className="">{event.actor.email}</td>
              <td className="">{event.occurred_at}</td>
              <td className="">{event.id}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>
              <button
                className="bg-foreground h-full w-full hover:bg-foreground/70 font-semibold py-2 px-4 uppercase"
                disabled={isReachingEnd || isLoadingMore}
                onClick={() => setSize(size + 1)}
              >
                {isLoadingMore ? "Loading..." : isReachingEnd ? "No more events" : "Load more"}
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
      </div>
    </main>
  );
}
