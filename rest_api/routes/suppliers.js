var express = require('express');
var router = express.Router();

const { Sequelize, Op } = require('sequelize');
const Suppliers = require('../models').suppliers;






router.get('/findAll', function(req, res, next) {
    Suppliers.findAll({})
    .then(data => {
        res.json(data);
    })
    .catch(error => res.status(400).send('Error al buscar los proveedores'))
    res.send("GET All")
});





router.get('/findById/:id', function(req, res, next) {
    let id = parseInt(req.params.id);

    Suppliers.findOne({  
        where: { 
          [Op.and]: [
            {SupplierID: id}
          ]
        }
    })  
    .then(data => {  
        res.json(data);  
    })  
    .catch(error => res.status(400).send(error)) 

    res.send("GET By Id")
});





router.post('/save', function(req, res, next) { 
    let {SupplierName, ContactName, Address, City, PostalCode, Country, Phone} = req.body;
        
    Suppliers.create({
        SupplierName: SupplierName, 
        ContactName: ContactName, 
        Address: Address, 
        City: City, 
        PostalCode: PostalCode, 
        Country: Country, 
        Phone: Phone
    })
    .then(data => {  
      res.json(data);  
  })  
  .catch(error => res.status(400).send(error)) 


    res.send("POST")
});





router.put('/update/:id', function(req, res, next) { 
    let {id, email, username, password} = req.body;
        
    Users.update({
      email: email,
      username: username,
      password: password,
      logins: 0,
      last_login: 0
    },
    {
        where: {
          id: parseInt(id)
        }
    })
    .then(users => {  
      res.json(users);  
  })  
  .catch(error => res.status(400).send(error)) 
    res.send("PUT")
});  






router.delete('/delete/:id', function(req, res, next) { 
    let id = parseInt(req.params.id);
          
    Users.destroy({
      where: { 
        id: id
      }
    })
    .then(users => {  
    res.json(users);  
})  
    .catch(error => res.status(400).send(error)) 
    res.send("DELETE")
});






module.exports = router;