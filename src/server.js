const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

//Initializations
const app = express();
require('./config/passport');

// Settings 
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
  //Especifica  la ubicación de la carpeta views
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
  //Cada vez que lleguen datos de un formulario los convertira en un objeto JSON
app.use(methodOverride('_method'));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global variables    
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

//Routes
  // app.get('/', (req, res) => {
  //   res.render('index');
  // });
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));
app.use(require('./routes/users.routes'));

//Static files
app.use(express.static(path.join(__dirname, 'public')));
  //Especifica la ubicación de la carpeta public


module.exports = app;  

// mongod  -> Activa mongodb
// npm run dev -> Activar el servidor a cambios 