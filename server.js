// Zero-dependency static server for Heroku. Optional password gate via SITE_PASSWORD.
const http = require('http'), fs = require('fs'), path = require('path');
const PORT = process.env.PORT || 3000, PASS = process.env.SITE_PASSWORD, USER = process.env.SITE_USER || 'follett';
const ROOT = path.join(__dirname, 'public');
const TYPES = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.ico':'image/x-icon'};
http.createServer((req, res) => {
  if (PASS) {
    const m = (req.headers.authorization || '').match(/^Basic (.+)$/);
    const ok = m && Buffer.from(m[1], 'base64').toString() === USER + ':' + PASS;
    if (!ok) { res.writeHead(401, {'WWW-Authenticate': 'Basic realm="Campus OS"'}); return res.end('Authentication required'); }
  }
  let p = decodeURIComponent(req.url.split('?')[0]); if (p === '/' ) p = '/index.html';
  const f = path.normalize(path.join(ROOT, p));
  if (!f.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
  fs.readFile(f, (e, d) => {
    if (e) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, {'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream', 'X-Robots-Tag': 'noindex, nofollow', 'Cache-Control': 'no-cache'});
    res.end(d);
  });
}).listen(PORT, () => console.log('Campus OS on ' + PORT));
