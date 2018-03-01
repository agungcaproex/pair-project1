const express       = require('express')
const app           = express()
const routes        = require('./routes')
const PORT          = 3000;
const bodyParser    = require('body-parser')
const session       = require('express-session')
var cool = require('cool-ascii-faces');

app.use(bodyParser.urlencoded({extended:false}))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.set('port', (process.env.PORT || 5000));

app.locals.helper   = require('./helpers')

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'mini lancer',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))


app.use('/',routes);

app.get('/cool', function(request, response) {
  response.send(cool());
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

