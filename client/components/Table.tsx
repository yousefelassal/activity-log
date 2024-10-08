import { cn } from "@/lib/utils";

const Table = ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => {
    return (
        <div className="w-full rounded-[15px_15px_13px_13px] border border-border bg-foreground min-w-fit">
            <table className={cn("w-full text-sm shadow-[0px_3px_5px_0px_rgba(0,0,0,0.02)]", className)} {...props} />
        </div>
    );
}

const TableHeader = ({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => {
    return (
        <thead className={cn("uppercase rounded-[15px_15px_0px_0px] overflow-auto font-semibold", className)} {...props} />
    );
}

const TableHead = ({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => {
    return (
        <th className={cn("text-left text-secondaryText px-[23px] pt-[15px] pb-[14px]", className)} {...props} />
    );
}

const TableBody = ({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => {
    return (
        <tbody className={cn("bg-white", className)} {...props} />
    );
}

const TableRow = ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => {
    return (
        <tr className={cn("transition-colors", className)} {...props} />
    );
}

const TableCell = ({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => {
    return (
        <td className={cn("min-w-max px-[23px] pt-[15px] pb-[14px]", className)} {...props} />
    );
}

const TableFooter = ({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => {
    return (
        <tfoot className={cn(className)} {...props} />
    );
}

export {
    Table,
    TableHeader,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableFooter
}