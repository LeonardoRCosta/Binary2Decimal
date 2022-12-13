export class Binary2Decimal {
  private algorisms: number[] = [];
  private decimalPlaces: number = -1;
  constructor(private binaryString: string) {}

  checkIfIsBinary(): boolean {
    return this.binaryString.split('').every((char) => Number(char) === 0 || Number(char) === 1 || char === ',')
  }

  validate(): void {
    try {
      const isBinary = this.checkIfIsBinary();
      if (!isBinary) throw new Error('Invalid binary!');
    } catch (error: any) {
      throw error;
    }
  }

  pushAlgorismsIntoArray() {
    for (const algorism of this.binaryString) {
      const isNotComma = algorism !== ',';
      const isNotDot = algorism !== '.';
      if (isNotComma && isNotDot) this.algorisms.push(Number(algorism));
    }
  }

  countDecimalPlaces() {
    const indexOfComma = this.binaryString.indexOf(',');
    const strDecimalPlaces = this.binaryString.slice(indexOfComma);
    for (const place of strDecimalPlaces) {
      this.decimalPlaces++;
    }
  }

  run() {
    this.binaryString = this.binaryString.replace('.', ',');
    this.validate();
    this.countDecimalPlaces();
    this.pushAlgorismsIntoArray();
    let idx = -this.decimalPlaces;
    const decimal = this.algorisms.reduceRight((decimal, alg) => {
      decimal += alg * 2 ** idx;
      idx += 1;
      return decimal;
    }, 0);
    return decimal;
  }
}
