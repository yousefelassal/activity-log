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
import Button from "@/components/Button";
import { instalog } from "@/services/events";
import { useEffect, useReducer } from "react";
import liveReducer, { initialLiveState } from "@/reducers/liveReducer";
import GenerateButton from "@/components/GenerateButton";

const PAGE_SIZE = 10;

export default function Home() {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const debouncedSearch = useDebounce(search, 500);
  const [liveState, liveDispatch] = useReducer(liveReducer, initialLiveState);

  const {
    data,
    isLoading,
    size,
    setSize,
    mutate
  } = useSWRInfinite((index)=> 
      `${baseUrl}/events?page=${index + 1}&limit=${PAGE_SIZE}&search=${debouncedSearch}${
        liveState.isLive ? `&since=${liveState.since?.toISOString()}` : ""
      }`, 
      getEvents,
      {
        // refetch interval if live is enabled
        refreshInterval: liveState.isLive ? 1000 : 0
      }
    );

  // Create event when search is performed
  useEffect(() => {
    async function createEvent() {
    await instalog.createEvent(
      {
        "object": "event",
        "actor_id": "user_9N8UBQ45Y3",
        "action": {
          "id": "evt_action_PGTD81NCAOQ2",
          "object": "event_action",
          "name": "user.searched_activity_log_events"
        },
        "target_id": "user_DOKVD1U3L030",
        "target_name": "ali@instatus.com",
        "location": "105.40.62.95",
        "metadata": {
          "redirect": "/search",
          "description": "User searched for activity log events",
          "x_request_id": "req_W1Y13QOHMI5H"
        },
      }      
    )
    mutate();
  }
  if (debouncedSearch) {
    createEvent();
  }
  }, [debouncedSearch]);

  const events = data ? data.flat() : [];
  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", e.target.value);
    replace(`${pathname}?${params.toString()}`);
  }

  const handleToggleLive = () => {
    liveDispatch({ type: 'TOGGLE_LIVE', payload: !liveState.isLive });
  }

  return (
    <main className="flex flex-col gap-8 py-12 px-4 sm:px-8 lg:px-[67px]">
      <div className="flex justify-between">
        <GenerateButton mutate={mutate} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell colSpan={4} className="px-4 pt-[17px] pb-0">
              <div className="flex flex-col lg:flex-row items-center w-full h-full">
                <Input
                  className="flex-1 rounded-bl-none lg:rounded-bl-lg lg:rounded-tr-none rounded-br-none"
                  defaultValue={search}
                  onChange={handleSearch}
                  placeholder="Search name, email or action..."
                />
                <div className="flex w-full lg:w-auto">
                  <Button
                    className="flex-1 lg:flex-initial border-t-0 lg:border-l-0 lg:border-t  rounded-bl-lg lg:rounded-bl-none"
                  >
                    <svg width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.25 2.25H0.75C0.551088 2.25 0.360322 2.17098 0.21967 2.03033C0.0790177 1.88968 0 1.69891 0 1.5C0 1.30109 0.0790177 1.11032 0.21967 0.96967C0.360322 0.829018 0.551088 0.75 0.75 0.75H14.25C14.4489 0.75 14.6397 0.829018 14.7803 0.96967C14.921 1.11032 15 1.30109 15 1.5C15 1.69891 14.921 1.88968 14.7803 2.03033C14.6397 2.17098 14.4489 2.25 14.25 2.25ZM11.75 5.75H3.25C3.05109 5.75 2.86032 5.67098 2.71967 5.53033C2.57902 5.38968 2.5 5.19891 2.5 5C2.5 4.80109 2.57902 4.61032 2.71967 4.46967C2.86032 4.32902 3.05109 4.25 3.25 4.25H11.75C11.9489 4.25 12.1397 4.32902 12.2803 4.46967C12.421 4.61032 12.5 4.80109 12.5 5C12.5 5.19891 12.421 5.38968 12.2803 5.53033C12.1397 5.67098 11.9489 5.75 11.75 5.75ZM8.75 9.25H6.25C6.05109 9.25 5.86032 9.17098 5.71967 9.03033C5.57902 8.88968 5.5 8.69891 5.5 8.5C5.5 8.30109 5.57902 8.11032 5.71967 7.96967C5.86032 7.82902 6.05109 7.75 6.25 7.75H8.75C8.94891 7.75 9.13968 7.82902 9.28033 7.96967C9.42098 8.11032 9.5 8.30109 9.5 8.5C9.5 8.69891 9.42098 8.88968 9.28033 9.03033C9.13968 9.17098 8.94891 9.25 8.75 9.25Z" fill="#575757"/>
                    </svg>
                    Filter
                  </Button>
                  <Button
                    className="flex-1 lg:flex-initial border-t-0 border-l-0 lg:border-t"
                  >
                    <svg width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.01562 4.6875H5.96875V9.18076L7.5124 7.6374C7.60103 7.55321 7.71903 7.50696 7.84127 7.50852C7.9635 7.51009 8.08028 7.55934 8.16672 7.64578C8.25316 7.73222 8.30241 7.849 8.30398 7.97123C8.30554 8.09347 8.25929 8.21147 8.1751 8.3001L5.83135 10.6438C5.74345 10.7317 5.62427 10.781 5.5 10.781C5.37573 10.781 5.25655 10.7317 5.16865 10.6438L2.8249 8.3001C2.74071 8.21147 2.69446 8.09347 2.69602 7.97123C2.69759 7.849 2.74684 7.73222 2.83328 7.64578C2.91972 7.55934 3.0365 7.51009 3.15874 7.50852C3.28097 7.50696 3.39897 7.55321 3.4876 7.6374L5.03125 9.18076V4.6875H1.98438C1.5494 4.68797 1.13237 4.86097 0.824792 5.16854C0.517216 5.47612 0.344215 5.89315 0.34375 6.32812V12.4219C0.344215 12.8569 0.517216 13.2739 0.824792 13.5815C1.13237 13.889 1.5494 14.062 1.98438 14.0625H9.01562C9.4506 14.062 9.86763 13.889 10.1752 13.5815C10.4828 13.2739 10.6558 12.8569 10.6562 12.4219V6.32812C10.6558 5.89315 10.4828 5.47612 10.1752 5.16854C9.86763 4.86097 9.4506 4.68797 9.01562 4.6875ZM5.96875 1.40625C5.96875 1.28193 5.91936 1.1627 5.83146 1.07479C5.74355 0.986886 5.62432 0.9375 5.5 0.9375C5.37568 0.9375 5.25645 0.986886 5.16854 1.07479C5.08064 1.1627 5.03125 1.28193 5.03125 1.40625V4.6875H5.96875V1.40625Z" fill="#575757"/>
                    </svg>
                    Export
                  </Button>
                  <Button
                    className={cn("flex-1 lg:flex-initial border-t-0 lg:border-t border-l-0 lg:rounded-tr-lg rounded-br-lg", 
                      liveState.isLive && "bg-red-500/5 hover:bg-red-500/10 text-red-500",
                    )}
                    onClick={handleToggleLive}
                  >
                    <svg className={cn(
                      liveState.isLive && "animate-pulse"
                    )} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="6" cy="6" r="6" fill="#8F485D"/>
                    </svg>
                    Live
                  </Button>
                </div>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead>Actor</TableHead>
            <TableHead>Action</TableHead>
            <TableHead colSpan={2}>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isEmpty && !liveState.isLive && <TableRow className="h-48"><TableCell colSpan={3} className="text-center">No events found</TableCell></TableRow>}
          {isLoading && !liveState.isLive && <Loading />}
          {liveState.isLive && (isLoading || isEmpty) && <TableRow className="h-48"><TableCell colSpan={3} className="text-center">Listening for new events...</TableCell></TableRow>}
          {events.map((event) => <Row key={event.id} event={event} /> )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell className="p-0" colSpan={4}>
              <button
                className={cn("h-full w-full py-4 uppercase rounded-[0px_0px_13px_13px] bg-foreground hover:bg-gray-700/5 transition-colors text-center text-sm font-semibold",
                  isLoadingMore && "bg-gray-700/5",
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
