import { useState, useEffect } from 'react'
import { fleetApi } from '../services/api.js'

export function useFleetData(type = 'all') {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = type === 'ev' 
          ? await fleetApi.getEVFleet()
          : await fleetApi.getCombustionFleet()
        setData(response.data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchData()
  }, [type])

  return { data, loading, error }
}

export function useVehicleStats() {
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fleetApi.getFleetStats()
        setStats(response.data)
      } catch {
        // silent fail for demo
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  return { stats, loading }
}
