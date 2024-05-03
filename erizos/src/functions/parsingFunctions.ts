export const implementedParseString = (input: string): number => {
  const isNegative = input[0] === "-";
  let result = 0;
  let i = isNegative ? 1 : 0;
  while (i < input.length) {
    const char = input[i];
    let digit = 0;
    switch (char) {
      case "0":
        digit = 0;
        break;
      case "1":
        digit = 1;
        break;
      case "2":
        digit = 2;
        break;
      case "3":
        digit = 3;
        break;
      case "4":
        digit = 4;
        break;
      case "5":
        digit = 5;
        break;
      case "6":
        digit = 6;
        break;
      case "7":
        digit = 7;
        break;
      case "8":
        digit = 8;
        break;
      case "9":
        digit = 9;
        break;
      default: {
        digit = NaN;
        break;
      }
    }
    if (isNaN(digit)) {
      throw new Error("Invalid input");
    }
    result = result * 10 + digit;
    i++;
  }
  return isNegative ? -result : result;
};
