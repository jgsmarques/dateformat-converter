import CommonFormat from './CommonFormat';

const validateInputs = function(stringToTransform, config, correctConfig) {
	if (typeof config !== 'object' || stringToTransform === void 0 || config === void 0) {
		throw new Error('Inputs are not correct');
	}
	for (const prop in config) {
		if (!(prop in correctConfig)) {
			throw new Error(`${prop} is not supported`);
		}
	}
};

const sort = function(config) {
	const keys = Object.keys(config);
	keys.sort(function(a, b) {
		const length1 = config[a].length;
		const length2 = config[b].length;
		return length1 > length2 ? -1 : (length2 > length1 ? 1 : 0);
	});
	return keys;
};

const transform = function(stringToTransform, source, target) {
	const keyArr = sort(target);
	let result = '';
	let strIndex = 0;
	while (strIndex < stringToTransform.length) {
		let found = false;
		for (let propIndex = 0; propIndex < keyArr.length; propIndex++) {
			const prop = keyArr[propIndex];

			if (stringToTransform.indexOf(target[prop], strIndex) === strIndex) {
				result += source[prop];
				strIndex += target[prop].length;
				found = true;
				break;
			}
		}
		if (!found) {
			result += stringToTransform.charAt(strIndex);
			strIndex++;
		}
	}

	return result;
};

const Converter = {
	parse: function(stringToParse, config) {
		validateInputs(stringToParse, config, CommonFormat);
		return transform(stringToParse, CommonFormat, config);
	},

	format: function(stringToFormat, config) {
		validateInputs(stringToFormat, config, CommonFormat);
		return transform(stringToFormat, config, CommonFormat);
	}
};

export default Converter;
