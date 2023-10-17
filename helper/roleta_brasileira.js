function roletaBrasileira(str) {
	const regex_1 = /ENTRADA CONFIRMADA/;
	const regex_2 = /RED/;

	// Using match() method
	if (str.match(regex_1)) {
		// ENTRADA CONFIRMADA !
		console.log('ENTRADA CONFIRMADA !');
		const pattern1 = /Entrada: na coluna (\d+) e (\d+)/; // Regular expression pattern to match "Entrada: na coluna <number> e <number>"

		const match1 = str.match(pattern1); // Find the match in the inputString

		if (match1 && match1[1] && match1[2]) {
			var number1 = parseInt(match1[1], 10); // Convert the first captured number to an integer
			var number2 = parseInt(match1[2], 10); // Convert the second captured number to an integer
		} else {
			console.log('No match found or numbers not present!');
		}
		console.log(number1, number2); // Output: 1 3
		// --------------
		const pattern = /Último número: (\d+)/; // Regular expression pattern to match "Último número: " followed by a number

		const match = str.match(pattern); // Find the match in the str

		if (match && match[1]) {
			var extractedNumber = parseInt(match[1], 10); // Convert the matched number string to an integer
		}

		const data = {
			enter_columns: `${number1} | ${number2}`,
			last_number: extractedNumber,
			protect: 2,
			cover: 0,
		};

		return data;
	} else {
		// WIN OU LOSS
		if (str.match(regex_2)) {
			// RED
			console.log('RED');
			const pattern = /\((.*?)\)/g; // Regular expression pattern to match and capture the content within parentheses
			const matches = str.match(pattern); // Find all matches in the inputString
			if (matches) {
				const extractedContents = matches.map((match) =>
					match.substring(1, match.length - 1)
				); // Extract the contents between parentheses
				console.log(extractedContents[0]); // Output: ["21 | 14"]
			} else {
				console.log('No matches found!');
			}

			const data = {
				enter_columns: 'RED',
				last_number: extractedContents[0],
				protect: 'RED',
				cover: 'RED',
			};

			return data;
		} else {
			//GREEN
			console.log('GREEN');
			const pattern = /\((.*?)\)/g; // Regular expression pattern to match and capture the content within parentheses
			const matches = str.match(pattern); // Find all matches in the inputString
			if (matches) {
				var extractedContents = matches.map((match) =>
					match.substring(1, match.length - 1)
				); // Extract the contents between parentheses
				console.log(extractedContents[0]); // Output: ["21 | 14"]
			} else {
				console.log('No matches found!');
			}

			const data = {
				enter_columns: 'WIN',
				last_number: extractedContents[0],
				protect: 'WIN',
				cover: 'WIN',
			};

			return data;
		}
	}
}

module.exports = {
	roletaBrasileira,
};
