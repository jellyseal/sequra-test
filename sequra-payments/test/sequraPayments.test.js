/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { expect, use, assert } from 'chai';
import { JSDOM } from 'jsdom';

import SequraPayments from '../src/SequraPayments';
import SequraPaymentsModal from '../src/SequraPayments/SequraPaymentsModal';
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

describe('Sequra payments modal test:', () => {
  const modalStyle = `
            position: absolute;
            top: 50%;
            transform: translate(-50%, -50%);
            left: 50%;
            width: 400px;
            padding: 20px;
            background: white;
            z-index: 999999;
        `;
  const sequraModal = new JSDOM(SequraPaymentsModal(modalStyle, 399.99));
  const sequraModalDom = sequraModal.window.document;
  const sequraFirstDiv = sequraModalDom.querySelector('div');
  const instalmentTotal = sequraModalDom.querySelector('#instalmentTotal');
  it('Should Sequra Patment Modal have lenght', () => {
    expect(sequraFirstDiv.innerHTML.length).to.be.gt(0);
  });
  it('Should Sequra Patment Modal recieve position: absolute style', () => {
    expect(sequraFirstDiv.style.position).to.equal('absolute');
  });
  it('Should Sequra Patment Modal instalmentTotal exists', () => {
    assert.isDefined(instalmentTotal.dataset.instalment);
  });
  it('Should Sequra Patment Modal instalmentTotal is equal to 399.99', () => {
    expect(instalmentTotal.dataset.instalment).to.equal('399.99');
  });
});
