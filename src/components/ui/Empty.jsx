import ApperIcon from "@/components/ApperIcon"

const Empty = ({ 
  title = "No files to convert", 
  description = "Upload a file to get started with your conversion.",
  actionText = "Choose File",
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6">
      <div className="relative">
        <div className="w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl flex items-center justify-center">
          <ApperIcon name="FileText" className="w-12 h-12 text-gray-400" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
          <ApperIcon name="Plus" className="w-4 h-4 text-white" />
        </div>
      </div>
      
      <div className="text-center space-y-3 max-w-md">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
        
        <div className="grid grid-cols-2 gap-4 mt-6 text-sm text-gray-500">
          <div className="flex flex-col items-center space-y-2 p-3 bg-blue-50 rounded-xl">
            <ApperIcon name="FileText" className="w-6 h-6 text-blue-500" />
            <span className="font-medium">PDF Documents</span>
          </div>
          <div className="flex flex-col items-center space-y-2 p-3 bg-green-50 rounded-xl">
            <ApperIcon name="Image" className="w-6 h-6 text-green-500" />
            <span className="font-medium">Images</span>
          </div>
          <div className="flex flex-col items-center space-y-2 p-3 bg-orange-50 rounded-xl">
            <ApperIcon name="FileSpreadsheet" className="w-6 h-6 text-orange-500" />
            <span className="font-medium">Documents</span>
          </div>
          <div className="flex flex-col items-center space-y-2 p-3 bg-purple-50 rounded-xl">
            <ApperIcon name="Presentation" className="w-6 h-6 text-purple-500" />
            <span className="font-medium">Presentations</span>
          </div>
        </div>
      </div>

      {onAction && (
        <button
          onClick={onAction}
          className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-semibold hover:from-primary-600 hover:to-secondary-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <ApperIcon name="Upload" className="w-5 h-5" />
          <span>{actionText}</span>
        </button>
      )}

      <div className="flex flex-wrap justify-center gap-4 mt-8 text-xs text-gray-500">
        <div className="flex items-center space-x-1">
          <ApperIcon name="Shield" className="w-3 h-3 text-green-500" />
          <span>100% Secure</span>
        </div>
        <div className="flex items-center space-x-1">
          <ApperIcon name="Zap" className="w-3 h-3 text-accent-500" />
          <span>Fast Conversion</span>
        </div>
        <div className="flex items-center space-x-1">
          <ApperIcon name="Download" className="w-3 h-3 text-blue-500" />
          <span>Instant Download</span>
        </div>
        <div className="flex items-center space-x-1">
          <ApperIcon name="Trash2" className="w-3 h-3 text-gray-400" />
          <span>Auto Delete</span>
        </div>
      </div>
    </div>
  )
}

export default Empty