const { Router } = require("express");
const RegistrationController = require("./controllers/RegistrationController");
const StudentController = require("./controllers/StudentController");
const ModuleController = require("./controllers/ModuleController");
const routes = Router();

//Students
routes.get('/students', StudentController.index)

routes.post('/student', StudentController.create)

routes.delete('/student/:id', StudentController.delete)

//Academic Module
routes.get('/modules', ModuleController.index)
routes.post('/module', ModuleController.create)
routes.delete('/module', ModuleController.delete)

//Registration

routes.get('/registration', RegistrationController.index)
routes.post('/registration', RegistrationController.create)
routes.get('/registration/listModuleToStudent', RegistrationController.listAUniqueStudentRegistration)
routes.get('/registration/listStudentsToModule', RegistrationController.listAllStudentRegistration)

module.exports = routes;