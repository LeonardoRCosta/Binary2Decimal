/**
 * A class that converts a binary number to a decimal number
 *
 * @property algorisms: An array that will contain the algorisms of the binary number
 * @property decimalPlaces: The number of decimal places of the binary number
 * @property binaryString: The string representation of the binary number
 *
 * @Author Leonardo Ramos Costa
 */
export class Binary2Decimal {
  private algorisms: number[] = [];
  private decimalPlaces: number = 0;
  constructor(private binaryString: string) {}

  get getAlgorisms(): number[] {
    return this.algorisms;
  }

  get getDecimalPlaces(): number {
    return this.decimalPlaces;
  }

  get getBinaryString(): string {
    return this.binaryString;
  }

  /**
   * A method that returns the comma index or -1 if the string does not have a comma
   * @returns commaIndex or -1 if the string has no comma
   */
  getCommaIndex(): number {
    return this.binaryString.indexOf(',');
  }

  /**
   * A method that checks if the string represents a valid binary number
   * @returns True if the string represents a valid binary and false otherwise
   */
  checkIfIsBinary(): boolean {
    const binaryChars = ['0', '1', ','];

    const firstCommaIndex = this.getCommaIndex();

    const lastCommaIndex = this.binaryString.lastIndexOf(',');

    if (firstCommaIndex !== lastCommaIndex || firstCommaIndex === 0)
      return false;

    return this.binaryString
      .split('')
      .every((char) => binaryChars.includes(char));
  }

  /**
   * A method that validates if the binaryString is a valid binary number
   * @returns void
   * @throws Error 'Invalid binary! The string must have at least one algorism.' if the string is empy and Error 'Invalid binary!' if the string does not represents a valid binary number
   */
  validate(): void {
    try {
      if (this.binaryString.length <= 0)
        throw new Error(
          'Invalid binary! The string must have at least one algorism.'
        );
      const isBinary = this.checkIfIsBinary();
      if (!isBinary) throw new Error('Invalid binary!');
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * A method that checks if the algorism is valid and if it is pushes it into the algosisms array.
   * @returns void
   */
  pushAlgorismsIntoArray(): void {
    for (const algorism of this.binaryString) {
      const isNotComma = algorism !== ',';
      if (isNotComma) this.algorisms.push(Number(algorism));
    }
  }

  /**
   * A method that count the decimal places of the binaryString and set it to the decimalPlaces property
   * @returns void
   */
  countDecimalPlaces(): void {
    const commaIndex = this.getCommaIndex();
    if (commaIndex !== -1) {
      const decimalPlacesChars = this.binaryString
        .slice(commaIndex)
        .replace(',', '')
        .split('');
      this.decimalPlaces = decimalPlacesChars.length;
    }
  }

  /**
   * A method that converts the binaryString to a Decimal
   * @returns decimal: The result of the conversion of the binary number to a decimal
   */
  run() {
    this.binaryString = this.binaryString.replace('.', ',');
    this.validate();
    this.countDecimalPlaces();
    this.pushAlgorismsIntoArray();
    let idx = -this.decimalPlaces;
    const decimal = this.algorisms.reduceRight((decimal, alg) => {
      decimal += alg * 2 ** idx;
      idx++;
      return decimal;
    }, 0);
    return decimal;
  }
}
