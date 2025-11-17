import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const FormatSelector = ({ formats, selectedFormat, onFormatSelect, sourceFormat }) => {
  const getColorClasses = (color) => {
    const colors = {
      blue: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
      green: "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
      emerald: "from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700",
      teal: "from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700",
      orange: "from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700",
      amber: "from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700",
      pink: "from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700",
      purple: "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
    }
    return colors[color] || colors.blue
  }

  const getBgColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-50 border-blue-200",
      green: "bg-green-50 border-green-200",
      emerald: "bg-emerald-50 border-emerald-200",
      teal: "bg-teal-50 border-teal-200",
      orange: "bg-orange-50 border-orange-200",
      amber: "bg-amber-50 border-amber-200",
      pink: "bg-pink-50 border-pink-200",
      purple: "bg-purple-50 border-purple-200"
    }
    return colors[color] || colors.blue
  }

  const getTextColorClasses = (color) => {
    const colors = {
      blue: "text-blue-700",
      green: "text-green-700",
      emerald: "text-emerald-700",
      teal: "text-teal-700",
      orange: "text-orange-700",
      amber: "text-amber-700",
      pink: "text-pink-700",
      purple: "text-purple-700"
    }
    return colors[color] || colors.blue
  }

  const filteredFormats = sourceFormat 
    ? formats.filter(format => format.sourceFormat === sourceFormat)
    : formats

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold text-gray-900">Choose Conversion Format</h3>
        <p className="text-gray-600">Select the output format for your file conversion</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredFormats.map((format) => (
          <button
            key={format.Id}
            onClick={() => onFormatSelect(format)}
            className={cn(
              "group relative p-6 rounded-2xl border-2 transition-all duration-200 format-tile",
              selectedFormat?.Id === format.Id
                ? `bg-gradient-to-br ${getColorClasses(format.color)} text-white border-transparent shadow-lg scale-105`
                : `${getBgColorClasses(format.color)} border-transparent hover:shadow-lg`,
              "focus:outline-none focus:ring-4 focus:ring-primary-500/20"
            )}
          >
            <div className="flex flex-col items-center space-y-3">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200",
                selectedFormat?.Id === format.Id
                  ? "bg-white/20"
                  : "bg-white shadow-sm group-hover:shadow-md group-hover:scale-110"
              )}>
                <ApperIcon 
                  name={format.icon} 
                  className={cn(
                    "w-6 h-6 transition-all duration-200",
                    selectedFormat?.Id === format.Id
                      ? "text-white"
                      : getTextColorClasses(format.color)
                  )} 
                />
              </div>
              
              <div className="text-center">
                <h4 className={cn(
                  "font-semibold text-sm transition-all duration-200",
                  selectedFormat?.Id === format.Id
                    ? "text-white"
                    : getTextColorClasses(format.color)
                )}>
                  {format.name}
                </h4>
                <p className={cn(
                  "text-xs mt-1 transition-all duration-200",
                  selectedFormat?.Id === format.Id
                    ? "text-white/80"
                    : "text-gray-500"
                )}>
                  {format.sourceFormat.toUpperCase()} → {format.targetFormat.toUpperCase()}
                </p>
              </div>
            </div>

            {selectedFormat?.Id === format.Id && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg success-bounce">
                <ApperIcon name="Check" className="w-3 h-3 text-green-500" />
              </div>
            )}
          </button>
        ))}
      </div>

      {selectedFormat && (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
          <div className="flex items-start space-x-4">
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center",
              `bg-gradient-to-br ${getColorClasses(selectedFormat.color)}`
            )}>
              <ApperIcon name={selectedFormat.icon} className="w-6 h-6 text-white" />
            </div>
            
            <div className="flex-1 space-y-3">
              <div>
                <h4 className="font-semibold text-gray-900">{selectedFormat.name}</h4>
                <p className="text-sm text-gray-600">{selectedFormat.description}</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {selectedFormat.features.map((feature, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg"
                  >
                    <ApperIcon name="Check" className="w-3 h-3 text-green-500" />
                    <span>{feature}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FormatSelector