const fs = require("fs");
const data: any = fs.readFileSync("./day6/data.txt", "utf8");

const cleanData = data.split("\n").map((row: string) => {
  return row
    .split(" ")
    .filter((char: string) => {
      return char !== "";
    })
    .map((char: string) => {
      if (char === "+" || char === "*") return char;
      else return Number(char);
    });
});

const dataWithOperators = cleanData.map((row: number[] | string[]) => {
  return row.map((char: number | string) => {
    if (char === "*") return (a: number, b: number) => a * b;
    if (char === "+") return (a: number, b: number) => a + b;
    else return char;
  });
});

let total = 0;
let numOfRowsToCalculate = dataWithOperators.length - 1; // last row are operators

dataWithOperators[0].forEach((_cell: number, cidx: number) => {
  let accumulator = 0;
  const fn = dataWithOperators[numOfRowsToCalculate][cidx];
  for (let ridx = 0; ridx <= numOfRowsToCalculate; ridx++) {
    const fn = dataWithOperators[dataWithOperators.length - 1][cidx];
    if (ridx === 0) {
      accumulator = dataWithOperators[ridx][cidx];
    } else if (ridx < numOfRowsToCalculate) {
      accumulator = fn(accumulator, dataWithOperators[ridx][cidx]);
    }
  }
  total += accumulator;
});

console.log("part1: ", total);
