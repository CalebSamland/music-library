module.exports = {
  app: {
    name: 'MusicLibrary',
    apiEndpoint: (process.env.API_URL) ? `/${process.env.API_URL}` : '/api',
  },
  database: {
    url: process.env.MONGODB_URI || `mongodb+srv://Caleb:QKspxft3XBrzi0Ts@cluster0.nssyz.mongodb.net/?retryWrites=true&w=majority`,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'jwt-secret',
    tokenLife: '7d',
  },
}
