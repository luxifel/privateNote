const dotenv = require("dotenv");
const cors = require('cors');
dotenv.config();
const exphbs = require("express-handlebars");

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Note = require('./api/models/noteModel') //created model loading here
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1/Notedb'); 


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(cors());


app.engine("handlebars", exphbs({defaultLayout: "main", layoutsDir: `${__dirname}/api/views/layouts`}));
app.set("view engine", "handlebars");
app.set("views", __dirname + "/api/views/");

var routes = require('./api/routes/NoteRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('note server started on: ' + port);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });