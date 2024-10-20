const fs = require('fs/promises');
const express = require('express');

const app = express();

const serveHTML = async (res, filename) => {
    try {
        const data = await fs.readFile(filename, 'utf8');
        res.send(data);
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
}

const routeMapping = {
    '/': 'index.html',
    '/about': 'about.html',
    '/contact-me': 'contact-me.html'
};

Object.keys(routeMapping).forEach(route => {
    app.get(route, async (req, res) => {
        serveHTML(res, routeMapping[route]);
    })
});

app.use(async (req, res) => {
    const data = await fs.readFile('404.html', 'utf-8');
    res.status(404).send(data);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


