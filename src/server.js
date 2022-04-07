const http = require('http');
const fs = require('fs');
const path = require('path');

//const hostname = '10.90.1.117';
const hostname = '127.0.0.1';
const port = 80;

const server = http.createServer((req, res) => {
    console.log('Request for ' + req.url + ' by method ' + req.method);

    if (req.method == 'GET') {
        var fileUrl;
        if (req.url == '/') fileUrl = '/index.html';
        else fileUrl = req.url;

        var filePath = path.resolve('./public' + fileUrl);
        const fileExt = path.extname(filePath);
        if (fileExt == '.html') {
            fs.exists(filePath, (exists) => {
                if (!exists) {
                    filePath = path.resolve('./public/404.html');
                    res.writeHead(404, { 'Content-Type': 'text/html' })
                    fs.createReadStream(filePath).pipe(res);
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'text/html' })
                fs.createReadStream(filePath).pipe(res);
            });
        } else if (fileExt == '.css') {
            res.writeHead(200, { 'Content-Type': 'text/css' })
            fs.createReadStream(filePath).pipe(res);

        } else if (fileExt == '.js') {
            res.writeHead(200, { 'Content-Type': 'text/javascript' })
            fs.createReadStream(filePath).pipe(res);

        } else if (fileExt == '.ico') {
            res.writeHead(200, { 'Content-Type': 'image/x-icon' })
            fs.createReadStream(filePath).pipe(res);

        } else if (filePath.includes('Assets')) {
            res.statusCode = 200;
            fs.createReadStream(filePath).pipe(res);

        } else {
            filePath = path.resolve('./public/404.html');
            res.writeHead(404, { 'Content-Type': 'text/html' })
            fs.createReadStream(filePath).pipe(res);
        }
    } else {
        filePath = path.resolve('./public/404.html');
        res.writeHead(404, { 'Content-Type': 'text/html' })
        fs.createReadStream(filePath).pipe(res);
    }
});


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});