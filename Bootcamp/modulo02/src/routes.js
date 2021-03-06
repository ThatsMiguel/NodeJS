const express = require('express')
const routes = express.Router()
const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const DashboardController = require('./app/controllers/DashboardController')
const FileController = require('./app/controllers/FileController')
const AppointmentController = require('./app/controllers/AppointmentController')
const AvailableController = require('./app/controllers/AvailableController')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

// importação de middleware que verifica se usuario já está logado
const authMiddleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success')
  res.locals.flashError = req.flash('error')

  return next()
})

// rota genérica para todo tipo de arquivo que está dentro da pasta /uploads/
// será possível visualizar ele          metodo show
routes.get('/files/:file', FileController.show)

// rota chamada quando o usuario solicita o /
routes.get('/', guestMiddleware, SessionController.create)
routes.post('/signin', SessionController.store)

routes.get('/signup', guestMiddleware, UserController.create)
// avatar é o campo no banco de dados
routes.post('/signup', upload.single('avatar'), UserController.store)

// Todas as rotas que iniciam com app apliquem esse middleware
// usuário só conseguirá acessar a rota /app/* quando estiver logado
routes.use('/app', authMiddleware)

// Rota chamada quando usuário clica em logout
routes.get('/app/logout', SessionController.destroy)

// rota obtida quando o usuario solicita /app/dashboard
// que retorna o template dashboard
routes.get('/app/dashboard', DashboardController.index)

routes.get('/app/appointments/new/:provider', AppointmentController.create)
routes.post('/app/appointments/new/:provider', AppointmentController.store)
routes.get('/app/available/:provider', AvailableController.index)
module.exports = routes
