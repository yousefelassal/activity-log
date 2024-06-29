import { TableRow, TableCell } from "./Table"
import { AllEvents } from "@/services/events"
import Avatar from "./Avatar"
import { cn, baseUrl, formatDate } from "@/lib/utils"
import { useState } from "react"
import { getEvent } from "@/services/events"
import useSWR from "swr"

const Row = ({ event }: { event: AllEvents }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [isDateReadable, setIsDateReadable] = useState(true)

  const { data, isLoading, error } = useSWR(showDetails ? `${baseUrl}/events/${event.id}` : null, getEvent)

  const toggleDetails = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowDetails(!showDetails)
  }

  const toggleDateReadable = () => setIsDateReadable(!isDateReadable)

  const formattedDate = formatDate(new Date(event.occurred_at))

  return (
    <>
    {/* overlay */}
    {showDetails && (
        <TableRow>
            <TableCell className="p-0">
                <div className="fixed inset-0 z-20" onClick={toggleDetails} />
            </TableCell>
        </TableRow>
    )}
    <TableRow
        onClick={
            showDetails ? undefined : toggleDetails
        }
        className={cn("z-10 sticky hover:bg-hover hover:cursor-pointer transition-transform duration-300",
            showDetails && "min-h-[282px] scale-[1.032] hover:bg-transparent z-30 hover:cursor-auto"
    )}>
        {showDetails ? (
            <TableCell className="w-full h-full p-0" colSpan={4}>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5 z-10 py-[30px] px-[41px] w-full h-full rounded-xl border bg-white border-[#DFDFDF] shadow-[0px_2px_5px_0px_rgba(0,0,0,0.04)]">
                    {error && <div>Error loading event</div>}
                    <div className="grid grid-cols-[40px_1fr] items-start justify-start h-fit gap-y-3 gap-x-8">
                        <span className="col-span-2 pb-2 uppercase font-medium text-[14px] text-[#929292]">
                            Actor
                        </span>
                        <span className="text-[14px] text-[#929292]">Name</span>
                        <span className="text-[14px] text-black">{event.actor.name}</span>
                        <span className="text-[14px] text-[#929292]">Email</span>
                        <span className="text-[14px] text-black">{event.actor.email}</span>
                        <span className="text-[14px] text-[#929292]">ID</span>
                        {isLoading ? (
                            <div className="h-[14px] w-[150px] rounded-sm animate-pulse bg-[#F8F8F8]"></div>
                        ) : (
                            <span className="text-[14px] text-black">{data?.actor.id}</span>
                            )}
                    </div>
                    <div className="grid grid-cols-[40px_1fr] items-start justify-start h-fit gap-y-3 gap-x-8">
                        <span className="col-span-2 pb-2 uppercase font-medium text-[14px] text-[#929292]">
                            Action
                        </span>
                        <span className="text-[14px] text-[#929292]">Name</span>
                        <span className="text-[14px] text-black">{event.action_name}</span>
                        <span className="text-[14px] text-[#929292]">Object</span>
                        {isLoading ? (
                            <div className="h-[14px] w-[150px] rounded-sm animate-pulse bg-[#F8F8F8]"></div>
                        ) : (
                            <span className="text-[14px] text-black">{data?.object}</span>
                            )}
                        <span className="text-[14px] text-[#929292]">ID</span>
                        {isLoading ? (
                            <div className="h-[14px] w-[150px] rounded-sm animate-pulse bg-[#F8F8F8]"></div>
                        ) : (
                            <span className="text-[14px] text-black">{data?.action_id}</span>
                            )}
                    </div>
                    <div className="grid grid-cols-[40px_1fr] items-start justify-start h-fit gap-y-3 gap-x-8">
                        <span className="col-span-2 pb-2 uppercase font-medium text-[14px] text-[#929292]">
                            Date
                        </span>
                        <button onClick={toggleDateReadable} className="flex gap-2 w-full text-[14px] text-[#929292]">
                            <span>{isDateReadable ? "Readable" : "Timestamp"}</span>
                            <span className="text-[14px] text-black w-full min-w-max">
                                {isDateReadable ? formattedDate : event.occurred_at}
                            </span>
                        </button>
                    </div>
                    <div className="grid grid-cols-[40px_1fr] items-start justify-start h-fit gap-y-3 gap-x-8">
                        <span className="col-span-2 pb-2 uppercase font-medium text-[14px] text-[#929292]">
                            Metadata
                        </span>
                        {isLoading ? (
                            <div className="h-[144px] w-[300px] rounded-sm animate-pulse bg-[#F8F8F8]"></div>
                        ) : (
                            <pre className="w-[300px] overflow-auto">{JSON.stringify(data?.metadata, null, 2)}</pre>
                            )}
                    </div>
                    <div className="grid grid-cols-[40px_1fr] items-start justify-start h-fit gap-y-3 gap-x-8">
                        <span className="col-span-2 pb-2 uppercase font-medium text-[14px] text-[#929292]">
                            Target
                        </span>
                        <span className="text-[14px] text-[#929292]">ID</span>
                        {isLoading ? (
                            <div className="h-[14px] w-[150px] rounded-sm animate-pulse bg-[#F8F8F8]"></div>
                        ) : (
                            <span className="text-[14px] text-black">{data?.target_id}</span>
                            )}
                        <span className="text-[14px] text-[#929292]">Name</span>
                        {isLoading ? (
                            <div className="h-[14px] w-[150px] rounded-sm animate-pulse bg-[#F8F8F8]"></div>
                        ) : (
                            <span className="text-[14px] text-black">{data?.target_name}</span>
                            )}
                    </div>
                </div>
            </TableCell>
        ) : (
            <>
                <TableCell>
                    <div className="flex gap-[11px] items-center">
                        <Avatar name={event.actor.name} />
                        <span>{event.actor.email}</span>
                    </div>
                </TableCell>
                <TableCell>{event.action_name}</TableCell>
                <TableCell>{formattedDate}</TableCell>
                <TableCell className="flex justify-end">
                    <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0.317323 0.284414C0.74042 -0.0948047 1.4264 -0.0948047 1.84949 0.284414L8.34995 6.11072C8.77304 6.48993 8.77304 7.10477 8.34995 7.48399L1.84949 13.3103C1.4264 13.6895 0.74042 13.6895 0.317323 13.3103C-0.105774 12.9311 -0.105774 12.3162 0.317323 11.937L6.05169 6.79735L0.317323 1.65769C-0.105774 1.27847 -0.105774 0.663633 0.317323 0.284414Z" fill="#EEEEEE"/>
                    </svg>
                </TableCell>
            </>
        )}
    </TableRow>
    </>
  )
}

export default Row