import ApperIcon from "@/components/ApperIcon"

const ErrorView = ({ 
  message = "Something went wrong", 
  description = "We encountered an error while processing your request.",
  onRetry 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6">
      <div className="relative">
        <div className="w-20 h-20 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl flex items-center justify-center">
          <ApperIcon name="AlertTriangle" className="w-10 h-10 text-red-500" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center animate-pulse">
          <ApperIcon name="X" className="w-4 h-4 text-white" />
        </div>
      </div>
      
      <div className="text-center space-y-3 max-w-md">
        <h3 className="text-xl font-bold text-gray-900">{message}</h3>
        <p className="text-gray-600">{description}</p>
        <div className="space-y-2 text-sm text-gray-500">
          <p>This could be due to:</p>
          <ul className="text-left space-y-1">
            <li className="flex items-center space-x-2">
              <ApperIcon name="Wifi" className="w-3 h-3" />
              <span>Network connectivity issues</span>
            </li>
            <li className="flex items-center space-x-2">
              <ApperIcon name="FileX" className="w-3 h-3" />
              <span>Invalid or corrupted file</span>
            </li>
            <li className="flex items-center space-x-2">
              <ApperIcon name="Server" className="w-3 h-3" />
              <span>Temporary server issues</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-medium hover:from-primary-600 hover:to-primary-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <ApperIcon name="RefreshCw" className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        )}
        <button
          onClick={() => window.location.reload()}
          className="flex items-center space-x-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:border-gray-300 hover:bg-gray-50 transform hover:scale-105 transition-all duration-200"
        >
          <ApperIcon name="Home" className="w-4 h-4" />
          <span>Start Over</span>
        </button>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200 max-w-md">
        <div className="flex items-start space-x-3">
          <ApperIcon name="Info" className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-blue-900 mb-1">Need Help?</p>
            <p className="text-blue-700">
              If this problem persists, try refreshing the page or check your internet connection.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorView