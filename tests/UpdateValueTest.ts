import { expect } from 'chai';

import { UpdateValue } from '../src/UpdateValue';

describe('UpdateValue', () => {

  it('the default counter value should be zero', (): void => {
    const updateValue = new UpdateValue<string>();

    expect(updateValue.counter).to.be.equal(0);
  });

  it('the counter value after setting the value should be equal to one', (): void => {
    const updateValue = new UpdateValue<string>();

    updateValue.value = 'Hello World!';

    expect(updateValue.counter).to.be.equal(1);
  });

  it('the counter value after double setting the value should be equal to two', (): void => {
    const updateValue = new UpdateValue<string>();

    updateValue.value = 'Hello World!';
    updateValue.value = 'Hold We Roll!';

    expect(updateValue.counter).to.be.equal(2);
  });

  it('the value should be "Hello World!"', (): void => {
    const updateValue = new UpdateValue<string>();

    updateValue.value = 'Hello World!';

    expect(updateValue.value).to.be.equal('Hello World!');
  });

});
