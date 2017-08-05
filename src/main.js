import Converter from './Converter';

export default function(valueToConvert, sourceFormat, destinationFormat) {
	for (const prop in sourceFormat) {
		if (!(prop in destinationFormat)) {
			destinationFormat[prop] = sourceFormat[prop];
		}
	}
	return Converter.format(Converter.parse(valueToConvert, sourceFormat), destinationFormat);
}
