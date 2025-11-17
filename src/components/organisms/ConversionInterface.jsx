import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import FileUpload from "@/components/molecules/FileUpload"
import FormatSelector from "@/components/molecules/FormatSelector"
import ConversionProgress from "@/components/molecules/ConversionProgress"
import ConversionHistory from "@/components/molecules/ConversionHistory"
import Button from "@/components/atoms/Button"
import { conversionService } from "@/services/api/conversionService"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const ConversionInterface = () => {
  const [formats, setFormats] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const [selectedFormat, setSelectedFormat] = useState(null)
  const [currentJob, setCurrentJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadFormats()
  }, [])

  const loadFormats = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await conversionService.getSupportedFormats()
      setFormats(data)
    } catch (err) {
      setError("Failed to load conversion formats")
      console.error("Error loading formats:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = (file, extension, mimeType) => {
    setSelectedFile({ file, extension, mimeType })
    setSelectedFormat(null)
    setCurrentJob(null)
    
    toast.success(`File "${file.name}" selected successfully!`, {
      position: "top-right"
    })
  }

  const handleFormatSelect = (format) => {
    setSelectedFormat(format)
    toast.info(`Selected ${format.name} conversion`, {
      position: "top-right"
    })
  }

  const startConversion = async () => {
    if (!selectedFile || !selectedFormat) {
      toast.error("Please select a file and conversion format")
      return
    }

    try {
      setCurrentJob({ status: "uploading", progress: 0, fileName: selectedFile.file.name })
      
      const job = await conversionService.processFile(
        selectedFile.file,
        selectedFormat.sourceFormat,
        selectedFormat.targetFormat
      )
      
      setCurrentJob(job)
      toast.success("Conversion completed successfully!", {
        position: "top-right"
      })
    } catch (err) {
      setCurrentJob(prev => ({
        ...prev,
        status: "error",
        progress: 0
      }))
      toast.error("Conversion failed. Please try again.")
      console.error("Conversion error:", err)
    }
  }

  const handleDownload = (job) => {
    // In a real app, this would trigger the actual download
    const link = document.createElement("a")
    link.href = job.downloadUrl
    link.download = job.fileName.replace(/\.[^/.]+$/, `.${job.targetFormat}`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    toast.success("Download started!", {
      position: "top-right"
    })
  }

  const handleRetry = () => {
    setCurrentJob(null)
    startConversion()
  }

  const resetConversion = () => {
    setSelectedFile(null)
    setSelectedFormat(null)
    setCurrentJob(null)
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-3xl flex items-center justify-center mx-auto animate-pulse">
            <ApperIcon name="FileText" className="w-10 h-10 text-primary-400" />
          </div>
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 shimmer rounded-lg w-64 mx-auto"></div>
            <div className="h-4 bg-gray-200 shimmer rounded w-96 mx-auto"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white/60 p-6 rounded-2xl">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-gray-200 shimmer rounded-xl mx-auto"></div>
                <div className="h-4 bg-gray-200 shimmer rounded"></div>
                <div className="h-3 bg-gray-200 shimmer rounded w-3/4 mx-auto"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div className="w-20 h-20 bg-gradient-to-br from-red-50 to-red-100 rounded-3xl flex items-center justify-center mx-auto">
          <ApperIcon name="AlertTriangle" className="w-10 h-10 text-red-500" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Unable to Load Converter</h2>
          <p className="text-gray-600">{error}</p>
        </div>
        <Button onClick={loadFormats} icon="RefreshCw" variant="primary">
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-3 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200/50">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
            <ApperIcon name="Zap" className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700">Professional PDF Conversion</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-primary-600 to-secondary-600 bg-clip-text text-transparent">
          Convert Files Instantly
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Transform your documents with professional-grade conversion tools. Fast, secure, and reliable.
        </p>
      </div>

      {/* Main Conversion Interface */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {!selectedFile ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50">
              <FileUpload onFileSelect={handleFileSelect} />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Selected File Display */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <ApperIcon name="FileText" className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedFile.file.name}</h3>
                      <p className="text-sm text-gray-600">
                        {(selectedFile.file.size / 1024 / 1024).toFixed(2)} MB • {selectedFile.extension?.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon="X"
                    onClick={resetConversion}
                  >
                    Remove
                  </Button>
                </div>
              </div>

              {/* Format Selection */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50">
                <FormatSelector
                  formats={formats}
                  selectedFormat={selectedFormat}
                  onFormatSelect={handleFormatSelect}
                  sourceFormat={selectedFile.extension}
                />
              </div>

              {/* Convert Button */}
              {selectedFormat && !currentJob && (
                <div className="text-center">
                  <Button
                    onClick={startConversion}
                    size="lg"
                    icon="Zap"
                    className="px-12 py-4 text-lg font-semibold bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700"
                  >
                    Start Conversion
                  </Button>
                </div>
              )}

              {/* Conversion Progress */}
              {currentJob && (
                <ConversionProgress
                  job={currentJob}
                  onDownload={handleDownload}
                  onRetry={handleRetry}
                />
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <ConversionHistory />
          
          {/* Features */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <ApperIcon name="Star" className="w-5 h-5 text-yellow-500" />
              <span>Why Choose SwiftConvert?</span>
            </h3>
            <div className="space-y-3">
              {[
                { icon: "Shield", text: "100% Secure & Private", color: "text-green-500" },
                { icon: "Zap", text: "Lightning Fast Processing", color: "text-yellow-500" },
                { icon: "FileCheck", text: "Preserve Original Quality", color: "text-blue-500" },
                { icon: "Download", text: "Instant Download Ready", color: "text-purple-500" }
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <ApperIcon name={feature.icon} className={cn("w-4 h-4", feature.color)} />
                  <span className="text-sm text-gray-700">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConversionInterface