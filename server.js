var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
//var methodOverride = require('method-override');

//var cors = require('cors');
var index = require('./routes/index');
var tasks = require('./routes/tasks');

var app = express();

var port = 3000;

//	View engine..
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//	Set static folder
app.use(express.static(path.join(__dirname, 'client')));

//	Body parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//app.use(cors());
//app.options('*', cors());

app.use('/', index);
app.use('/api', tasks);


//app.use(methodOverride(allowCrossDomain));

app.listen(port, function(){
	console.log('server started on port : ' + port);
});
