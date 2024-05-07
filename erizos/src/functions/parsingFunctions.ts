export const implementedParseString = (input: string): number => {
  const isNegative = input[0] === "-";
  let result = 0;
  let i = isNegative ? 1 : 0;
  let hasDecimal = false;
  let decimalPlace = 1;
  let exponent = 0;
  let isExponential = false;

  while (i < input.length) {
    const char = input[i];
    let digit = NaN;

    switch (char) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        digit = parseInt(char);
        if (isExponential) {
          exponent = exponent * 10 + digit;
        } else if (hasDecimal) {
          result += digit / Math.pow(10, decimalPlace);
          decimalPlace++;
        } else {
          result = result * 10 + digit;
        }
        break;
      case ".":
        if (hasDecimal || isExponential) {
          throw new Error("Invalid input");
        }
        hasDecimal = true;
        break;
      case "e":
        if (isExponential) {
          throw new Error("Invalid input");
        }
        isExponential = true;
        break;
      default:
        throw new Error("Invalid input");
    }

    i++;
  }

  if (isExponential) {
    result *= Math.pow(10, exponent);
  }

  return isNegative ? -result : result;
};
