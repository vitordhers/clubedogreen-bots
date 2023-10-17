function rabbitLogic(str) {
	const numberRegex = /Número máximo de jogadas: (\d+)/;
	const timeRegex = /Válido até: ([\d:]+)/;

	const numberMatch = str.match(numberRegex);
	const timeMatch = str.match(timeRegex);

	const number = numberMatch && numberMatch[1];
	const time = timeMatch && timeMatch[1];

	if (numberMatch) {
		const result = {
			jogadas: number,
			limit: time,
		};
		console.log(result);
		return result;
	}
}

module.exports = {
	rabbitLogic,
};
