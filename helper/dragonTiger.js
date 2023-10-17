function dragonTigerLogic(str) {
	const obj = {};
	const regexSignal = /Confirmada Entrada/u; // \p{Emoji} matches any Unicode emoji
	const regexWin = /GREEN/u;
	const regexLoss = /RED/u;

	const match = str.match(regexSignal);
	if (match) {
		// Extracting the data and assigning it to the object keys
		obj['result'] = str
			.substring(str.indexOf('Apostar em ') + 11, str.indexOf('♻️'))
			.trim();
		obj['strategy'] = str
			.substring(str.indexOf('Estratégia ') + 11, str.indexOf('📱'))
			.trim();
		return obj;
	} else {
		if (str.match(regexWin)) {
			obj.result = 'WIN';
			obj.strategy = 'WIN';
			return obj;
		} else if (str.match(regexLoss)) {
			obj.result = 'LOSS';
			obj.strategy = 'LOSS';
			return obj;
		}
	}
}

module.exports = {
	dragonTigerLogic,
};
