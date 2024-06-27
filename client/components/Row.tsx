import { TableRow, TableCell } from "./Table"
import { AllEvents } from "@/services/events"
import Avatar from "./Avatar"
import { cn, baseUrl, formatDate } from "@/lib/utils"
import { useState } from "react"

const Row = ({ event }: { event: AllEvents }) => {
  const [showDetails, setShowDetails] = useState(false)
  const toggleDetails = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowDetails(!showDetails)
  }

  return (
    <>
    {showDetails && (
        <div className="fixed inset-0 z-20" onClick={toggleDetails} />
    )}
    <TableRow
        onClick={
            showDetails ? undefined : toggleDetails
        }
        className={cn("z-10 sticky hover:bg-hover hover:cursor-pointer transition-transform duration-300",
            showDetails && "h-[291px] scale-[1.032] hover:bg-transparent z-30 hover:cursor-auto"
    )}>
        {showDetails ? (
            <TableCell className="w-full h-full p-0" colSpan={4}>
            <div className="z-10 w-full h-full rounded-xl border bg-white border-[#DFDFDF] shadow-[0px_2px_5px_0px_rgba(0,0,0,0.04)]">

            </div>
            </TableCell>
        ): (
        <>
        <TableCell className={cn("flex w-full h-full gap-[11px] items-center", showDetails && "bg-red-400")}>
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
        </>
        )}
    </TableRow>
    </>
  )
}

export default Row