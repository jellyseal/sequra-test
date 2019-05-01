/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { expect, use, assert } from 'chai';
import SequraPayments from '../src/SequraPayments';
import merchantMockDom from './merchantMockDom';

// Use chai dom
use(require('chai-dom'));

describe('Sequra payments addon test:', () => {
  const { window: { document } } = merchantMockDom;
  const customSequraPayments = new SequraPayments({
    addonScope: document,
    container: '.container',
    priceId: '#product-price',
    sequraAddonContainer: '#myCustomHtmlDiv',
  });
  it('Should container has been declared', () => {
    assert.isDefined(customSequraPayments.container);
  });
  it("Should container class is equal to '.container':", () => {
    expect(customSequraPayments.container).have.class('container');
  });
  it('Should priceId has been declared:', () => {
    assert.isDefined(customSequraPayments.priceId);
  });
  it('Should priceId has equal to #product-price', () => {
    assert.equal(customSequraPayments.priceId, '#product-price');
  });
  it('Should priceId exists in merchant site and return a priceContainer', () => {
    assert.isDefined(customSequraPayments.priceContainer);
  });
  it('Should seQuraModule found a productPrice', () => {
    assert.isDefined(customSequraPayments.productPrice);
  });
  it('Should ProductPrice is a number', () => {
    assert.isNumber(customSequraPayments.productPrice);
  });
  it('Should ProductPrice is a equal to 399,99', () => {
    expect(customSequraPayments.productPrice).to.equal(399.99);
  });
});
