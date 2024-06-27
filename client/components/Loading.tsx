import { TableRow, TableCell } from "./Table"

const Loading = () => {
  return (
    <>
    {Array.from({ length: 10 }).map((_, index) => (
        <TableRow key={index}>
            <TableCell className="flex gap-[11px] items-center">
                <div className="h-[25px] w-[25px] rounded-full animate-pulse bg-[#F8F8F8]"></div>
                <div className="h-[14px] w-[132px] rounded-sm animate-pulse bg-[#F8F8F8]"></div>
            </TableCell>
            <TableCell className="align-middle">
                <div className="h-[14px] w-[188px] rounded-sm animate-pulse bg-[#F8F8F8]"></div>
            </TableCell>
            <TableCell className="align-middle">
                <div className="h-[14px] w-[100px] rounded-sm animate-pulse bg-[#F8F8F8]"></div>
            </TableCell>
            <TableCell className="flex justify-end">
                <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.317323 0.284414C0.74042 -0.0948047 1.4264 -0.0948047 1.84949 0.284414L8.34995 6.11072C8.77304 6.48993 8.77304 7.10477 8.34995 7.48399L1.84949 13.3103C1.4264 13.6895 0.74042 13.6895 0.317323 13.3103C-0.105774 12.9311 -0.105774 12.3162 0.317323 11.937L6.05169 6.79735L0.317323 1.65769C-0.105774 1.27847 -0.105774 0.663633 0.317323 0.284414Z" fill="#EEEEEE"/>
                </svg>
            </TableCell>
        </TableRow>
        ))
    }
    </>
  )
}

export default Loading