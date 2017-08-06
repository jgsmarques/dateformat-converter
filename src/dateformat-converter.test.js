/* eslint-disable no-magic-numbers */

import { expect } from 'chai';
import { convert, loadConfig } from './dateformat-converter';

const createTestFunction = function(method, ...args) {
	return function() {
		return method(...args);
	};
};

describe('Dateformat Converter', () => {
	it('should be imported correctly', () => {
		expect(convert).to.be.a('function');
		expect(convert).to.have.length(3);

		expect(loadConfig).to.be.a('function');
		expect(loadConfig).to.have.length(2);
	});

	describe('loadConfig', () => {
		it('should throw an error when the configuration name is not a string', () => {
			expect(createTestFunction(loadConfig)).to.throw('Configuration name is not a string');
			expect(createTestFunction(loadConfig, null)).to.throw('Configuration name is not a string');
			expect(createTestFunction(loadConfig, 3)).to.throw('Configuration name is not a string');
			expect(createTestFunction(loadConfig, true)).to.throw('Configuration name is not a string');
			expect(createTestFunction(loadConfig, { prop: 'test' })).to.throw('Configuration name is not a string');
			expect(createTestFunction(loadConfig, ['test'])).to.throw('Configuration name is not a string');
			expect(createTestFunction(loadConfig, function() { /* do nothing */ })).to.throw('Configuration name is not a string');
		});

		it('should throw an error when the configuration name is an empty string', () => {
			expect(createTestFunction(loadConfig, '')).to.throw('Configuration name cannot be an empty string');
		});

		it('should throw an error when the configuration object is not an object', () => {
			expect(createTestFunction(loadConfig, 'testConfig')).to.throw('Configuration is not an object');
			expect(createTestFunction(loadConfig, 'testConfig', null)).to.throw('Configuration is not an object');
			expect(createTestFunction(loadConfig, 'testConfig', 3)).to.throw('Configuration is not an object');
			expect(createTestFunction(loadConfig, 'testConfig', true)).to.throw('Configuration is not an object');
			expect(createTestFunction(loadConfig, 'testConfig', 'test')).to.throw('Configuration is not an object');
			expect(createTestFunction(loadConfig, 'testConfig', ['test'])).to.throw('Configuration is not an object');
			expect(createTestFunction(loadConfig, 'testConfig', function() { /* do nothing */ })).to.throw('Configuration is not an object');
		});

		it('should throw an error when the configuration object has no properties', () => {
			expect(createTestFunction(loadConfig, 'testConfig', {})).to.throw('Configuration does not contain any keys');
		});

		it('should throw an error when the configuration object has unsupported properties', () => {
			expect(createTestFunction(loadConfig, 'testConfig', {
				unsupportedKey: 'value'
			})).to.throw('Property "unsupportedKey" is not valid in the configuration');

			expect(createTestFunction(loadConfig, 'testConfig', {
				otherKey: 'value'
			})).to.throw('Property "otherKey" is not valid in the configuration');

			expect(createTestFunction(loadConfig, 'testConfig', {
				lowerCaseMeridian: 'p',
				upperCaseMeridian: 'P',
				secondsSimple: 's',
				secondsLeading: 'ss',
				minutesSimple: 'm',
				minutesLeading: 'mm',
				hoursSimple24Format: 'H',
				hoursLeading24Format: 'HH',
				hoursSimple12Format: 'h',
				hoursLeading12Format: 'hh',
				daysSimple: 'd',
				myCustomKey: 'xx',
				daysLeading: 'dd',
				monthsSimple: 'M',
				monthsLeading: 'MM',
				monthsSimpleText: 'MMM',
				monthsFullText: 'MMMM',
				yearsTwoDigits: 'yy',
				yearsFourDigits: 'yyyy',
				unixTimestamp: 'u',
				timezoneName: 'Z'
			})).to.throw('Property "myCustomKey" is not valid in the configuration');
		});

		it('should throw an error when any of the properties value is not a string', () => {
			expect(createTestFunction(loadConfig, 'testConfig', {
				lowerCaseMeridian: void 0
			})).to.throw('Value of property "lowerCaseMeridian" is not a string');

			expect(createTestFunction(loadConfig, 'testConfig', {
				monthsLeading: null
			})).to.throw('Value of property "monthsLeading" is not a string');

			expect(createTestFunction(loadConfig, 'testConfig', {
				unixTimestamp: 4
			})).to.throw('Value of property "unixTimestamp" is not a string');

			expect(createTestFunction(loadConfig, 'testConfig', {
				daysSimple: false
			})).to.throw('Value of property "daysSimple" is not a string');

			expect(createTestFunction(loadConfig, 'testConfig', {
				timezoneName: { prop: 'value' }
			})).to.throw('Value of property "timezoneName" is not a string');

			expect(createTestFunction(loadConfig, 'testConfig', {
				minutesSimple: ['test']
			})).to.throw('Value of property "minutesSimple" is not a string');

			expect(createTestFunction(loadConfig, 'testConfig', {
				hoursSimple24Format: function() { /* do nothing */ }
			})).to.throw('Value of property "hoursSimple24Format" is not a string');
		});

		it('should only check property values after checking that all keys are supported', () => {
			expect(createTestFunction(loadConfig, 'testConfig', {
				lowerCaseMeridian: void 0,
				myKey: 'value'
			})).to.throw('Property "myKey" is not valid in the configuration');
		});

		it('should not throw when the configuration name and object are set correctly', () => {
			expect(createTestFunction(loadConfig, 'testConfig', {
				lowerCaseMeridian: 'p',
				upperCaseMeridian: 'P',
				secondsSimple: 's',
				secondsLeading: 'ss',
				minutesSimple: 'm',
				minutesLeading: 'mm',
				hoursSimple24Format: 'H',
				hoursLeading24Format: 'HH',
				hoursSimple12Format: 'h',
				hoursLeading12Format: 'hh',
				daysSimple: 'd',
				daysLeading: 'dd',
				monthsSimple: 'M',
				monthsLeading: 'MM',
				monthsSimpleText: 'MMM',
				monthsFullText: 'MMMM',
				yearsTwoDigits: 'yy',
				yearsFourDigits: 'yyyy',
				unixTimestamp: 'u',
				timezoneName: 'Z'
			})).not.to.throw();
		});
	});

	describe('convert', () => {
		it('should throw an error if any of the 3 arguments is not a string', () => {
			expect(createTestFunction(convert)).to.throw('Value to convert is not a string');
			expect(createTestFunction(convert, null)).to.throw('Value to convert is not a string');
			expect(createTestFunction(convert, 3)).to.throw('Value to convert is not a string');
			expect(createTestFunction(convert, true)).to.throw('Value to convert is not a string');
			expect(createTestFunction(convert, { prop: 'test' })).to.throw('Value to convert is not a string');
			expect(createTestFunction(convert, ['test'])).to.throw('Value to convert is not a string');
			expect(createTestFunction(convert, function() { /* do nothing */ })).to.throw('Value to convert is not a string');

			expect(createTestFunction(convert, 'dd-MM-yyyy')).to.throw('Source pattern is not a string');
			expect(createTestFunction(convert, 'dd-MM-yyyy', null)).to.throw('Source pattern is not a string');
			expect(createTestFunction(convert, 'dd-MM-yyyy', 3)).to.throw('Source pattern is not a string');
			expect(createTestFunction(convert, 'dd-MM-yyyy', true)).to.throw('Source pattern is not a string');
			expect(createTestFunction(convert, 'dd-MM-yyyy', { prop: 'test' })).to.throw('Source pattern is not a string');
			expect(createTestFunction(convert, 'dd-MM-yyyy', ['test'])).to.throw('Source pattern is not a string');
			expect(createTestFunction(convert, 'dd-MM-yyyy', function() { /* do nothing */ })).to.throw('Source pattern is not a string');

			expect(createTestFunction(convert, 'dd-MM-yyyy', 'myConfig')).to.throw('Destination pattern is not a string');
			expect(createTestFunction(convert, 'dd-MM-yyyy', 'myConfig', null)).to.throw('Destination pattern is not a string');
			expect(createTestFunction(convert, 'dd-MM-yyyy', 'myConfig', 3)).to.throw('Destination pattern is not a string');
			expect(createTestFunction(convert, 'dd-MM-yyyy', 'myConfig', true)).to.throw('Destination pattern is not a string');
			expect(createTestFunction(convert, 'dd-MM-yyyy', 'myConfig', { prop: 'test' })).to.throw('Destination pattern is not a string');
			expect(createTestFunction(convert, 'dd-MM-yyyy', 'myConfig', ['test'])).to.throw('Destination pattern is not a string');
			expect(createTestFunction(convert, 'dd-MM-yyyy', 'myConfig', function() { /* do nothing */ })).to.throw('Destination pattern is not a string');
		});

		it('should throw an error if the second or third arguments is an empty string', () => {
			expect(createTestFunction(convert, 'dd-MM-yyyy', '')).to.throw('Source pattern cannot be an empty string');
			expect(createTestFunction(convert, 'dd-MM-yyyy', 'myConfig', '')).to.throw('Destination pattern cannot be an empty string');
		});

		it('should throw an error if the second argument is not a registered configuration', () => {
			expect(createTestFunction(convert, 'dd-MM-yyyy', 'myConfig', 'myOtherConfig')).to.throw('Pattern "myConfig" is not registered');
		});

		it('should throw an error if the third argument is not a registered configuration', () => {
			expect(createTestFunction(convert, 'dd-MM-yyyy', 'momentjs', 'myOtherConfig')).to.throw('Pattern "myOtherConfig" is not registered');
		});

		it('should convert from "momentjs" to "bootstrap-datetime-picker"', () => {
			expect(convert('MM/DD/YYYY hh:mm:ss A', 'momentjs', 'bootstrap-datetime-picker')).to.equal('mm/dd/yyyy HH:ii:ss P');
		});

		it('should convert from "momentjs" to "jquery-dateFormat"', () => {
			expect(convert('MM/DD/YYYY hh:mm:ss A', 'momentjs', 'jquery-dateFormat')).to.equal('MM/dd/yyyy hh:mm:ss a');
		});

		it('should convert from "bootstrap-datetime-picker" to "momentjs"', () => {
			expect(convert('mm/dd/yyyy HH:ii:ss P', 'bootstrap-datetime-picker', 'momentjs')).to.equal('MM/DD/YYYY hh:mm:ss A');
		});

		it('should convert from "bootstrap-datetime-picker" to "jquery-dateFormat"', () => {
			expect(convert('mm/dd/yyyy HH:ii:ss P', 'bootstrap-datetime-picker', 'jquery-dateFormat')).to.equal('MM/dd/yyyy hh:mm:ss a');
		});

		it('should convert from "jquery-dateFormat" to "bootstrap-datetime-picker"', () => {
			expect(convert('MM/dd/yyyy hh:mm:ss a', 'jquery-dateFormat', 'bootstrap-datetime-picker')).to.equal('mm/dd/yyyy HH:ii:ss P');
		});

		it('should convert from "jquery-dateFormat" to "momentjs"', () => {
			expect(convert('MM/dd/yyyy hh:mm:ss a', 'jquery-dateFormat', 'momentjs')).to.equal('MM/DD/YYYY hh:mm:ss A');
		});

		it('should convert a custom format into another custom format', () => {
			loadConfig('mySourceConfig', {
				daysLeading: 'dd',
				monthsLeading: 'mm',
				yearsFourDigits: 'yyyy'
			});
			loadConfig('myDestnationConfig', {
				daysLeading: 'kk',
				monthsLeading: 'qq',
				yearsFourDigits: 'mmmm'
			});
			expect(convert('dd-mm-yyyy', 'mySourceConfig', 'myDestnationConfig')).to.equal('kk-qq-mmmm');
		});
	});
});
