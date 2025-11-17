import { useEffect, useState } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"

const ConversionProgress = ({ job, onDownload, onRetry }) => {
  const [displayProgress, setDisplayProgress] = useState(0)

  useEffect(() => {
    if (job?.progress !== undefined) {
      const timer = setTimeout(() => {
        setDisplayProgress(job.progress)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [job?.progress])

  const getStatusIcon = (status) => {
    switch (status) {
      case "uploading":
        return "Upload"
      case "processing":
        return "Loader2"
      case "completed":
        return "CheckCircle"
      case "error":
        return "XCircle"
      default:
        return "FileText"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "uploading":
        return "primary"
      case "processing":
        return "secondary"
      case "completed":
        return "success"
      case "error":
        return "danger"
      default:
        return "default"
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "uploading":
        return "Uploading file..."
      case "processing":
        return "Converting document..."
      case "completed":
        return "Conversion completed!"
      case "error":
        return "Conversion failed"
      default:
        return "Preparing..."
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  if (!job) return null

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
            job.status === "completed" 
              ? "bg-gradient-to-br from-green-500 to-green-600"
              : job.status === "error"
              ? "bg-gradient-to-br from-red-500 to-red-600"
              : "bg-gradient-to-br from-primary-500 to-secondary-500"
          )}>
            <ApperIcon 
              name={getStatusIcon(job.status)} 
              className={cn(
                "w-6 h-6 text-white transition-all duration-300",
                job.status === "processing" && "animate-spin"
              )} 
            />
          </div>
          
          <div className="space-y-1">
            <h4 className="font-semibold text-gray-900 truncate max-w-[200px] sm:max-w-none">
              {job.fileName}
            </h4>
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <span>{formatFileSize(job.fileSize)}</span>
              <span>•</span>
              <span>{job.sourceFormat.toUpperCase()} → {job.targetFormat.toUpperCase()}</span>
            </div>
          </div>
        </div>

        <Badge variant={getStatusColor(job.status)}>
          {getStatusText(job.status)}
        </Badge>
      </div>

      {(job.status === "uploading" || job.status === "processing") && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">{getStatusText(job.status)}</span>
            <span className="font-medium text-gray-900">{displayProgress}%</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className={cn(
                "h-full transition-all duration-500 ease-out progress-gradient",
                job.status === "processing" && "animate-pulse"
              )}
              style={{ width: `${displayProgress}%` }}
            />
          </div>
          
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
            <ApperIcon name="Clock" className="w-3 h-3" />
            <span>
              {job.status === "uploading" 
                ? "Uploading your file securely..." 
                : "Converting with advanced algorithms..."
              }
            </span>
          </div>
        </div>
      )}

      {job.status === "completed" && (
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2 text-green-600 success-bounce">
            <ApperIcon name="CheckCircle" className="w-5 h-5" />
            <span className="font-medium">Your file has been converted successfully!</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="success"
              icon="Download"
              className="flex-1"
              onClick={() => onDownload?.(job)}
            >
              Download Converted File
            </Button>
            <Button
              variant="outline"
              icon="Eye"
              onClick={() => window.open(job.previewUrl, "_blank")}
            >
              Preview
            </Button>
          </div>
          
          <div className="text-center text-xs text-gray-500 space-y-1">
            <p>File will be automatically deleted after 24 hours</p>
            <p>Converted in {Math.round((new Date(job.completedAt) - new Date(job.uploadedAt)) / 1000)}s</p>
          </div>
        </div>
      )}

      {job.status === "error" && (
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2 text-red-600">
            <ApperIcon name="XCircle" className="w-5 h-5" />
            <span className="font-medium">Conversion failed. Please try again.</span>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <ApperIcon name="AlertTriangle" className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-red-900 mb-1">Possible causes:</p>
                <ul className="text-red-700 space-y-1 list-disc list-inside">
                  <li>File may be corrupted or password protected</li>
                  <li>Unsupported file format or version</li>
                  <li>File size exceeds maximum limit</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="danger"
              icon="RefreshCw"
              className="flex-1"
              onClick={() => onRetry?.(job)}
            >
              Try Again
            </Button>
            <Button
              variant="outline"
              icon="Upload"
              onClick={() => window.location.reload()}
            >
              Upload New File
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ConversionProgress