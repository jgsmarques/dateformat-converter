/* eslint-disable no-magic-numbers */

import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { convert } from './main';
import Converter from './Converter';

chai.use(sinonChai);

describe('Dateformat Converter', () => {
	it('should be imported correctly', () => {
		expect(convert).to.be.a('function');
		expect(convert).to.have.length(3);
	});

	it('should call underlying functions when called', () => {
		const stubParse = sinon.stub(Converter, 'parse');
		const stubFormat = sinon.stub(Converter, 'format');

		expect(stubParse).not.to.have.been.called;
		expect(stubFormat).not.to.have.been.called;

		convert('MM/dd/yyyy HH:ii:ss P', {
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
		}, {
			lowerCaseMeridian: 'a',
			upperCaseMeridian: 'a',
			secondsSimple: 's',
			secondsLeading: 'ss',
			minutesSimple: 'i',
			minutesLeading: 'ii',
			hoursSimple24Format: 'h',
			hoursLeading24Format: 'hh',
			hoursSimple12Format: 'g',
			hoursLeading12Format: 'gg',
			daysSimple: 'd',
			daysLeading: 'dd',
			monthsSimple: 'm',
			monthsLeading: 'mm',
			monthsSimpleText: 'M',
			monthsFullText: 'MM',
			yearsTwoDigits: 'y',
			yearsFourDigits: 'yy',
			unixTimestamp: '@',
			timezoneName: 'Z'
		});

		expect(stubParse).to.have.been.calledOnce;
		expect(stubFormat).to.have.been.calledOnce;

		Converter.parse.restore();
		Converter.format.restore();
	});

	it('should work on a real case scenarion', () => {
		expect(convert('mm/dd/yyyy HH:ii:ss P', {
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
		}, {
			lowerCaseMeridian: 'a',
			upperCaseMeridian: 'a',
			secondsSimple: 's',
			secondsLeading: 'ss',
			minutesSimple: 'i',
			minutesLeading: 'ii',
			hoursSimple24Format: 'h',
			hoursLeading24Format: 'hh',
			hoursSimple12Format: 'g',
			hoursLeading12Format: 'gg',
			daysSimple: 'd',
			daysLeading: 'dd',
			monthsSimple: 'm',
			monthsLeading: 'mm',
			monthsSimpleText: 'M',
			monthsFullText: 'MM',
			yearsTwoDigits: 'y',
			yearsFourDigits: 'yy',
			unixTimestamp: '@',
			timezoneName: 'Z'
		})).to.eql('mm/dd/yy gg:ii:ss a');
	});

	it('should not attempt to convert types that do not have a correspondance on the target configuration', () => {
		expect(convert('mm/dd/yyyy HH:ii:ss P', {
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
		}, {
			secondsLeading: 'ss',
			minutesLeading: 'ii',
			hoursLeading12Format: 'gg',
			daysLeading: 'dd',
			monthsLeading: 'mm',
			yearsFourDigits: 'yy'
		})).to.eql('mm/dd/yy gg:ii:ss P');
	});

	it('should work converting to and from "momentjs" pattern', () => {
		expect(convert('mm/dd/yyyy HH:ii:ss P', {
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
		}, 'momentjs')).to.eql('MM/DD/YYYY hh:mm:ss A');

		expect(convert('MM/DD/YYYY hh:mm:ss A', 'momentjs', {
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
		})).to.eql('mm/dd/yyyy HH:ii:ss P');
	});
});
