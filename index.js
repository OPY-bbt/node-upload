#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const formidable = require('formidable');
const util = require('util');
const localhost = '127.0.0.1';
const port = '3000';

const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>upload picture</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  </head>
  <body>
    <form method="post" action="/file" enctype='multipart/form-data'>
      <input type="text" name="name"><br>
      <label for="upload">上传文件</label>
      <input id="upload" type="file" name="file"/>
      <input type="submit" value="提交" />
    </form>
  </body>
  </html>`;

const server = http.createServer((req, res) => {
  const { url } = req;

  if (url === '/favicon.ico') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (url === '/') {
    res.end(html);
    return;
  }

  const form = new formidable.IncomingForm();
  form.encoding = "utf-8";
  form.uploadDir = __dirname + '/tmp';
  form.keepExtensions = true; 
  form.parse(req, function(err, fields, files) {
    res.writeHead(200, {'content-type': 'text/plain'});
    res.write('received upload:\n\n');
    res.end(util.inspect({fields: fields, files: files}));

    fs.rename(files.file.path, `${__dirname}/tmp/${files.file.name}`, function (err) {
      if (err) {
          console.info(err);
      }
    });
  });
})

server.listen(port, localhost, () => {
  console.log(`server open at ${localhost}:${port}`)
})

