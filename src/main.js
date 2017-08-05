import Converter from './Converter';
import momentjsFormat from './patterns/momentjs';

export default function(valueToConvert, sourceFormat, destinationFormat) {
	let sourceFormatObject = sourceFormat;
	let destinationFormatObject = destinationFormat;
	if (sourceFormatObject === 'momentjs') {
		sourceFormatObject = momentjsFormat;
	}
	if (destinationFormatObject === 'momentjs') {
		destinationFormatObject = momentjsFormat;
	}
	for (const prop in sourceFormatObject) {
		if (!(prop in destinationFormatObject)) {
			destinationFormatObject[prop] = sourceFormatObject[prop];
		}
	}
	return Converter.format(Converter.parse(valueToConvert, sourceFormatObject), destinationFormatObject);
}
