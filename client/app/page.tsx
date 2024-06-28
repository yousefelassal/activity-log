'use client'
import useSWRInfinite from "swr/infinite";
import { getEvents } from "@/services/events";
import { cn, baseUrl } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/Table";
import Input from "@/components/Input";
import useDebounce from "@/hooks/use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Loading from "@/components/Loading";
import Row from "@/components/Row";

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
    <main className="py-12 px-4 sm:px-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell colSpan={4} className="px-4 pt-[17px] pb-0 bg-foreground rounded-[15px_15px_0px_0px]">
              <Input defaultValue={search} placeholder="Search name, email or action..." onChange={handleSearch} />
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
          {events.map((event) => <Row key={event.id} event={event} /> )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell className="p-0" colSpan={4}>
              <button
                className={cn("h-full w-full py-4 uppercase rounded-[0px_0px_13px_13px] bg-foreground hover:bg-foreground/70 transition-colors text-center text-sm font-semibold",
                  isLoadingMore && "bg-foreground/70",
                  isReachingEnd && "opacity-50 hover:bg-foreground/100"
                )}
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
