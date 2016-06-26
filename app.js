var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require("fs");

fs.stat('data.json', function (err, stat) {
    if ((stat && stat.isFile())) {
    }
    else {
        console.log('创建data.json');
        fs.open('data.json', "a", function (err) {
            if (err) {
                console.log('创建失败！');
            }
            console.log('创建成功！');
        });
    }
});

app.use(bodyParser.json());

app.use('/', require('./get-all-items'));
app.use('/', require('./get-item'));
app.use('/', require('./add-item'));
app.use('/', require('./put-item'));
app.use('/', require('./delete-item'));

var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log("listen on " + port);
});