import { expect } from 'chai';

import { UpdateValue } from '../src/UpdateValue';

describe('UpdateValueTest', () => {

  it('the default counter value should be zero', (): void => {
    const updateValue = new UpdateValue<string>();

    expect(0).equal(updateValue.counter);
  });

  it('the counter value after setting the value should be equal to one', (): void => {
    const updateValue = new UpdateValue<string>();

    updateValue.value = 'Hello World!';

    expect(1).equal(updateValue.counter);
  });

  it('the counter value after double setting the value should be equal to two', (): void => {
    const updateValue = new UpdateValue<string>();

    updateValue.value = 'Hello World!';
    updateValue.value = 'Hold We Roll!';

    expect(2).equal(updateValue.counter);
  });

  it('the value should be "Hello World!"', (): void => {
    const updateValue = new UpdateValue<string>();

    updateValue.value = 'Hello World!';

    expect('Hello World!').equal(updateValue.value);
  });

});
