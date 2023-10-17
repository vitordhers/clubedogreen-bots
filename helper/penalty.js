function penaltyLogic(str) {
	const obj = {};
	const regexSignal = /PENALTY 1WIN/u; // \p{Emoji} matches any Unicode emoji
	const regexWin = /GREEN/u;

	const match = str.match(regexSignal);
	if (match) {
		// Extracting the data and assigning it to the object keys
		obj['strategy'] = str
			.substring(str.indexOf('ESTRATÉGIA: ') + 11, str.indexOf('🔥'))
			.trim();
		obj['exit'] = str
			.substring(str.indexOf('SAIR EM: ') + 10, str.indexOf('🕹'))
			.trim();

		obj['attempt'] = str
			.substring(str.indexOf('TENTATIVAS: ') + 12, str.indexOf('⏱️'))
			.trim();

		obj['validity'] = str
			.substring(str.indexOf('Validade até: ') + 14)
			.trim()
			.substr(0, 4);

		obj['result'] = str.substring(
			str.indexOf('Validade até:') + 21,
			str.length
		);
		console.log(obj.result);
		return obj;
	} else {
		return false;
	}
}

module.exports = {
	penaltyLogic,
};
