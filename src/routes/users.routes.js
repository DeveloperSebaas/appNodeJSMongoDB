const { Router } = require('express');
const router = Router();
const {
  renderSignUpForm,
  signup,
  renderSigninForm,
  signin,
  logout
} = require('../controllers/users.controller');

router.get('/users/signup', renderSignUpForm); //Registrarse

router.post('/users/signup', signup); //Registrarse (Envio de datos)

router.get('/users/signin', renderSigninForm); //Ingresar

router.post('/users/signin', signin); //Ingresar (Envio de datos)

router.get  ('/users/logout', logout); //Salir

module.exports =  router;