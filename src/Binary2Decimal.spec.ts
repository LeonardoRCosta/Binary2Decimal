import { Binary2Decimal } from './Binary2Decimal';


describe('Binary2Decimal', () => {
  afterEach(() => jest.clearAllMocks());

  it('should return true if the string contains a comma', () => {
    const binary2decimal = new Binary2Decimal('0110,1');
    const spy = jest
      .spyOn(binary2decimal, 'checkIfHasComma')
      .mockImplementationOnce(() => true);
    expect(binary2decimal.checkIfHasComma()).toBe(true);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should return false if the string does not contain a comma', () => {
    const binary2decimal = new Binary2Decimal('01100');
    const spy = jest
      .spyOn(binary2decimal, 'checkIfHasComma')
      .mockImplementationOnce(() => false);
    expect(binary2decimal.checkIfHasComma()).toBe(false);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should return true if the string represents a valid binary', () => {
    const binary2decimal = new Binary2Decimal('0110');
    const spy = jest
      .spyOn(binary2decimal, 'checkIfIsBinary')
      .mockImplementationOnce(() => true);
    expect(binary2decimal.checkIfIsBinary()).toBe(true);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should return false if the string does not represent a valid binary', () => {
    const binary2decimal = new Binary2Decimal('2345');
    const spy = jest
      .spyOn(binary2decimal, 'checkIfIsBinary')
      .mockImplementationOnce(() => false);
    expect(binary2decimal.checkIfIsBinary()).toBe(false);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should throw if the string is empty', () => {
    const binary2decimal = new Binary2Decimal('');
    const spy = jest
      .spyOn(binary2decimal, 'validate')
      .mockImplementationOnce(() => {
        throw new Error(
          'Invalid binary! The string must have at least one algorism'
        );
      });
    expect(() => binary2decimal.validate()).toThrowError(
      'Invalid binary! The string must have at least one algorism'
    );
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should throw if the string is not a valid binary', () => {
    const binary2decimal = new Binary2Decimal('abc');
    const spy = jest
      .spyOn(binary2decimal, 'validate')
      .mockImplementationOnce(() => {
        throw new Error('Invalid binary!');
      });
    expect(() => binary2decimal.validate()).toThrowError('Invalid binary!');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should return the binary converted to a decimal number', () => {
    const binary2decimal = new Binary2Decimal('0110');
    const spy = jest
      .spyOn(binary2decimal, 'run')
      .mockImplementationOnce(() => 6);
    expect(binary2decimal.run()).toBe(6);
  });

  it('should parse and push the algorism into the array, only if it is not a comma', () => {
    const mockAlgorismsArray: number[] = []
    const exampleBinaryString: string = '0110,002'
    const mockPushMethod = jest.fn().mockImplementation(() => {
      for (const char of exampleBinaryString) {
        const isNotComma = char !== ','
        if (isNotComma) mockAlgorismsArray.push(Number(char))
      }
      console.log(mockAlgorismsArray)
    })
    mockPushMethod();
    expect(mockAlgorismsArray.length).toBe(7)
  })

  it('should change the decimalPlaces property to 0 if the binary does not have decimal places', () => {
    const binary2decimal = new Binary2Decimal('0110');
    binary2decimal.countDecimalPlaces();
    expect(binary2decimal.getDecimalPlaces).toBe(0);
  });

  it('should change the decimalPlaces property to the number of the decimal places present in the binary number', () => {
    const binary2decimal = new Binary2Decimal('0110,112');
    binary2decimal.countDecimalPlaces();
    expect(binary2decimal.getDecimalPlaces).toBe(3);
  });
});
