const size = 1024;

const A1 = Array.from({ length: size }, () =>
  Array.from({ length: size }, () => Math.random() * 1000)
);
const B1 = Array.from({ length: size }, () =>
  Array.from({ length: size }, () => Math.random() * 1000)
);

const A2 = new Float32Array(size * size);
const B2 = new Float32Array(size * size);
const C2 = new Float32Array(size * size);

for (let i = 0; i < size * size; i++) {
  A2[i] = Math.random();
  B2[i] = Math.random();
}

function multiplyArray(A, B, size) {
  const result = Array.from({ length: size }, () => Array(size).fill(0));
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let sum = 0;
      for (let k = 0; k < size; k++) {
        sum += A[i][k] * B[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
}

function multiplyTypedArray(A, B, C, size) {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let sum = 0;
      for (let k = 0; k < size; k++) {
        sum += A[i * size + k] * B[k * size + j];
      }
      C[i * size + j] = sum;
    }
  }
}

// ▶️ Benchmark for Array
console.time("Array × Array");
const C1 = multiplyArray(A1, B1, size);
console.timeEnd("Array × Array");

// ▶️ Benchmark for Float32Array
console.time("Float32Array × Float32Array");
multiplyTypedArray(A2, B2, C2, size);
console.timeEnd("Float32Array × Float32Array");

// ✅ Validation
console.log("C1[0][0] =", C1[0][0].toFixed(2), "→", C2[0].toFixed(2));
console.log("C1[10][10] =", C1[10][10].toFixed(2), "→", C2[10 * size + 10].toFixed(2));
