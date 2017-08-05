import Converter from './Converter';
import momentjsFormat from './patterns/momentjs';
import bootstrapDatetimePickerFormat from './patterns/bootstrap-datetime-picker';
import jqueryDateFormat from './patterns/jquery-dateFormat';

const convert = function(valueToConvert, sourceFormat, destinationFormat) {
	let sourceFormatObject = sourceFormat;
	let destinationFormatObject = destinationFormat;
	switch (sourceFormatObject) {
		case 'momentjs':
			sourceFormatObject = momentjsFormat;
			break;
		case 'bootstrap-datetime-picker':
			sourceFormatObject = bootstrapDatetimePickerFormat;
			break;
		case 'jquery-dateFormat':
			sourceFormatObject = jqueryDateFormat;
			break;
		default:
			break;
	}

	switch (destinationFormatObject) {
		case 'momentjs':
			destinationFormatObject = momentjsFormat;
			break;
		case 'bootstrap-datetime-picker':
			destinationFormatObject = bootstrapDatetimePickerFormat;
			break;
		case 'jquery-dateFormat':
			destinationFormatObject = jqueryDateFormat;
			break;
		default:
			break;
	}
	
	for (const prop in sourceFormatObject) {
		if (!(prop in destinationFormatObject)) {
			destinationFormatObject[prop] = sourceFormatObject[prop];
		}
	}
	return Converter.format(Converter.parse(valueToConvert, sourceFormatObject), destinationFormatObject);
};

export {
	convert
};
