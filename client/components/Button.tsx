import { cn } from "@/lib/utils"

const Button = ({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
        className={cn("flex items-center justify-center gap-1 h-[45px] px-[14px] text-[12px] font-normal uppercase border border-[#E0E0E0] text-[#575757] hover:bg-gray-700/5 active:scale-95 transition-all", className)}
        {...props}
    >
        {children}
    </button>
  )
}

export default Button