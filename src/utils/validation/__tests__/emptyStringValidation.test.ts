import emptyStringValidation from '../emptyStringValidation';

describe('empry string validation (emptyStringValidation)', () => {
  it('Empty string', () => {
    const message = emptyStringValidation('');
    expect(message).toBeTruthy();
  });
  it('Spaces string', () => {
    const message = emptyStringValidation('   ');
    expect(message).toBeTruthy();
  });
  it(`Not an empty string`, () => {
    const message = emptyStringValidation('Some text');
    expect(message).toBeFalsy();
  });
  it(`Not an empty string with spaces around `, () => {
    const message = emptyStringValidation('  Some text with spaces around  ');
    expect(message).toBeFalsy();
  });
});
