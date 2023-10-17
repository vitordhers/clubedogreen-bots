function spacemanLogic(str) {
	var data = new Object();

	// Extract the different pieces of information from the string using regular expressions and string manipulation
	const entradaValidation = str.match(/ENTRADA\s+CONFIRMADA!/);
	const regexLoss = str.match(/HIT/);
	const winValidation = str.indexOf('WINZÃO');

	if (entradaValidation !== null) {
		const apostar = str.match(/Entrar após (\d+\.\d+)x/)[1];
		const sair = str.match(/Retirar em (\d+\.\d+)x/)[1];
		// Data structure
		data.enter = apostar;
		data.exit = sair;
		data.type = 'ENTRADA CONFIRMADA!';
		return data;
	} else {
		if (winValidation !== null && winValidation >= 0) {
			data.exit = 'WIN';
			data.enter = 'WIN';
			data.type = 'WIN';
			return data;
		} else {
			console.log(regexLoss);
			if (regexLoss !== null) {
				data.type = 'LOSS';
				data.enter = 'LOSS';
				data.exit = 'LOSS';
				return data;
			} else {
				return false;
			}
		}
	}
}

module.exports = {
	spacemanLogic,
};
