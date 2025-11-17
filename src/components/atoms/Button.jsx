import { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Button = forwardRef(({ 
  children, 
  className, 
  variant = "default", 
  size = "default", 
  icon, 
  iconPosition = "left",
  loading = false,
  disabled = false,
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-98"
  
  const variants = {
    default: "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 focus:ring-primary-500 shadow-lg hover:shadow-xl hover:scale-105",
    secondary: "bg-gradient-to-r from-secondary-500 to-secondary-600 text-white hover:from-secondary-600 hover:to-secondary-700 focus:ring-secondary-500 shadow-lg hover:shadow-xl hover:scale-105",
    accent: "bg-gradient-to-r from-accent-500 to-accent-600 text-white hover:from-accent-600 hover:to-accent-700 focus:ring-accent-500 shadow-lg hover:shadow-xl hover:scale-105",
    outline: "border-2 border-gray-300 text-gray-700 bg-white hover:border-gray-400 hover:bg-gray-50 focus:ring-gray-500 hover:scale-105",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500",
    success: "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 focus:ring-green-500 shadow-lg hover:shadow-xl hover:scale-105",
    danger: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 focus:ring-red-500 shadow-lg hover:shadow-xl hover:scale-105"
  }
  
  const sizes = {
    sm: "px-3 py-2 text-sm h-9",
    default: "px-6 py-3 text-sm h-12",
    lg: "px-8 py-4 text-base h-14"
  }

  const iconSize = {
    sm: 14,
    default: 16,
    lg: 18
  }

  const renderIcon = () => {
    if (loading) {
      return <ApperIcon name="Loader2" className={cn("animate-spin", iconPosition === "right" ? "ml-2" : "mr-2")} size={iconSize[size]} />
    }
    if (icon) {
      return <ApperIcon name={icon} className={iconPosition === "right" ? "ml-2" : "mr-2"} size={iconSize[size]} />
    }
    return null
  }

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    >
      {iconPosition === "left" && renderIcon()}
      {children}
      {iconPosition === "right" && renderIcon()}
    </button>
  )
})

Button.displayName = "Button"

export default Button