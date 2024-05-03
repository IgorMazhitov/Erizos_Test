import React, { useState } from "react";
import { implementedParseString } from "../functions/parsingFunctions";

class ParseStringFunction extends React.Component {
  state = {
    inputNumberA: "",
    inputNumberB: "",
    parsedNumberA: 0,
    parsedNumberB: 0,
    sum: 0,
  };
  
  handleParseNumber = (value: string, isNumberA: boolean) => {
    const input: string = value;
    const parsedNumber: number = implementedParseString(input);
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
          <header>Parse String Function (Enterable strings (will throw an error if number in string is invalid))</header>
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
              Implemented Parse String Function (Edit in code){" "}
            </label>
            <text>{implementedParseString("-123") + 2} </text>
          </div>
        </div>
        <div
          style={{ width: "100vw", height: "2px", backgroundColor: "black" }}
        />
      </>
    );
  }
}

export default ParseStringFunction;
