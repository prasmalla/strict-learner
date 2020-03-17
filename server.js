require('dotenv').config()
const fs = require('fs')
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const jwt = require('jsonwebtoken')

server.use(jsonServer.bodyParser)
server.use(middlewares)

server.post('/login', (req, res) => {
  const userDB = fs.readFileSync('./db.json')
  const userInfo = JSON.parse(userDB).user

  if (
    req.body &&
    req.body.email === userInfo.email &&
    req.body.password === userInfo.password
  ) {
    const token = jwt.sign({ userInfo }, process.env.SECRET_KEY)
    res.json({
      token,
      email: userInfo.email,
      name: userInfo.name
    })
  } else {
    res.status(401).json({ error: 'Invalid Credentials' })
  }
})

server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  next()
})

server.use(router)
server.listen(8081, () => {})
