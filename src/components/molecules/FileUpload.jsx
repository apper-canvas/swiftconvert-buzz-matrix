import { useState, useRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const FileUpload = ({ 
  onFileSelect, 
  acceptedTypes = "application/pdf,image/*,.doc,.docx,.xls,.xlsx,.ppt,.pptx",
  maxSize = 10 * 1024 * 1024, // 10MB
  className 
}) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef(null)

  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.currentTarget.contains(e.relatedTarget)) return
    setIsDragOver(false)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelection(files[0])
    }
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      handleFileSelection(files[0])
    }
  }

  const handleFileSelection = (file) => {
    // Validate file size
    if (file.size > maxSize) {
      alert(`File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`)
      return
    }

    // Get file extension and type
    const extension = file.name.split('.').pop()?.toLowerCase()
    const mimeType = file.type

    onFileSelect(file, extension, mimeType)
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center transition-all duration-200 cursor-pointer",
          "hover:border-primary-400 hover:bg-primary-50/50",
          isDragOver && "border-primary-500 bg-primary-50 scale-[1.01]"
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes}
          onChange={handleFileChange}
          className="hidden"
        />
        
        <div className="flex flex-col items-center space-y-4">
          <div className={cn(
            "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-200",
            isDragOver 
              ? "bg-gradient-to-br from-primary-500 to-secondary-500 scale-110" 
              : "bg-gradient-to-br from-gray-100 to-gray-200"
          )}>
            <ApperIcon 
              name={isDragOver ? "Upload" : "FileText"} 
              className={cn(
                "w-8 h-8 transition-all duration-200",
                isDragOver ? "text-white" : "text-gray-500"
              )} 
            />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {isDragOver ? "Drop your file here" : "Choose file or drag and drop"}
            </h3>
            <p className="text-sm text-gray-600">
              PDF, Word, Excel, PowerPoint, Images up to {Math.round(maxSize / 1024 / 1024)}MB
            </p>
          </div>

          <Button
            variant="outline"
            icon="FolderOpen"
            className="mt-4"
            onClick={(e) => {
              e.stopPropagation()
              openFileDialog()
            }}
          >
            Browse Files
          </Button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 text-xs text-gray-500">
        <div className="flex items-center justify-center space-x-1 p-2 bg-red-50 rounded-lg">
          <ApperIcon name="FileText" className="w-3 h-3 text-red-500" />
          <span>PDF</span>
        </div>
        <div className="flex items-center justify-center space-x-1 p-2 bg-blue-50 rounded-lg">
          <ApperIcon name="FileType" className="w-3 h-3 text-blue-500" />
          <span>DOC</span>
        </div>
        <div className="flex items-center justify-center space-x-1 p-2 bg-green-50 rounded-lg">
          <ApperIcon name="FileSpreadsheet" className="w-3 h-3 text-green-500" />
          <span>XLS</span>
        </div>
        <div className="flex items-center justify-center space-x-1 p-2 bg-purple-50 rounded-lg">
          <ApperIcon name="Image" className="w-3 h-3 text-purple-500" />
          <span>IMG</span>
        </div>
      </div>
    </div>
  )
}

export default FileUpload