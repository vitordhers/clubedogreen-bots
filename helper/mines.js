function minesLogic(inputData) {
	const matches = inputData.match(/Minas:\s*(\d+)\D+(\d+)/);

	if (matches !== null) {
		const numMines = matches[1];
		const numAttempts = matches[2];
		const res = formatter(inputData);

		const result = {
			mines: numMines,
			attempts: numAttempts,
			result: res,
		};
		console.log(result);
        return result
		// console.log(data)
	} else {
		const data = {
            mines: 'ENTRADA ENCERRADA',
			attempts: 'ENTRADA ENCERRADA',
			result: 'ENTRADA ENCERRADA',
          };
          return data;
	}
}

function formatter(result) {
	const words = result.split(' ');
	const newResult = words[7];
	const type_1 = newResult.replace('Tentativa(s)', '');
	const type_2 = type_1.replace('📱', '');
	// const formattedInput = type_2.replace(/(.{10})/g, '$1\n');
	return type_2;
}

module.exports = {
	minesLogic,
};
