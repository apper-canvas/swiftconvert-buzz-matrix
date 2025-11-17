import ApperIcon from "@/components/ApperIcon"

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6">
      <div className="relative">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center animate-pulse">
          <ApperIcon name="FileText" className="w-8 h-8 text-primary-400" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-accent-400 to-pink-500 rounded-full flex items-center justify-center animate-bounce">
          <ApperIcon name="Loader2" className="w-3 h-3 text-white animate-spin" />
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="w-2 h-2 bg-accent-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
        <p className="text-gray-600 font-medium">{message}</p>
        <p className="text-sm text-gray-500">Please wait while we prepare your conversion tools</p>
      </div>

      {/* Shimmer skeleton for converter interface */}
      <div className="w-full max-w-4xl mx-auto space-y-6 mt-8">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 space-y-6">
          <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 shimmer rounded-lg"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-100 to-gray-200 shimmer h-24 rounded-xl"></div>
            ))}
          </div>
          <div className="h-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 shimmer rounded-xl border-2 border-dashed border-gray-300"></div>
        </div>
      </div>
    </div>
  )
}

export default Loading