const {Router} = require("express");
const routes = Router();

routes.get('/', ((req, res) => {
    return res.json({msg: 'return of API'})
}))

//Students
routes.get('/students', ((req, res) => {
    return res.json({msg: 'Listar estudantes'})
}))

routes.post('/student', ((req, res) => {
    return res.json({msg: 'cadastrar aluno'})
}))

routes.delete('/student', ((req, res) => {
    return res.json({msg: 'Excluir aluno'})
}))

//Academic Module
routes.get('/modules', ((req, res) => {
    return res.json({msg: 'Listar Módulos'})
}))

routes.post('/module', ((req, res) => {
    return res.json({msg: 'cadastrar Modulo'})
}))

routes.delete('/module', ((req, res) => {
    return res.json({msg: 'Excluir Modulo'})
}))

//Registration

routes.post('/registration', ((req, res) => {
    return res.json({msg: 'aluno matriculado'})
}))

module.exports= routes;