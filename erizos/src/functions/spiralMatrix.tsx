import React, { Component } from "react";

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
    // EDIT MATRIX HERE (I LOVE THAT YOUR CLIENT IS ESPN, WOW)
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    this.setState({ matrix });
    this.generateSpiralOrder(matrix);
  }

  generateSpiralOrder(matrix: number[][]) {
    const spiralOrder: number[] = [];
    let top = 0;
    let bottom = matrix.length - 1;
    let left = 0;
    let right = matrix[0].length - 1;
    let direction = 0;

    while (top <= bottom && left <= right) {
      if (direction === 0) {
        for (let i = left; i <= right; i++) {
          spiralOrder.push(matrix[top][i]);
        }
        top++;
      } else if (direction === 1) {
        for (let i = top; i <= bottom; i++) {
          spiralOrder.push(matrix[i][right]);
        }
        right--;
      } else if (direction === 2) {
        for (let i = right; i >= left; i--) {
          spiralOrder.push(matrix[bottom][i]);
        }
        bottom--;
      } else if (direction === 3) {
        for (let i = bottom; i >= top; i--) {
          spiralOrder.push(matrix[i][left]);
        }
        left++;
      }
      direction = (direction + 1) % 4;
    }

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
