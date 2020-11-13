const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const db = mongoose.connection;

//========================
//PORT
const app = express();
const PORT = process.env.PORT || 3000;



//===========================
//Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/'+ 'osa';
mongoose.connect(MONGODB_URI ,  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });


//===========================
// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));
// open the connection to mongo
db.on('open' , ()=>{});

//___________________
//Middleware
// app.use(
//     session({
//       secret: process.env.SECRET, //a random string do not copy this value or your stuff will get hacked
//       resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
//       saveUninitialized: false // default  more info: https://www.npmjs.com/package/express-session#resave
//     })
//   )


app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project
//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//Controllers

const customersControllers = require('./controllers/CustomerControllers');
app.use('/customers',customersControllers);


app.listen(PORT,() =>{
    console.log(`The server is running on ${PORT}`);
})