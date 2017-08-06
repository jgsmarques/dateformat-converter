# dateformat-converter

[![npm](https://img.shields.io/npm/v/dateformat-converter.svg)]()
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Build Status](https://travis-ci.org/tigermarques/dateformat-converter.svg?branch=master)](https://travis-ci.org/tigermarques/dateformat-converter)
[![codecov](https://codecov.io/gh/tigermarques/dateformat-converter/branch/master/graph/badge.svg)](https://codecov.io/gh/tigermarques/dateformat-converter)

This tool attempts to solve the problem that exists when trying to use different libraries that require different datetime patterns. For example, when using momentjs for dealing with dates, but a plugin for rendering a datetimepicker, most likely these two libraries will have different datetime patterns, and the developer will need to manually convert between the two. The case gets even trickier if this pattern needs to be dynamic, according to, for example, the user locale.

#### Example

A component receives as an input a datetime pattern that follows the [momentjs](https://momentjs.com/docs/#/parsing/string-format/) strucutre. It then renders a datetimepicker from [bootstrap-datetimepicker](https://github.com/smalot/bootstrap-datetimepicker). Since these two libraries use different datetime patterns, in order to use, for example, the momentjs pattern 'YYYY-MM-DD hh:mm:ss A' it would be necessary to convert it to 'yyyy-mm-dd HH:ii:ss P'. This is very unpractical and this tool aims at simplifying this task.

## Getting Started

### Prerequisites

In order to install this software, you will need:
- Node version 6.\*
- npm version 3.\* (comes with Node 6.\*)

### Installing

To install this package, run
```
npm install dateformat-converter
```

### Project Setup for development:

To get a copy of this repository for local development, follow these steps

```
git clone https://github.com/tigermarques/dateformat-converter.git
cd dateformat-converter
npm run setup
```

## Running the Tests

To run the project unit tests, run

```
npm test
```

To see the coverage results in HTML format, run

```
npm run test:results
```

## Usage

#### CommonJS
```
var dateformatConverter = require('dateformat-converter');
var newDateFormat = dateformatConverter.convert('YYYY-MM-DD hh:mm:ss A', 'momentjs', 'jquery-dateFormat');
```

#### AMD
```
require('dateformat-converter', function(dateformatConverter) {
	var newDateFormat = dateformatConverter.convert('YYYY-MM-DD hh:mm:ss A', 'momentjs', 'jquery-dateFormat');
})
```

#### Browser
```
<script src="dist/dateformat-converter.min.js"></script>
<script>
    var newDateFormat = dateformatConverter.convert('YYYY-MM-DD hh:mm:ss A', 'momentjs', 'jquery-dateFormat');
</script>
```

## API

The library exports two methods

### loadConfig

Arguments:
- configurationName (String)
- configurationObject (Object)

This method allows to register or replace a pattern. You need to provide the pattern name and its [configuration](#configuration-object).

### convert(String, String, String)

Arguments:
- valueToConvert (String)
- sourceFormat (String)
- destinationFormat (String)

This method performs the conversion of the `valueToConvert`, that is specified in the `sourceFormat` into the `destinationFormat`.

## Configuration object

If you choose to create your own pattern for translation, you need to pass in an object with a subset of the following properties:

```
{
	lowerCaseMeridian: '<Post or ante meridiem (lower case)>',
	upperCaseMeridian: '<Post or ante meridiem (upper case)>',
	secondsSimple: '<Seconds without leading zero>',
	secondsLeading: '<Seconds with leading zero>',
	minutesSimple: '<Minutes without leading zero>',
	minutesLeading: '<Minutes with leading zero>',
	hoursSimple24Format: '<Hours in 24h format without leading zero>',
	hoursLeading24Format: '<Hours in 24h format with leading zero>',
	hoursSimple12Format: '<Hours in 12h format without leading zero>',
	hoursLeading12Format: '<Hours in 12h format with leading zero>',
	daysSimple: '<Day of month without leading zero>',
	daysLeading: '<Day of month with leading zero>',
	monthsSimple: '<Month number without leading zero>',
	monthsLeading: '<Month number with leading zero>',
	monthsSimpleText: '<Short month name>',
	monthsFullText: '<Long month name>',
	yearsTwoDigits: '<2 digit year>',
	yearsFourDigits: '<4 digit year>',
	unixTimestamp: '<Unix timestamp>',
	timezoneName: '<Offset from UTC>'
}
```

For example, for [momentjs](https://momentjs.com/docs/#/parsing/string-format/), the configuration object looks like

```
{
	lowerCaseMeridian: 'p',
	upperCaseMeridian: 'A',
	secondsSimple: 's',
	secondsLeading: 'ss',
	minutesSimple: 'm',
	minutesLeading: 'mm',
	hoursSimple24Format: 'H',
	hoursLeading24Format: 'HH',
	hoursSimple12Format: 'h',
	hoursLeading12Format: 'hh',
	daysSimple: 'D',
	daysLeading: 'DD',
	monthsSimple: 'M',
	monthsLeading: 'MM',
	monthsSimpleText: 'MMM',
	monthsFullText: 'MMMM',
	yearsTwoDigits: 'YY',
	yearsFourDigits: 'YYYY',
	unixTimestamp: 'X',
	timezoneName: 'Z'
}
```

### Built in patterns

- [momentjs](https://momentjs.com/docs/#/parsing/string-format/)
- [bootstrap-datetime-picker](https://www.npmjs.com/package/bootstrap-datetime-picker)
- [jquery-dateFormat](https://github.com/phstc/jquery-dateFormat#date-and-time-patterns)

## Contributing

Issues and Pull Requests welcome!

## Authors

* **João Marques** - *Initial work*

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
