// 簡易本機伺服器：node serve.js → http://localhost:5180
const http = require('http'), fs = require('fs'), path = require('path');
const root = __dirname, port = 5180;
const types = { '.html': 'text/html; charset=utf-8', '.png': 'image/png', '.js': 'text/javascript', '.css': 'text/css' };
http.createServer((req, res) => {
  // 資料夾網址（結尾是 /）自動找 index.html，跟 GitHub Pages 一樣
  const p = path.join(root, decodeURIComponent(req.url.split('?')[0]).replace(/\/$/, '/index.html'));
  if (!p.startsWith(root)) { res.writeHead(403); return res.end(); }
  fs.readFile(p, (err, data) => {
    if (err) { res.writeHead(404); return res.end('not found'); }
    res.writeHead(200, { 'Content-Type': types[path.extname(p)] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(port, () => console.log('http://localhost:' + port));
