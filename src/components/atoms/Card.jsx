import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Card = forwardRef(({ 
  children, 
  className, 
  variant = "default",
  padding = "default",
  hover = false,
  ...props 
}, ref) => {
  const baseClasses = "bg-white rounded-2xl border border-gray-200/50 transition-all duration-200"
  
  const variants = {
    default: "shadow-sm",
    elevated: "shadow-lg",
    glass: "bg-white/80 backdrop-blur-md border-white/20 shadow-xl"
  }
  
  const paddings = {
    none: "",
    sm: "p-4",
    default: "p-6",
    lg: "p-8"
  }
  
  const hoverEffects = hover ? "hover:shadow-lg hover:scale-[1.02] cursor-pointer" : ""

  return (
    <div
      ref={ref}
      className={cn(baseClasses, variants[variant], paddings[padding], hoverEffects, className)}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = "Card"

export default Card