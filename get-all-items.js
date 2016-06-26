var express = require('express');
var router = express();
var fs = require("fs");

router.get('/products',function (req,res) {
    fs.readFile('data.json','UTF-8' ,function (err, data) {
        if (err){
            res.sendStatus(404);
        }
        if (data === '' || data === {}) {
            res.status(200).json([]);
        }
        else {
            var exitsData = JSON.parse(data);

            res.status(200).json(exitsData.items);
        }
    });
});

module.exports = router;