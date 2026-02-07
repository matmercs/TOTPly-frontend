export const CONFIG = {
  // 'test' or 'real'
  MODE: (import.meta.env.VITE_APP_MODE as 'test' | 'real') || 'test',
  API_BASE: '/api'
}
