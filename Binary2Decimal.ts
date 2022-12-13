export class Binary2Decimal {
  static run(binary: string) {
    const algorisms: number[] = [];
    for (let algorism of binary) {
      algorisms.push(Number(algorism));
    }
    console.log(algorisms);
    let idx = 1
    const decimal = algorisms.reduceRight((acc, alg) => {
      console.log(acc);
      acc += alg * (2 ** idx);
      idx += 1;
      return acc;
    });
    return decimal;
  }
}
