/* eslint-disable no-magic-numbers */

import { expect } from 'chai';
import test from './main';

describe('my test', () => {
	it('should return an empty string', () => {
		expect(test()).to.equal('2');
	});
});
