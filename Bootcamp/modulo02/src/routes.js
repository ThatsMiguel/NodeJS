const express = require('express')
const routes = express.Router()
const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

// rota chamada quando o usuario solicita o /
routes.get('/', SessionController.create)
routes.post('/signin', SessionController.store)

routes.get('/signup', UserController.create)
// avatar é o campo no banco de dados
routes.post('/signup', upload.single('avatar'), UserController.store)

// rota obtida quando o usuario solicita /app/dashboard
// que retorna o template dashboard
routes.get('/app/dashboard', (req, res) => res.render('dashboard'))

module.exports = routes
