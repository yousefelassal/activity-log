import { cn } from "@/lib/utils"
import { getGradient } from "@/lib/utils"

const Avatar = ({ className, name }:{ className?:string, name: string }) => {
  const gradient = getGradient(name)
  return (
    <div
      className={cn("rounded-full h-[25px] w-[25px] text-white text-[12px] font-bold uppercase flex items-center justify-center", className)}
      style={{background: gradient}}
    >
        {name.charAt(0)}
    </div>
  )
}

export default Avatar