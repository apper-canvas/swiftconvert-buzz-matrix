import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Input = forwardRef(({ 
  className, 
  type = "text", 
  label,
  error,
  helper,
  icon,
  ...props 
}, ref) => {
  const inputClasses = cn(
    "flex h-12 w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
    error && "border-red-300 focus:border-red-500 focus:ring-red-500/20",
    className
  )

  const inputElement = (
    <input
      type={type}
      ref={ref}
      className={inputClasses}
      {...props}
    />
  )

  if (!label && !error && !helper) {
    return inputElement
  }

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {inputElement}
        {icon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-600 flex items-center space-x-1">
          <span>{error}</span>
        </p>
      )}
      {helper && !error && (
        <p className="text-sm text-gray-500">{helper}</p>
      )}
    </div>
  )
})

Input.displayName = "Input"

export default Input