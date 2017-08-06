import momentjsFormat from './patterns/momentjs';
import bootstrapDatetimePickerFormat from './patterns/bootstrap-datetime-picker';
import jqueryDateFormat from './patterns/jquery-dateFormat';

const supportedProperties = [
	'lowerCaseMeridian',			// <Post or ante meridiem (lower case)>
	'upperCaseMeridian',			// <Post or ante meridiem (upper case)>
	'secondsSimple',					// <Seconds without leading zero>
	'secondsLeading',					// <Seconds with leading zero>
	'minutesSimple',					// <Minutes without leading zero>
	'minutesLeading',					// <Minutes with leading zero>
	'hoursSimple24Format',		// <Hours in 24h format without leading zero>
	'hoursLeading24Format',		// <Hours in 24h format with leading zero>
	'hoursSimple12Format',		// <Hours in 12h format without leading zero>
	'hoursLeading12Format',		// <Hours in 12h format with leading zero>
	'daysSimple',							// <Day of month without leading zero>
	'daysLeading',						// <Day of month with leading zero>
	'monthsSimple',						// <Month number without leading zero>
	'monthsLeading',					// <Month number with leading zero>
	'monthsSimpleText',				// <Short month name>
	'monthsFullText',					// <Long month name>
	'yearsTwoDigits',					// <2 digit year>
	'yearsFourDigits',				// <4 digit year>
	'unixTimestamp',					// <Unix timestamp>
	'timezoneName'						// <Offset from UTC>
];

const loadedConfigurations = {};

const validateString = function(value, display, validateEmpty = false) {
	if (typeof value !== 'string') {
		throw new TypeError(`${display} is not a string`);
	} else if (validateEmpty && value === '') {
		throw new TypeError(`${display} cannot be an empty string`);
	}
};

const validateConfig = function(config) {
	// 1. Check if the config is a literal object (has to throw error if is object but is null or Array)
	if (Object.prototype.toString.call(config) !== '[object Object]' || config !== Object(config)) {
		throw new TypeError('Configuration is not an object');
	}
	// 2. Check if the object has keys. If empty, then it is not valid
	if (Object.keys(config).length === 0) {
		throw new TypeError('Configuration does not contain any keys');
	}
	// 3. Check if all properties are supported
	for (const prop in config) {
		if (supportedProperties.indexOf(prop) === -1) {
			throw new TypeError(`Property "${prop}" is not valid in the configuration`);
		}
	}
	// 4. Check if all property values are strings
	for (const prop in config) {
		if (typeof config[prop] !== 'string') {
			throw new TypeError(`Value of property "${prop}" is not a string`);
		}
	}
};

const validateRegisteredConfig = function(configName) {
	if (!(configName in loadedConfigurations)) {
		throw TypeError(`Pattern "${configName}" is not registered`);
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
	const keyArr = sort(source);
	let result = '';
	let strIndex = 0;
	while (strIndex < stringToTransform.length) {
		let found = false;
		for (let propIndex = 0; propIndex < keyArr.length; propIndex++) {
			const prop = keyArr[propIndex];

			if (stringToTransform.indexOf(source[prop], strIndex) === strIndex) {
				result += target[prop];
				strIndex += source[prop].length;
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

const loadConfig = function(name, configObject) {
	validateString(name, 'Configuration name', true);
	validateConfig(configObject);
	loadedConfigurations[name] = configObject;
};

const convert = function(valueToConvert, sourceFormat, destinationFormat) {
	validateString(valueToConvert, 'Value to convert');
	validateString(sourceFormat, 'Source pattern', true);
	validateString(destinationFormat, 'Destination pattern', true);
	validateRegisteredConfig(sourceFormat);
	validateRegisteredConfig(destinationFormat);

	const sourceFormatObject = loadedConfigurations[sourceFormat];
	const destinationFormatObject = loadedConfigurations[destinationFormat];

	for (const prop in sourceFormatObject) {
		if (!(prop in destinationFormatObject)) {
			destinationFormatObject[prop] = sourceFormatObject[prop];
		}
	}
	return transform(valueToConvert, sourceFormatObject, destinationFormatObject);
};

loadConfig('momentjs', momentjsFormat);
loadConfig('bootstrap-datetime-picker', bootstrapDatetimePickerFormat);
loadConfig('jquery-dateFormat', jqueryDateFormat);

export {
	convert,
	loadConfig
};
