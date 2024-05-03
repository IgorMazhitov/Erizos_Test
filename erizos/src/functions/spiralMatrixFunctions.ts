export const generateSpiralOrder = (matrix: number[][]) => {
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

  return spiralOrder;
};

