//definir rutas

const { Router } = require('express')

const app = Router()

const Companies = require("../controllers/companies/companies")

app.get('/companies', Companies.index)
app.get('/companies/:id', Companies.find)

app.post('/companies', Companies.create)
app.delete('/companies/:id', Companies.delete)
app.put('/companies/:id', Companies.replace)
// app.post
//si exsite no hace nada -----> res---->company
//si no existe que lo grabe en archivo

//put
//Si existe lo puedes modificar
//puedes modificar el id y el nombre
// res =====> objeto modificado

//delete
//si lo encuentra lo elimina
//res -----> mostrar las compañias sin el elemento

//Postman para testear
//Si borran hay que hacer GET para testear
//Si actualizan hay que hacer GET para testear
//Si POST hay que hacer GET para testear

module.exports = app;
