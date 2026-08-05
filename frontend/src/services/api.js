import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// Fleet API — READ ONLY
export const fleetApi = {
  getEVFleet: () => api.get('/fleet/ev'),
  getCombustionFleet: () => api.get('/fleet/combustion'),
  getVehicleById: (id) => api.get(`/fleet/vehicles/${id}`),
  getFleetStats: () => api.get('/fleet/stats'),
}

// Maintenance API — READ ONLY
export const maintenanceApi = {
  getAlerts: () => api.get('/maintenance/alerts'),
  getServiceLog: () => api.get('/maintenance/log'),
}

// Transport API — READ ONLY
export const transportApi = {
  getRoutes: () => api.get('/transport/routes'),
  getIncidents: () => api.get('/transport/incidents'),
}

// Assets API — READ ONLY
export const assetsApi = {
  getAssets: () => api.get('/assets'),
  getAssetById: (id) => api.get(`/assets/${id}`),
}

// Helpdesk API — READ ONLY
export const helpdeskApi = {
  getTickets: () => api.get('/tickets'),
  getTicketById: (id) => api.get(`/tickets/${id}`),
}

// Compliance API — READ ONLY
export const complianceApi = {
  getDepartments: () => api.get('/compliance/departments'),
}

export default api
