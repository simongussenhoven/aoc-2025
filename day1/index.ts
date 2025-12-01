const fs = require("fs");
const data = fs.readFileSync("./day1/data.txt", "utf8");

const instructions = data.split("\n");

let cPos = 50;
let wasZeroCount = 0;
let clicks = 0;

const moveCcw = (num: number) => {
  for (let i = 0; i < num; i++) {
    if (cPos - 1 < 0) {
      cPos = 99;
    } else {
      cPos--;
    }
    if (cPos === 0) clicks++;
  }
};

const moveCw = (num: number) => {
  for (let i = 0; i < num; i++) {
    if (cPos + 1 === 100) {
      cPos = 0;
    } else {
      cPos++;
    }
    if (cPos === 0) clicks++;
  }
};

instructions.forEach((inst: string, index: number) => {
  const direction = inst.slice(0, 1);
  const amount = parseInt(inst.slice(1, inst.length));
  if (direction === "L") {
    moveCcw(amount);
  } else {
    moveCw(amount);
  }
  if (cPos === 0) {
    wasZeroCount++;
  }
});

// part 1
console.log(wasZeroCount);

// part 2
console.log(clicks);
