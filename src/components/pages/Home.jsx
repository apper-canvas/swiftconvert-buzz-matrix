import { useState, useEffect } from "react"
import ConversionInterface from "@/components/organisms/ConversionInterface"
import Loading from "@/components/ui/Loading"
import ErrorView from "@/components/ui/ErrorView"

const Home = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Simulate app initialization
    const initializeApp = async () => {
      try {
        setError(null)
        // Simulate some initialization delay
        await new Promise(resolve => setTimeout(resolve, 800))
        setLoading(false)
      } catch (err) {
        setError("Failed to initialize the application")
        setLoading(false)
      }
    }

    initializeApp()
  }, [])

  const handleRetry = () => {
    setLoading(true)
    setError(null)
    // Re-run initialization
    setTimeout(() => {
      setLoading(false)
    }, 800)
  }

  if (loading) {
    return <Loading message="Initializing SwiftConvert..." />
  }

  if (error) {
    return (
      <ErrorView
        message="Failed to Load Application"
        description={error}
        onRetry={handleRetry}
      />
    )
  }

  return <ConversionInterface />
}

export default Home