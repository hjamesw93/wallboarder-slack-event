var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    server = require('http').Server(app),
    router = express.Router(),
    request = require('request'),
    config = require('./config/config');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', router);

server.listen(config.port, config.host);

router.post('/', function(req, res) {
    console.log(req.body);
    res.json({status: "ok"});
});
