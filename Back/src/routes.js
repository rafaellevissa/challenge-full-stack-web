const { Router } = require("express");
const RegistrationController = require("./controllers/RegistrationController");
const StudentController = require("./controllers/StudentController");
const ModuleController = require("./controllers/ModuleController");
const routes = Router();

//Students
routes.get('/students', StudentController.index)
routes.post('/student', StudentController.create)
routes.put('/student/:id', StudentController.update)
routes.delete('/student/:id', StudentController.delete)

//Academic Module
routes.get('/modules', ModuleController.index)
routes.post('/module', ModuleController.create)
routes.put('/module/:id', ModuleController.update)
routes.delete('/module/:id', ModuleController.delete)

//Registration
routes.get('/registration', RegistrationController.index)
routes.post('/registration', RegistrationController.create)
routes.delete('/registration/:id', RegistrationController.delete)
routes.get('/registration/listModuleToStudent/:RA', RegistrationController.listAUniqueStudentRegistration)
routes.get('/registration/listStudentsToModule/:module_name', RegistrationController.listAllStudentRegistration)

module.exports = routes;