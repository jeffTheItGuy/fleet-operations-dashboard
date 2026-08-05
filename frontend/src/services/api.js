import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// Request interceptor - add auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('cmed_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor - handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('cmed_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Fleet API
export const fleetApi = {
  getEVFleet: () => api.get('/fleet/ev'),
  getCombustionFleet: () => api.get('/fleet/combustion'),
  getVehicleById: (id) => api.get(`/fleet/vehicles/${id}`),
  updateVehicleStatus: (id, status) => api.patch(`/fleet/vehicles/${id}/status`, { status }),
}

// Maintenance API
export const maintenanceApi = {
  getAlerts: () => api.get('/maintenance/alerts'),
  getServiceLog: () => api.get('/maintenance/log'),
  scheduleService: (data) => api.post('/maintenance/schedule', data),
  completeService: (id, data) => api.post(`/maintenance/complete/${id}`, data),
}

// Transport API
export const transportApi = {
  getRoutes: () => api.get('/transport/routes'),
  getIncidents: () => api.get('/transport/incidents'),
  reportIncident: (data) => api.post('/transport/incidents', data),
}

// Assets API
export const assetsApi = {
  getAssets: () => api.get('/assets'),
  getAssetById: (id) => api.get(`/assets/${id}`),
  createAsset: (data) => api.post('/assets', data),
  updateAsset: (id, data) => api.patch(`/assets/${id}`, data),
}

// Helpdesk API
export const helpdeskApi = {
  getTickets: () => api.get('/tickets'),
  getTicketById: (id) => api.get(`/tickets/${id}`),
  createTicket: (data) => api.post('/tickets', data),
  addComment: (id, data) => api.post(`/tickets/${id}/comments`, data),
  updateTicketStatus: (id, status) => api.patch(`/tickets/${id}/status`, { status }),
}

// Compliance API
export const complianceApi = {
  getDepartments: () => api.get('/compliance/departments'),
  updateBackupStatus: (deptId, data) => api.patch(`/compliance/departments/${deptId}/backup`, data),
  updateTrainingStatus: (deptId, data) => api.patch(`/compliance/departments/${deptId}/training`, data),
}

export default api
