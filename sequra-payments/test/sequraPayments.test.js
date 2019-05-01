/* eslint-disable no-undef */
import { expect, use } from 'chai';
import SequraPayments from '../src/SequraPayments';
import merchantMockDom from './merchantMockDom';

// Use chai dom
use(require('chai-dom'));

describe('Sequra payments addon test:', () => {
  const { document } = merchantMockDom.window;
  console.log(document);
  const customSequraPayments = new SequraPayments({
    addonScope: document,
    container: '.container',
    priceContainer: '#product-price',
    sequraAddonContainer: '#myCustomHtmlDiv',
  });
  console.log(customSequraPayments);
  it("Should container class is equal to '.container':", () => {
    expect(customSequraPayments.container).have.class('container');
  });
});
