import { cn } from "@/lib/utils";

const Input = ({ className, type, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-[45px] w-full text-[14px] font-normal border border-[#E0E0E0] bg-transparent text-[#575757] text-sm rounded-lg p-3 placeholder:text-[#959595] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#959595] transition-all",
        className
      )}
      {...props}
    />
  )
}

export default Input