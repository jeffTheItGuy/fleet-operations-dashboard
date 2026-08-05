import { useState, useEffect } from 'react'
import { helpdeskApi } from '../services/api.js'

export function useTickets() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true)
        const response = await helpdeskApi.getTickets()
        setTickets(response.data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchTickets()
  }, [])

  return { tickets, loading, error }
}
