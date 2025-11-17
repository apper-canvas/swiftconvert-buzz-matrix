import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Badge = forwardRef(({ 
  children, 
  className, 
  variant = "default", 
  size = "default",
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center rounded-full font-medium transition-all duration-200"
  
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-sm",
    secondary: "bg-gradient-to-r from-secondary-500 to-secondary-600 text-white shadow-sm",
    accent: "bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-sm",
    success: "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-sm",
    warning: "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-sm",
    danger: "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-sm",
    outline: "border-2 border-gray-300 text-gray-700 bg-transparent"
  }
  
  const sizes = {
    sm: "px-2 py-1 text-xs",
    default: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base"
  }

  return (
    <span
      ref={ref}
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </span>
  )
})

Badge.displayName = "Badge"

export default Badge