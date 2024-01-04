import cors from 'cors'
const ACEPTED_ORIGINS = ['http://localhost:1234', 'http://127.0.0.1:5500', '*']

export const corsMidelware = ({ aceptedOrigins = ACEPTED_ORIGINS } = {}) => (cors({
  origin: (origin, callback) => {
    if (aceptedOrigins.includes(origin)) {
      return callback(null, true)
    }
    if (!origin) {
      return callback(null, true)
    }
    return callback(new Error('not allowed by CORS'))
  }
}))
