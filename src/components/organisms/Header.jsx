import ApperIcon from "@/components/ApperIcon"

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-lg">
                <ApperIcon name="FileText" className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-accent-500 to-pink-600 rounded-full flex items-center justify-center">
                <ApperIcon name="Zap" className="w-2 h-2 text-white" />
              </div>
            </div>
            <div>
<h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
SwiftConvert Pro Plus
              </h1>
              <p className="text-sm text-gray-600 -mt-1">Professional PDF Conversion</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
              <ApperIcon name="Shield" className="w-4 h-4 text-green-500" />
              <span className="font-medium">Secure & Private</span>
            </div>
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
              <ApperIcon name="Zap" className="w-4 h-4 text-accent-500" />
              <span className="font-medium">Lightning Fast</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header