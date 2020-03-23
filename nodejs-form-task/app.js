
var http = require('http')
var fs = require('fs');

var form = `
<html>
  <body>
    <h3>Please enter a message below:</h3>
    <form method='POST' action='/message'>
      <label>Message: </label><br>
      <input type='text' name='message'><br>
      <input type='submit'>
    </form>
  </body>
</html>`

http.createServer((req, res) => {
  if (req.method === 'POST'){
    var body = '';
    req.on('data', data => {
      body += `${data} \n`
    });
    req.on('end', () => {
      fs.writeFile('message.txt', body, err => {
        if (err) throw err;
      });
      res.write(form);
      res.end()
    });
  } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(form);
      res.end();
    }
}).listen(8080);