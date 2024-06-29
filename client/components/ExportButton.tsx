import { useState } from "react"
import Button from "./Button"
import { cn, baseUrl } from "@/lib/utils"
import { getEventsCSV } from "@/services/events"

const ExportButton = () => {
  const [isLoading, setIsLoading] = useState(false)

  const exportEvents = async () => {
    setIsLoading(true)
    try {
        const data = await getEventsCSV(`${baseUrl}/events/csv`)
        const blob = new Blob([data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'events.csv';
        a.click();
    } catch (error) {
        console.error(error)
    } finally {
        setIsLoading(false)
    }
  }

  return (
    <Button
        className={cn("flex-1 lg:flex-initial border-t-0 border-l-0 lg:border-t", 
            isLoading && "opacity-50"
        )}
        onClick={exportEvents}
        disabled={isLoading}
    >
        {isLoading ? "Exporting..." : 
        <>
            <svg width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.01562 4.6875H5.96875V9.18076L7.5124 7.6374C7.60103 7.55321 7.71903 7.50696 7.84127 7.50852C7.9635 7.51009 8.08028 7.55934 8.16672 7.64578C8.25316 7.73222 8.30241 7.849 8.30398 7.97123C8.30554 8.09347 8.25929 8.21147 8.1751 8.3001L5.83135 10.6438C5.74345 10.7317 5.62427 10.781 5.5 10.781C5.37573 10.781 5.25655 10.7317 5.16865 10.6438L2.8249 8.3001C2.74071 8.21147 2.69446 8.09347 2.69602 7.97123C2.69759 7.849 2.74684 7.73222 2.83328 7.64578C2.91972 7.55934 3.0365 7.51009 3.15874 7.50852C3.28097 7.50696 3.39897 7.55321 3.4876 7.6374L5.03125 9.18076V4.6875H1.98438C1.5494 4.68797 1.13237 4.86097 0.824792 5.16854C0.517216 5.47612 0.344215 5.89315 0.34375 6.32812V12.4219C0.344215 12.8569 0.517216 13.2739 0.824792 13.5815C1.13237 13.889 1.5494 14.062 1.98438 14.0625H9.01562C9.4506 14.062 9.86763 13.889 10.1752 13.5815C10.4828 13.2739 10.6558 12.8569 10.6562 12.4219V6.32812C10.6558 5.89315 10.4828 5.47612 10.1752 5.16854C9.86763 4.86097 9.4506 4.68797 9.01562 4.6875ZM5.96875 1.40625C5.96875 1.28193 5.91936 1.1627 5.83146 1.07479C5.74355 0.986886 5.62432 0.9375 5.5 0.9375C5.37568 0.9375 5.25645 0.986886 5.16854 1.07479C5.08064 1.1627 5.03125 1.28193 5.03125 1.40625V4.6875H5.96875V1.40625Z" fill="#575757"/>
            </svg>
            Export
        </>
        }
    </Button>
  )
}

export default ExportButton