const http = require('http');
const fs = require('fs/promises');

async function readFile(page) {
    const data = await fs.readFile(page, 'utf-8');
    return data;
}

function writeHTML(res, page) {
    readFile(page)
        .then(data => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        })
}

const server = http.createServer((req, res) => {
    const url = req.url;
    const mapping = {
        '/': 'index.html',
        '/about': 'about.html',
        '/contact-me': 'contact-me.html'
    }

    const page = mapping[url];
    if (page) {
        writeHTML(res, page);
    } else {
        writeHTML(res, '404.html');
    }
        
})

server.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});

