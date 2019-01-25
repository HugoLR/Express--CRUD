require('dotenv').config()
const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const app = express();

const PORT = process.env.PORT || 3000

//Jala la información de la api
const api = require('./src/routes/api')
const bodyParser = require('body-parser');
console.log("**Express Version: ", require('express/package').version);

//middleware
// app.use(morgan('combined'));

//middleware for POST
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use('/api/v1', api)
// app.use('/api/v1', (req, res) => {
//   res.send('Hello /api/vi') //Así probamos la ruta
// });

//testeando una ruta
app.get("/", (req, res) => {
  res.send("Hello Team")
});

//error 404
app.use((request, response) => {
  const ERROR = {
    message: '404. Not Found'
  }
  response
    .status(404)
    .json(ERROR);
});

//error 500
app.use((err, request, response, next) => {
  const ERROR = {
    message: '500. Server Error'
  }
  response
    .status(500)
    .json(ERROR);
});


app.listen(PORT, () => {
  const msg = chalk.blue(`Node Server is running on PORT: ${PORT}`);

  console.log(msg);
});
