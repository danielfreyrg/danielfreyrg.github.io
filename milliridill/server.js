const http = require('http');
const https = require('https');
const url = require('url');
const path = require('path');
const fs = require('fs');

const hostname = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

const API_KEY = process.env.API_SPORTS_KEY || '';

// Serve static files
function serveStaticFile(filePath, res) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml'
    }[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('File not found');
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
}

// Proxy API requests
function proxyAPIRequest(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // Extract the API endpoint from the query
    if (pathname.startsWith('/api/')) {
        const apiPath = pathname.replace('/api/', '');
        const queryString = new URLSearchParams(parsedUrl.query).toString();
        const apiUrl = `https://v1.handball.api-sports.io/${apiPath}${queryString ? '?' + queryString : ''}`;

        const options = {
            method: req.method,
            headers: {
                'x-apisports-key': API_KEY,
                'Content-Type': 'application/json'
            }
        };

        https.get(apiUrl, options, (apiRes) => {
            let data = '';

            apiRes.on('data', (chunk) => {
                data += chunk;
            });

            apiRes.on('end', () => {
                res.writeHead(apiRes.statusCode, {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                });
                res.end(data);
            });
        }).on('error', (err) => {
            res.writeHead(500);
            res.end(JSON.stringify({ error: err.message }));
        });
    } else {
        // Serve static files
        let filePath = '.' + pathname;
        if (filePath === './') {
            filePath = './index.html';
        }
        serveStaticFile(filePath, res);
    }
}

const server = http.createServer((req, res) => {
    proxyAPIRequest(req, res);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    console.log(`API Key loaded: ${API_KEY.substring(0, 8)}...`);
});
