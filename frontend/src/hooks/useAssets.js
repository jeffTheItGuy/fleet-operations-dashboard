import { useState, useEffect } from 'react'
import { assetsApi } from '../services/api.js'

export function useAssets() {
  const [assets, setAssets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        setLoading(true)
        // Uncomment when backend is connected
        // const response = await assetsApi.getAssets()
        // setAssets(response.data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchAssets()
  }, [])

  return { assets, loading, error }
}
