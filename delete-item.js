var express = require('express');
var router = express();
var fs = require("fs");

router.delete('/products/:id',function (req,res) {
    console.log("准备删除文件");
    fs.readFile('data.json','utf-8',function (err,data) {
        var flag = 1;
        if (err){
            res.sendStatus(404);
        }
        if (data === '' || data === {}){
            res.status(404).json();
        }
        else {
            var newData = JSON.parse(data);
            var i = 0;
            newData.items.forEach(function (item) {

                if (item.id.toString() === req.params.id){
                    flag = 0;
                    newData.items.splice(i,1);
                    fs.writeFile('data.json', JSON.stringify(newData),  function(err) {
                    });
                    res.status(204).json();
                }
                i ++;
            });
        }
        if (flag == 1) res.sendStatus(404);

    });
});

module.exports = router;