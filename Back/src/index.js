const express = require("express");
const app = express();
app.use(express.json());

app.get('/', ((req, res) => {
    return res.json({msg: 'return of API'})
}))

app.listen(81, console.log("Server on!"));