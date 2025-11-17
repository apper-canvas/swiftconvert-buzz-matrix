import { useNavigate } from "react-router-dom"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-8">
      <div className="relative">
        <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center">
          <ApperIcon name="FileQuestion" className="w-16 h-16 text-gray-400" />
        </div>
        <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center animate-bounce">
          <ApperIcon name="AlertTriangle" className="w-6 h-6 text-white" />
        </div>
      </div>

      <div className="space-y-4 max-w-md">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          404 - Page Not Found
        </h1>
        <p className="text-lg text-gray-600">
          Oops! The page you're looking for seems to have been converted to a different format.
        </p>
        <p className="text-sm text-gray-500">
          Don't worry, our conversion tools are still working perfectly! Let's get you back to converting files.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={() => navigate("/")}
          icon="Home"
          size="lg"
          variant="primary"
        >
          Back to Converter
        </Button>
        <Button
          onClick={() => window.location.reload()}
          icon="RefreshCw"
          size="lg"
          variant="outline"
        >
          Refresh Page
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
        <div className="flex flex-col items-center space-y-2 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50">
          <ApperIcon name="FileText" className="w-8 h-8 text-red-500" />
          <span className="text-sm font-medium text-gray-700">PDF</span>
          <span className="text-xs text-gray-500">Documents</span>
        </div>
        <div className="flex flex-col items-center space-y-2 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50">
          <ApperIcon name="Image" className="w-8 h-8 text-pink-500" />
          <span className="text-sm font-medium text-gray-700">Images</span>
          <span className="text-xs text-gray-500">JPG, PNG</span>
        </div>
        <div className="flex flex-col items-center space-y-2 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50">
          <ApperIcon name="FileSpreadsheet" className="w-8 h-8 text-green-500" />
          <span className="text-sm font-medium text-gray-700">Excel</span>
          <span className="text-xs text-gray-500">Spreadsheets</span>
        </div>
        <div className="flex flex-col items-center space-y-2 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50">
          <ApperIcon name="Monitor" className="w-8 h-8 text-orange-500" />
          <span className="text-sm font-medium text-gray-700">PowerPoint</span>
          <span className="text-xs text-gray-500">Presentations</span>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 space-y-1 max-w-md">
        <p>Need help? Our conversion tools support over 8 different file formats.</p>
        <p>Convert PDF to Word, Excel to PDF, Images to PDF, and much more!</p>
      </div>
    </div>
  )
}

export default NotFound