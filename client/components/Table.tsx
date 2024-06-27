import { cn } from "@/lib/utils";

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
    className?: string;
}

interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
    className?: string;
}

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
    className?: string;
}

interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
    className?: string;
}

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    className?: string;
}

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
    className?: string;
}

interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {
    className?: string;
}

const Table = ({ className, ...props }: TableProps) => {
    return (
        <div className="relative rounded-[15px_15px_13px_13px] border border-border shadow-[0px_3px_5px_0px_rgba(0,0,0,0.02)] w-full overflow-auto">
            <table className={cn("w-full text-sm", className)} {...props} />
        </div>
    );
}

const TableHeader = ({ className, ...props }: TableHeaderProps) => {
    return (
        <thead className={cn("bg-foreground uppercase font-semibold", className)} {...props} />
    );
}

const TableHead = ({ className, ...props }: TableHeadProps) => {
    return (
        <th className={cn("text-left p-4", className)} {...props} />
    );
}

const TableBody = ({ className, ...props }: TableBodyProps) => {
    return (
        <tbody className={cn(className)} {...props} />
    );
}

const TableRow = ({ className, ...props }: TableRowProps) => {
    return (
        <tr className={cn("transition-colors", className)} {...props} />
    );
}

const TableCell = ({ className, ...props }: TableCellProps) => {
    return (
        <td className={cn("min-w-max p-4", className)} {...props} />
    );
}

const TableFooter = ({ className, ...props }: TableFooterProps) => {
    return (
        <tfoot className={cn("bg-foreground hover:bg-foreground/70 transition-colors", className)} {...props} />
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