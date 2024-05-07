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
            fontFamily: "Arial, sans-serif",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            maxWidth: "400px",
            margin: "0 auto",
            marginTop: "20px",
          }}
        >
          <header
            style={{
              marginBottom: "20px",
              fontSize: "1.5em",
              fontWeight: "bold",
            }}
          >
            Parse String Function
          </header>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "10px",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <label style={{ marginRight: "10px" }}>Number A:</label>
              <input
                type="text"
                value={inputNumberA}
                onChange={(e) => this.handleParseNumber(e.target.value, true)}
                style={{
                  marginRight: "10px",
                  padding: "5px",
                  borderRadius: "3px",
                  border: "1px solid #ccc",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <label style={{ marginRight: "10px" }}>Number B:</label>
              <input
                type="text"
                value={inputNumberB}
                onChange={(e) => this.handleParseNumber(e.target.value, false)}
                style={{
                  padding: "5px",
                  marginRight: "10px",
                  borderRadius: "3px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
          </div>
          <div style={{ marginTop: "10px" }}>Sum: {sum}</div>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <label style={{ fontWeight: "bold" }}>
              Implemented Parse String Function (Edit in code)
            </label>
            <div>{implementedParseString("-123") + 2}</div>
          </div>
        </div>
      </>
    );
  }
}

export default ParseStringFunction;
