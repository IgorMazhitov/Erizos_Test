import React, { Component } from "react";
import { generateSpiralOrder } from "../functions/spiralMatrixFunctions";
import { matrix } from "../fakeData/fakeMatrix";

interface State {
  matrix: number[][];
  spiralOrder: number[];
}

class SpiralMatrix extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      matrix: [],
      spiralOrder: [],
    };
  }

  componentDidMount() {
    const defaultMatrix = matrix;
    this.setState({ matrix: defaultMatrix });
    this.getSpiralOrder(defaultMatrix);
  }

  getSpiralOrder(matrix: number[][]) {
    const spiralOrder: number[] = generateSpiralOrder(matrix);

    this.setState({ spiralOrder });
  }

  render() {
    const { matrix, spiralOrder } = this.state;

    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          {matrix.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: "flex" }}>
              {row.map((cell, cellIndex) => (
                <span
                  key={cellIndex}
                  style={{
                    width: "30px",
                    height: "30px",
                    border: "1px solid black",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "2px",
                  }}
                >
                  {cell}
                </span>
              ))}
            </div>
          ))}
          <label style={{ marginTop: "20px", fontWeight: "bold" }}>
            Spiral Matrix - edit in code
          </label>
          <div style={{ marginTop: "20px", fontWeight: "bold" }}>
            Spiral Order: {spiralOrder.join(" ")}
          </div>
        </div>
        <div
          style={{ width: "100vw", height: "2px", backgroundColor: "black" }}
        />
      </>
    );
  }
}

export default SpiralMatrix;
