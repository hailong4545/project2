const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars')
const cookieParser = require('cookie-parser');

//import
const homeRouter = require('./routers/home.router');
const loginRouter = require('./routers/login.router');
const gameRouter = require('./routers/game.router');
const setIo = require('./socket/socket.io');

//khai bao server
const app = express();
const server = require("http").Server(app)
const io = require('socket.io')(server)

setIo(io);


app.use(express.static(__dirname + '/public'));
app.engine('.hbs', hbs.engine());
app.set('view engine', '.hbs');

//middle ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());

app.use('/', homeRouter);
app.use('/', loginRouter);
app.use('/', gameRouter);

const port = process.env.PORT || 3003;

server.listen(port, () => {
    console.log(`server listening ${port}`);
})