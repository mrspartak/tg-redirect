const http = require('http');
const fsPromise = require('fs').promises;

const PORT = +process.env.PORT || 3020;
const WEBSITE = process.env.WEBSITE || '127.0.0.1:3020';
const COUNTER = +process.env.COUNTER || 0;
const DEBUG = process.env.DEBUG || false;

console.log('APP_CONFIG', {
	PORT,
	WEBSITE,
	COUNTER,
	DEBUG,
});

const server = http.createServer(async (request, response) => {
	if (DEBUG) console.log('req', request.url);

	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

	if (request.url == '/') {
		response.setHeader('Content-Type', 'text/html');
		let body = await fsPromise.readFile('./html/index.html');
		response.end(body.toString().replace('%WEBSITE%', WEBSITE));
	} else if (request.url == '/favicon.ico') {
		response.setHeader('Content-Type', 'image/x-icon');
		response.end(await fsPromise.readFile('./public/favicon.ico'));
	} else {
		response.setHeader('Content-Type', 'text/html');
		let body = await fsPromise.readFile('./html/redirect.html');
		response.end(body.toString().replace('%COUNTER%', COUNTER));
	}
});

server.listen(PORT, err => {
	if (err) return console.log('something bad happened', err.message);
	console.log(`server is listening on ${PORT}`);
});
