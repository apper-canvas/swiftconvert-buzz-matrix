import conversionJobsData from "@/services/mockData/conversionJobs.json"
import supportedFormatsData from "@/services/mockData/supportedFormats.json"

let conversionJobs = [...conversionJobsData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const conversionService = {
  async getAllJobs() {
    await delay(300)
    return [...conversionJobs].sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
  },

  async getJobById(id) {
    await delay(200)
    const job = conversionJobs.find(job => job.Id === parseInt(id))
    return job ? { ...job } : null
  },

  async createJob(jobData) {
    await delay(400)
    const newId = Math.max(...conversionJobs.map(job => job.Id)) + 1
    const newJob = {
      Id: newId,
      fileName: jobData.fileName,
      fileSize: jobData.fileSize,
      sourceFormat: jobData.sourceFormat,
      targetFormat: jobData.targetFormat,
      status: "uploading",
      progress: 0,
      uploadedAt: new Date().toISOString(),
      completedAt: null,
      downloadUrl: null,
      previewUrl: jobData.previewUrl || null
    }
    conversionJobs.push(newJob)
    return { ...newJob }
  },

  async updateJob(id, updateData) {
    await delay(250)
    const jobIndex = conversionJobs.findIndex(job => job.Id === parseInt(id))
    if (jobIndex === -1) {
      throw new Error("Job not found")
    }
    
    conversionJobs[jobIndex] = {
      ...conversionJobs[jobIndex],
      ...updateData,
      Id: parseInt(id)
    }
    return { ...conversionJobs[jobIndex] }
  },

  async deleteJob(id) {
    await delay(200)
    const jobIndex = conversionJobs.findIndex(job => job.Id === parseInt(id))
    if (jobIndex === -1) {
      throw new Error("Job not found")
    }
    
    conversionJobs.splice(jobIndex, 1)
    return true
  },

  async getSupportedFormats() {
    await delay(200)
    return [...supportedFormatsData]
  },

  async processFile(file, sourceFormat, targetFormat) {
    await delay(500)
    
    // Simulate processing with progress updates
    const jobData = {
      fileName: file.name,
      fileSize: file.size,
      sourceFormat,
      targetFormat,
      previewUrl: `/previews/${file.name.replace(/\.[^/.]+$/, '')}.jpg`
    }
    
    const job = await this.createJob(jobData)
    
    // Simulate processing stages
    await this.updateJob(job.Id, { status: "processing", progress: 25 })
    await delay(800)
    
    await this.updateJob(job.Id, { progress: 50 })
    await delay(600)
    
    await this.updateJob(job.Id, { progress: 75 })
    await delay(400)
    
    const completedJob = await this.updateJob(job.Id, {
      status: "completed",
      progress: 100,
      completedAt: new Date().toISOString(),
      downloadUrl: `/downloads/${file.name.replace(/\.[^/.]+$/, '')}.${targetFormat}`
    })
    
    return completedJob
  },

  async getConversionHistory(limit = 10) {
    await delay(300)
    return [...conversionJobs]
      .filter(job => job.status === "completed")
      .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
      .slice(0, limit)
  }
}