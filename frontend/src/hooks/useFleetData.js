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
        // In demo mode, we use mock data since backend may not be running
        // When backend is connected, uncomment the API calls below

        // const response = type === 'ev' 
        //   ? await fleetApi.getEVFleet()
        //   : await fleetApi.getCombustionFleet()
        // setData(response.data)

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
  const [stats, setStats] = useState({
    total: 187,
    ev: 44,
    combustion: 143,
    active: 168,
    maintenance: 23,
    critical: 2,
  })

  return stats
}
