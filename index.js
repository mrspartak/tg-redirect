const http = require('http');
const fsPromise = require('fs').promises;

const PORT = +process.env.PORT || 3020;
const WEBSITE = process.env.WEBSITE || '127.0.0.1:3020';

console.log('APP_CONFIG', {
	PORT,
	WEBSITE,
});

const server = http.createServer(async (request, response) => {
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

	if (request.url == '/') {
		response.setHeader('Content-Type', 'text/html');
		let body = await fsPromise.readFile('./html/index.html');
		response.end(body.toString().replace('%WEBSITE%', WEBSITE));
	} else {
		response.setHeader('Content-Type', 'text/html');
		response.end(await fsPromise.readFile('./html/redirect.html'));
	}
});

server.listen(PORT, err => {
	if (err) return console.log('something bad happened', err.message);
	console.log(`server is listening on ${PORT}`);
});
