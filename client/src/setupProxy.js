const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    '/api',
    proxy({
      target: 'http://localhost:5000',
      // target: "https://blooming-thicket-77937.herokuapp.com"
      // target: " http://7e6687d4.ngrok.io",
      changeOrigin: true
    })
  )
}
