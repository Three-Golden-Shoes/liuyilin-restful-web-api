var express = require('express');
var router = express();
var fs = require("fs");

router.get('/products/:id',function (req,res) {
    fs.readFile('data.json','UTF-8' ,function (err, data) {
        if (err) {
            res.sendStatus(404);
        }
        if (data === '' || data === {}) {
            res.sendStatus(404);
        }
        else{
            var exitsData = JSON.parse(data);
            var flag = 1;

            exitsData.items.forEach(function (item) {
                if (item.id.toString() === req.params.id){
                    flag = 0 ;
                    res.status(200).json(item);
                }
            });
            if (flag == 1) res.sendStatus(404);
        }
    });
});

module.exports = router;