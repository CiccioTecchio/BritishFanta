const fs= require('fs');




function routing(res,file) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.readFile(file, null, function (err, data) {
            if (err) {
                res.writeHead(400);
                res.write('File not found');
            } else {
                res.write(data);
            }
            res.end()
        });
}

module.exports={
    routing: routing
}