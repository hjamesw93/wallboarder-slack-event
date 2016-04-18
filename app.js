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
    if (req.body.token === config.slackToken) {
        var payload = {};

        var text = req.body.text;

        text.split("--").forEach(function(i) {
            if (/message=(.*)/.test(i))  payload.message = i.match(/message=(.*)/)[1].trim();
            else if (/wb=(.*)/.test(i)) payload.wb = i.match(/wb=(.*)/)[1].trim();
        });

        if (!payload.message) {
            if (/wb-event ([a-zA-Z0-9].*)/.test(text))  payload.message = text.match(/message=(.*)/)[1].trim();
            else res.json({text: "No message supplied!"});
        } else {
            request.post({url:config.wbAPI + '/api/v1/event', form: payload}, function(err){
                if (!err) res.json({text: "ok"});
            });
        }
    } else {
        res.json({text: "Access denied"});
    }
});
