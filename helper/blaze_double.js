function blazeDouble(str) {
	var data = new Object();
	// Define a regular expression to match the number in the string
	const regex = /Fazer até (\d+) gales/;
	// Define a regular expression to match the number in the string
	const regexWin = str.match(/WIN/);
	const regexLoss = str.match(/LOSS/);
	// Use the regular expression to extract the number from the string
	const match = str.match(regex);
	// If the regular expression matches, extract the number from the first capturingR group
	let number;
	if (match && match.length > 1) {
		number = match[1];
	}
	// Entire logic for extract data
	if (number !== undefined) {
		data.gales = number;
		// Find the index of the different pieces of information in the string
		const entradaBlack = str.indexOf('Apostar no ⚫️');
		if (entradaBlack > -1) {
			data.enter = 'BLACK';
			data.protect = 'WHITE';
			console.log(data);
			return data;
		} else {
			data.enter = 'RED';
			data.protect = 'WHITE';
			console.log(data);
			return data;
		}
	} else {
		if (regexWin !== null) {
			data.gales = 'WIN';
			data.enter = 'WIN';
			data.protect = 'WIN';
			console.log(data);
			return data;
		} else {
			console.log(regexLoss);
			if (regexLoss !== null) {
				data.gales = 'LOSS';
				data.enter = 'LOSS';
				data.protect = 'LOSS';
				console.log(data);
				return data;
			} else {
				return false;
			}
		}
	}
}

module.exports = {
	blazeDouble,
};
