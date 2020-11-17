const {Router} = require("express");
const routes = Router();

routes.get('/', ((req, res) => {
    return res.json({msg: 'return of API'})
}))

module.exports= routes;