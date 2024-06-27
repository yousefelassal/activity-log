import { getGradient } from "@/lib/utils"

const Avatar = ({ name }:{ name: string }) => {
  const gradient = getGradient(name)
  return (
    <div className="rounded-full h-[25px] w-[25px] text-white text-[12px] font-bold uppercase flex items-center justify-center" style={{background: gradient}}>
        {name.charAt(0)}
    </div>
  )
}

export default Avatar