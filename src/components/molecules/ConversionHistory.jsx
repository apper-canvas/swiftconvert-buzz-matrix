import { useState, useEffect } from "react"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import { conversionService } from "@/services/api/conversionService"
import { formatDistanceToNow } from "date-fns"

const ConversionHistory = () => {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = async () => {
    try {
      setLoading(true)
      const data = await conversionService.getConversionHistory()
      setHistory(data)
    } catch (error) {
      console.error("Failed to load conversion history:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFormatIcon = (format) => {
    switch (format.toLowerCase()) {
      case "pdf":
        return "FileText"
      case "docx":
      case "doc":
        return "FileType"
      case "xlsx":
      case "xls":
        return "FileSpreadsheet"
      case "pptx":
      case "ppt":
        return "Monitor"
      case "jpg":
      case "png":
      case "jpeg":
        return "Image"
      default:
        return "File"
    }
  }

  const downloadFile = (job) => {
    // In a real app, this would trigger the actual download
    const link = document.createElement("a")
    link.href = job.downloadUrl
    link.download = job.fileName.replace(/\.[^/.]+$/, `.${job.targetFormat}`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (loading) {
    return (
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gray-200 shimmer rounded-lg"></div>
          <div className="h-5 bg-gray-200 shimmer rounded w-32"></div>
        </div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 shimmer rounded-xl"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 shimmer rounded w-24"></div>
                  <div className="h-3 bg-gray-200 shimmer rounded w-16"></div>
                </div>
              </div>
              <div className="w-20 h-8 bg-gray-200 shimmer rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (history.length === 0) {
    return (
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="Clock" className="w-8 h-8 text-gray-400" />
        </div>
        <h4 className="font-semibold text-gray-900 mb-2">No Recent Conversions</h4>
        <p className="text-sm text-gray-600">Your conversion history will appear here once you start converting files.</p>
      </div>
    )
  }

  const displayHistory = expanded ? history : history.slice(0, 3)

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
            <ApperIcon name="Clock" className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Recent Conversions</h3>
        </div>
        <Badge variant="default" size="sm">
          {history.length} files
        </Badge>
      </div>

      <div className="space-y-3">
        {displayHistory.map((job) => (
          <div 
            key={job.Id} 
            className="flex items-center justify-between p-4 bg-white/80 rounded-xl border border-gray-100 hover:bg-white transition-all duration-200"
          >
<div className="flex items-center space-x-4 md:space-x-3 flex-1 min-w-0">
              <div className="flex -space-x-2 md:-space-x-1">
                <div className="w-10 h-10 md:w-8 md:h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center z-10">
                  <ApperIcon name={getFormatIcon(job.sourceFormat)} className="w-4 h-4 md:w-3 md:h-3 text-white" />
                </div>
                <div className="w-10 h-10 md:w-8 md:h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <ApperIcon name={getFormatIcon(job.targetFormat)} className="w-4 h-4 md:w-3 md:h-3 text-white" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0 space-y-1">
                <h4 className="font-medium text-gray-900 truncate text-sm md:text-base">
                  {job.fileName}
                </h4>
                <div className="flex items-center space-x-2 md:space-x-1 text-xs md:text-xs text-gray-600 flex-wrap md:gap-1">
                  <span className="shrink-0">{formatFileSize(job.fileSize)}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="shrink-0">{job.sourceFormat.toUpperCase()} → {job.targetFormat.toUpperCase()}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="shrink-0">{formatDistanceToNow(new Date(job.completedAt))} ago</span>
                </div>
              </div>
            </div>

<div className="flex items-center space-x-2 md:space-x-1">
              <Button
                variant="ghost"
                size="sm"
                icon="Download"
                onClick={() => downloadFile(job)}
                className="text-gray-600 hover:text-primary-600 px-3 md:px-2 text-sm md:text-xs"
              >
                <span className="hidden sm:inline">Download</span>
                <span className="sm:hidden">DL</span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {history.length > 3 && (
        <div className="mt-4 text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            icon={expanded ? "ChevronUp" : "ChevronDown"}
          >
            {expanded ? "Show Less" : `Show ${history.length - 3} More`}
          </Button>
        </div>
      )}
    </div>
  )
}

export default ConversionHistory