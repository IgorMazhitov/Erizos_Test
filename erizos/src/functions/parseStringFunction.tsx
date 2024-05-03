import React, { useState } from "react";

class ParseStringFunction extends React.Component {
  state = {
    inputNumberA: "",
    inputNumberB: "",
    parsedNumberA: 0,
    parsedNumberB: 0,
    sum: 0,
  };
  implementedParseString = (input: string): number => {
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

  handleParseNumber = (value: string, isNumberA: boolean) => {
    const input: string = value;
    const parsedNumber: number = this.implementedParseString(input);
    if (isNumberA) {
      this.setState({
        inputNumberA: input,
        parsedNumberA: parsedNumber,
        sum: parsedNumber + this.state.parsedNumberB,
      });
    } else {
      this.setState({
        inputNumberB: input,
        parsedNumberB: parsedNumber,
        sum: this.state.parsedNumberA + parsedNumber,
      });
    }
  };

  render() {
    const { inputNumberA, inputNumberB, sum } = this.state;

    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <header>Parse String Function</header>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "10px",
            }}
          >
            <input
              type="text"
              value={inputNumberA}
              onChange={(e) => this.handleParseNumber(e.target.value, true)}
              style={{ marginRight: "10px" }}
            />
            <input
              type="text"
              value={inputNumberB}
              onChange={(e) => this.handleParseNumber(e.target.value, false)}
            />
          </div>
          <div style={{ marginTop: "10px" }}>Sum: {sum}</div>
          <div>
            <label style={{ fontWeight: "bold" }}>
              {" "}
              Implemented Parse String Function{" "}
            </label>
            <text>{this.implementedParseString("-123") + 2} </text>
          </div>
        </div>
        <div style={{ width: "100vw", height: "2px", backgroundColor: "black"}} />
      </>
    );
  }
}

export default ParseStringFunction;
