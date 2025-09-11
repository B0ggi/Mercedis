import http from 'node:http';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const port = process.env.PORT ? Number(process.env.PORT) : 8080;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.htm': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8'
};

function sanitize(p) {
  // Prevent path traversal
  const safe = path.normalize(p).replace(/^\/+/, '');
  if (safe.includes('..')) return '';
  return safe;
}

async function serveFile(filePath, res) {
  try {
    const data = await fs.readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const type = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-cache' });
    res.end(data);
  } catch (e) {
    if (e.code === 'ENOENT') {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
    } else {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('500 Internal Server Error');
      console.error(e);
    }
  }
}

const server = http.createServer(async (req, res) => {
  try {
    const reqUrl = new URL(req.url, `http://${req.headers.host}`);
    let pathname = sanitize(decodeURIComponent(reqUrl.pathname));

    if (!pathname || pathname.endsWith('/')) {
      pathname = path.join(pathname, 'index.html');
    }

    const filePath = path.join(projectRoot, pathname);
    const stat = await fs.stat(filePath).catch(() => null);

    if (stat && stat.isDirectory()) {
      // If it's a directory, serve index.html inside
      return serveFile(path.join(filePath, 'index.html'), res);
    }

    return serveFile(filePath, res);
  } catch (e) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('500 Internal Server Error');
    console.error(e);
  }
});

server.listen(port, () => {
  console.log(`Static server running at http://127.0.0.1:${port}`);
});
