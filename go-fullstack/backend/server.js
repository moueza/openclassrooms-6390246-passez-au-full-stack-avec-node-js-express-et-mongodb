const http = require('http');

const server = http.createServer((req, res) => {
    res.end('Voilà la réponse du serveur by moueza!');
});

server.listen(process.env.PORT || 3000);
//log.error
console.log('server running');
