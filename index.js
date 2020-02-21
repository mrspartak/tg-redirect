(async () => {
	const http = require('http');
	const url = require('url');
	const fsPromise = require('fs').promises;

	/* config */
	const PORT = +process.env.PORT || 3020;
	const COUNTER = +process.env.COUNTER || 0;
	const DEBUG = process.env.DEBUG || false;

	console.log('APP_CONFIG', {
		PORT,
		COUNTER,
		DEBUG,
	});

	/* prepare content */
	let tsStart = new Date().getTime();
	//css
	let css = await fsPromise.readFile('./public/css/style.css');
	css = minimizeCSS(css.toString());

	//favicon
	let favicon = await fsPromise.readFile('./public/favicon.ico');

	//html
	let indexPage = await fsPromise.readFile('./html/index.html');
	indexPage = indexPage.toString().replace('%CSS%', css);
	indexPage = minimizeHTML(indexPage);

	let redirectPage = await fsPromise.readFile('./html/redirect.html');
	redirectPage = redirectPage
		.toString()
		.replace('%COUNTER%', COUNTER)
		.replace('%CSS%', css);
	redirectPage = minimizeHTML(redirectPage);

	if (DEBUG) console.log('content prepeared', '+' + ((new Date().getTime() - tsStart) / 1000).toFixed(2) + ' sec');

	/* serve requests */
	const server = http.createServer(async (request, response) => {
		let path = url.parse(request.url).pathname;
		if (DEBUG) console.log('req', path);

		response.setHeader('Access-Control-Allow-Origin', '*');
		response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

		if (path == '/') {
			response.setHeader('Content-Type', 'text/html');
			response.end(indexPage);
		} else if (path == '/favicon.ico') {
			response.setHeader('Content-Type', 'image/x-icon');
			response.end(favicon);
		} else {
			response.setHeader('Content-Type', 'text/html');
			response.end(redirectPage);
		}
	});

	/* start server */
	server.listen(PORT, err => {
		if (err) return console.log('something bad happened', err.message);
		console.log(`server is listening on ${PORT}`);
	});

	/* utils */
	function minimizeCSS(_content) {
		if (!_content) return _content;
		var content = _content;

		content = content.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, '');
		content = content.replace(/ {2,}/g, ' ');
		content = content.replace(/ ([{:}]) /g, '$1');
		content = content.replace(/([;,]) /g, '$1');
		content = content.replace(/ !/g, '!');
		return content;
	}
	function minimizeHTML(_content) {
		if (!_content) return _content;
		var content = _content;

		content = content.replace(/^\s+|\r\n|\n|\r|(>)\s+(<)|\s+$/gm, '$1$2');

		return content;
	}
})();
