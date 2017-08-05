import Converter from './Converter';

export default function(valueToConvert, sourceFormat, destinationFormat) {
	return Converter.format(Converter.parse(valueToConvert, sourceFormat), destinationFormat);
}
