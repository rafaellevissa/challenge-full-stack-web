const { Router } = require("express");
const StudentController = require('./controllers/StudentController')
const ModuleController = require('./controllers/ModuleController')
const RegistrationController = require('./controllers/RegistrationController')
const routes = Router();

routes.get('/', ((req, res) => {
    return res.json({ msg: 'return of API' })
}))

//Students
routes.get('/students', StudentController.index)

routes.post('/student', StudentController.create)

routes.delete('/student/:id', StudentController.delete)

//Academic Module
routes.get('/modules', ModuleController.index)

routes.post('/module', ModuleController.create)

routes.delete('/module/:id', ModuleController.delete)

//Registration
routes.post('/registration', RegistrationController.create)

module.exports = routes;
