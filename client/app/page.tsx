'use client'
import useSWRInfinite from "swr/infinite";
import { getEvents } from "@/services/events";
import { cn, baseUrl, formatDate } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/Table";
import Avatar from "@/components/Avatar";
import Input from "@/components/Input";
import useDebounce from "@/hooks/use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Loading from "@/components/Loading";

const PAGE_SIZE = 10;

export default function Home() {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const debouncedSearch = useDebounce(search, 500);

  const {
    data,
    isLoading,
    size,
    setSize
  } = useSWRInfinite((index)=> 
      `${baseUrl}/events?page=${index + 1}&limit=${PAGE_SIZE}&search=${debouncedSearch}`, 
      getEvents);

  const events = data ? data.flat() : [];
  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", e.target.value);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <main className="py-12 px-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell colSpan={4} className="px-4 pt-[17px] pb-0">
              <Input placeholder="Search name, email or action..." onChange={handleSearch} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead>Actor</TableHead>
            <TableHead>Action</TableHead>
            <TableHead colSpan={2}>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isEmpty && <TableRow><TableCell colSpan={3} className="text-center">No events found</TableCell></TableRow>}
          {isLoading && <Loading />}
          {events.map((event) => (
            <TableRow key={event.id} className="hover:bg-hover">
              <TableCell className="flex gap-[11px] items-center">
                <Avatar name={event.actor.name} />
                <span>{event.actor.email}</span>
              </TableCell>
              <TableCell>{event.action_name}</TableCell>
              <TableCell>{formatDate(new Date(event.occurred_at))}</TableCell>
              <TableCell className="flex justify-end">
                <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.317323 0.284414C0.74042 -0.0948047 1.4264 -0.0948047 1.84949 0.284414L8.34995 6.11072C8.77304 6.48993 8.77304 7.10477 8.34995 7.48399L1.84949 13.3103C1.4264 13.6895 0.74042 13.6895 0.317323 13.3103C-0.105774 12.9311 -0.105774 12.3162 0.317323 11.937L6.05169 6.79735L0.317323 1.65769C-0.105774 1.27847 -0.105774 0.663633 0.317323 0.284414Z" fill="#EEEEEE"/>
                </svg>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className={cn(
          isLoadingMore && "bg-foreground/70",
          isReachingEnd && "opacity-50 hover:bg-foreground/100"
        )}>
          <TableRow>
            <TableCell className="p-0" colSpan={4}>
              <button
                className="h-full w-full py-4 uppercase text-center text-sm font-semibold"
                disabled={isReachingEnd || isLoadingMore}
                onClick={() => setSize(size + 1)}
              >
                {isLoadingMore ? "Loading..." : isReachingEnd ? "No more events" : "Load more"}
              </button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </main>
  );
}
