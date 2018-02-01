const http = require('http');
const fs = require('fs');
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
      <label for="upload">上传文件</label>
      <input id="upload" type="file" />
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

  let buf = '';
  req.on('data', (data) => {
    buf += data;
  })

  req.on('end', () => {
    console.log(buf.toString());
  })
})

server.listen(port, localhost, () => {
  console.log(`server open at ${localhost}:${port}`)
})

