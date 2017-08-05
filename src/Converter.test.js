/* eslint-disable no-magic-numbers */

import { expect } from 'chai';
import Converter from './Converter';
import CommonFormat from './CommonFormat';

describe('Converter', () => {
	describe('parse method', () => {
		it('should be imported correctly', () => {
			expect(Converter).to.be.an('object');
			expect(Converter).to.respondTo('parse');
			expect(Converter.parse).to.have.length(2);
		});

		it('should throw when the given parameters are not correct', () => {
			const createTestFunction = function(method, ...args) {
				return function() {
					return method(...args);
				};
			};
			expect(createTestFunction(Converter.parse)).to.throw();
			expect(createTestFunction(Converter.parse, '')).to.throw();
			expect(createTestFunction(Converter.parse, '', 'test')).to.throw();
			expect(createTestFunction(Converter.parse, '', {
				unsupportedProperty: ''
			})).to.throw();
		});

		it('should parse date formats correctly', () => {
			const config = {
				lowerCaseMeridian: 'p',
				upperCaseMeridian: 'P',
				secondsSimple: 's',
				secondsLeading: 'ss',
				minutesSimple: 'i',
				minutesLeading: 'ii',
				hoursSimple24Format: 'h',
				hoursLeading24Format: 'hh',
				hoursSimple12Format: 'H',
				hoursLeading12Format: 'HH',
				daysSimple: 'd',
				daysLeading: 'dd',
				monthsSimple: 'm',
				monthsLeading: 'mm',
				monthsSimpleText: 'M',
				monthsFullText: 'MM',
				yearsTwoDigits: 'yy',
				yearsFourDigits: 'yyyy',
				unixTimestamp: 't',
				timezoneName: 'Z'
			};

			expect(Converter.parse('', config)).to.eql('');

			expect(Converter.parse('MM/dd/yyyy', config)).to.eql(
				`${CommonFormat.monthsFullText}/${CommonFormat.daysLeading}/${CommonFormat.yearsFourDigits}`
			);

			expect(Converter.parse('MM/dd/yyyy HH:ii:ss P', config)).to.eql(
				`${CommonFormat.monthsFullText}/${CommonFormat.daysLeading}/${CommonFormat.yearsFourDigits} ` +
				`${CommonFormat.hoursLeading12Format}:${CommonFormat.minutesLeading}:${CommonFormat.secondsLeading} ` +
				`${CommonFormat.upperCaseMeridian}`
			);

			expect(Converter.parse('dd-mm-yyyy', config)).to.eql(
				`${CommonFormat.daysLeading}-${CommonFormat.monthsLeading}-${CommonFormat.yearsFourDigits}`
			);

			expect(Converter.parse('dd-mm-yyyy hh:ii:ss s t', config)).to.eql(
				`${CommonFormat.daysLeading}-${CommonFormat.monthsLeading}-${CommonFormat.yearsFourDigits} ` +
				`${CommonFormat.hoursLeading24Format}:${CommonFormat.minutesLeading}:${CommonFormat.secondsLeading} ` +
				`${CommonFormat.secondsSimple} ${CommonFormat.unixTimestamp}`
			);
		});
	});

	describe('format method', () => {
		it('should be imported correctly', () => {
			expect(Converter).to.be.an('object');
			expect(Converter).to.respondTo('format');
			expect(Converter.format).to.have.length(2);
		});

		it('should throw when the given parameters are not correct', () => {
			const createTestFunction = function(method, ...args) {
				return function() {
					return method(...args);
				};
			};
			expect(createTestFunction(Converter.format)).to.throw();
			expect(createTestFunction(Converter.format, '')).to.throw();
			expect(createTestFunction(Converter.format, '', 'test')).to.throw();
			expect(createTestFunction(Converter.format, '', {
				unsupportedProperty: ''
			})).to.throw();
		});

		it('should format date formats correctly', () => {
			const config = {
				lowerCaseMeridian: 'p',
				upperCaseMeridian: 'P',
				secondsSimple: 's',
				secondsLeading: 'ss',
				minutesSimple: 'i',
				minutesLeading: 'ii',
				hoursSimple24Format: 'h',
				hoursLeading24Format: 'hh',
				hoursSimple12Format: 'H',
				hoursLeading12Format: 'HH',
				daysSimple: 'd',
				daysLeading: 'dd',
				monthsSimple: 'm',
				monthsLeading: 'mm',
				monthsSimpleText: 'M',
				monthsFullText: 'MM',
				yearsTwoDigits: 'yy',
				yearsFourDigits: 'yyyy',
				unixTimestamp: 't',
				timezoneName: 'Z'
			};

			expect(Converter.format('', config)).to.eql('');

			expect(Converter.format(
				`${CommonFormat.monthsFullText}/${CommonFormat.daysLeading}/${CommonFormat.yearsFourDigits}`,	config)).to.eql('MM/dd/yyyy');

			expect(Converter.format(
				`${CommonFormat.monthsFullText}/${CommonFormat.daysLeading}/${CommonFormat.yearsFourDigits} ` +
				`${CommonFormat.hoursLeading12Format}:${CommonFormat.minutesLeading}:${CommonFormat.secondsLeading} ` +
				`${CommonFormat.upperCaseMeridian}`, config)).to.eql('MM/dd/yyyy HH:ii:ss P');

			expect(Converter.format(
				`${CommonFormat.daysLeading}-${CommonFormat.monthsLeading}-${CommonFormat.yearsFourDigits}`, config)).to.eql('dd-mm-yyyy');

			expect(Converter.format(
				`${CommonFormat.daysLeading}-${CommonFormat.monthsLeading}-${CommonFormat.yearsFourDigits} ` +
				`${CommonFormat.hoursLeading24Format}:${CommonFormat.minutesLeading}:${CommonFormat.secondsLeading} ` +
				`${CommonFormat.secondsSimple} ${CommonFormat.unixTimestamp}`, config)).to.eql('dd-mm-yyyy hh:ii:ss s t');
		});

		it('should format unknown types as empty string', () => {
			const config = {
				secondsLeading: 'ss',
				hoursLeading24Format: 'hh',
				daysLeading: 'dd',
				monthsLeading: 'mm',
				yearsFourDigits: 'yyyy'
			};

			expect(Converter.format(
				`${CommonFormat.daysLeading}-${CommonFormat.monthsLeading}-${CommonFormat.yearsFourDigits} ` +
				`${CommonFormat.hoursLeading24Format}:${CommonFormat.minutesLeading}:${CommonFormat.secondsLeading} ` +
				`${CommonFormat.unixTimestamp}`, config)).to.eql('dd-mm-yyyy hh::ss ');
		});
	});
});
