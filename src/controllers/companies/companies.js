// definir funciones para http request
const fs = require('fs')
const companies = require('../../../data.json')

const controllers = {
  index: (req, res) => {
    res
      .status(200)
      .json({
        data:companies
      })
  },
  find: (req, res) => {
    // console.log(typeof req.params.id)
    const queryId = req.params.id

    const company = companies.data.filter(company => {
      return company.id.toString() === queryId
    })
    // console.log(company)
    res
      .status(200)
      .json({
        data:company
      })
  },
  create: (req, res) => {
    console.log(req.body)
    const {id} = req.body
    const alreadyExist = companies.data.some(company => company.id == id)
    if(alreadyExist){
      res.status(400).json({message:'Id already Exist',company:req.body})
    }
    else {
      const newCompanies = [... companies.data, req.body]
      const json_Obj = JSON.stringify({data:newCompanies})
      fs.writeFile('./data.json', json_Obj, (err) => {
         if(err) throw err;
      })
      res.status(201).json({data:newCompanies})
    }
  },
  delete: (req, res) => {
    const queryId = req.params.id
    const alreadyExist = companies.data.some(company => company.id == queryId)

    if(alreadyExist) {
      const exist = companies.data.filter(company => {
        return  company.id.toString() !== queryId
      })
      res.status(400).json({message:'Id already Exist',company:exist})
      const json_Obj = JSON.stringify({data:exist})
      console.log(json_Obj)
      fs.writeFile('./data.json', json_Obj, (err) => {
         if(err) throw err;
      })
    } else {
      res.status(400).json({message:"It doesn't exist "})
    }
  },
  replace: ({body,params}, res) => {
    // const queryId = params.id
    const alreadyExist = companies.data.some(company => company.id == params.id)

    if(alreadyExist) {
      const dataUpdated = companies.data.map(c => {
        return (params.id == c.id) ? body : c;
      })

      res.status(200).json({message:dataUpdated})
    } else {
      res.status(400).json({message:"It doesn't exist "})
    }
  }
}

//exportar
module.exports = controllers;
