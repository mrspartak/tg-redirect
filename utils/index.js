exports.minimizeCSS = function(_content) {
	if (!_content) return _content;
	var content = _content;

	content = content.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, '');
	content = content.replace(/ {2,}/g, ' ');
	content = content.replace(/ ([{:}]) /g, '$1');
	content = content.replace(/([;,]) /g, '$1');
	content = content.replace(/ !/g, '!');
	return content;
};
exports.minimizeHTML = function(_content) {
	if (!_content) return _content;
	var content = _content;

	content = content.replace(/^\s+|\r\n|\n|\r|(>)\s+(<)|\s+$/gm, '$1$2');

	return content;
};
exports.detectLanguage = function(request) {
	let ruPos = 100,
		enPos = 100;

	try {
		let lheader = request.headers['accept-language'];
		lheader = lheader.match(/[a-zA-Z\-]{2,10}/g).map(lang => lang.toLocaleLowerCase());

		lheader.forEach((lang, i) => {
			let posRu = lang.indexOf('ru');
			let posEn = lang.indexOf('en');

			if (posRu != -1 && ruPos > i) ruPos = i;
			if (posEn != -1 && enPos > i) enPos = i;
		});
	} catch (err) {
		console.error(
			'detectLanguage.e',
			err.message,
			request && request.headers ? request.headers['accept-language'] : '',
		);
	}

	return ruPos <= enPos ? 'ru' : 'en';
};
exports.passVariables = function(html, variables) {
	for (let [key, value] of Object.entries(variables)) {
		var re = new RegExp(`%${key}%`, 'g');
		html = html.replace(re, value);
	}
	return html;
};

/* promise */
exports.to = function(promise) {
	return promise
		.then(data => {
			return [null, data];
		})
		.catch(err => [err]);
};
