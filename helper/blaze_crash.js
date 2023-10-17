function blazeCrash(str) {
	var data = new Object();

	// Extract the different pieces of information from the string using regular expressions and string manipulation
	const entradaValidation = str.match(/🚀\s*ENTRADA\s+CONFIRMADA!\s*🚀/);
	const winValidation = str.match(/WIN/);
	const regexLoss = str.match(/LOSS/);

	if (entradaValidation !== null) {
		const apostar = str.match(/Apostar após o (\d+\.\d+)x/)[1];
		const sair = str.match(/Sair em (\d+\.\d+)x/)[1];
		const fazer = str.match(/Fazer até (\d+) gales/)[1];
		// Data structure
		data.enter = apostar;
		data.exit = sair;
		data.gales = fazer;
		return data
	} else {
		if (winValidation !== null) {
			data.gales = 'WIN';
			data.enter = 'WIN';
			data.exit = 'WIN';
			console.log(data);
			return data;
		} else {
			console.log(regexLoss);
			if (regexLoss !== null) {
				data.gales = 'LOSS';
				data.enter = 'LOSS';
				data.exit = 'LOSS';
				console.log(data);
				return data;
			} else {
				return false;
			}
		}
	}
}

module.exports = {
	blazeCrash,
};
