const fs = require("fs");
const data: any = fs.readFileSync("./day4/example.txt", "utf8");
let grid = data.split("\n").map((row: string) => row.split(""));

let accessibleRolls = 0;
let removableRollPositions: any = [];
let removedRollCount = 0;

const checkPositions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const isPositionRoll = (ri: number, ci: number, pos: Array<number>) => {
  if (!grid[ri + pos[0]]) return false;
  if (!grid[ri + pos[0]][ci + pos[1]]) return false;
  return grid[ri + pos[0]][ci + pos[1]] === "@";
};

const checkRemovableRolls = (part1?: string) => {
  grid.forEach((row: Array<string>, rowIndex: number) => {
    row.forEach((cell: string, cellIndex: number) => {
      if (cell !== "@") return;

      let adjacentRolls = 0;
      checkPositions.forEach((pos) => {
        if (isPositionRoll(rowIndex, cellIndex, pos)) adjacentRolls++;
      });

      if (adjacentRolls < 4) {
        if (part1) accessibleRolls++;
        else removableRollPositions.push([rowIndex, cellIndex]);
      }
    });
  });
  return accessibleRolls;
};

const removeRoll = (pos: Array<number>) => {
  grid[pos[0]][pos[1]] = ["."];
  removedRollCount++;
};

const removeRolls = () => {
  removableRollPositions.forEach((pos: number[]) => {
    removeRoll(pos);
  });
  removableRollPositions = [];
};

// part 1
console.log("Removable rolls: ", checkRemovableRolls("part1"));

// part 2
for (let i = 0; i <= Infinity; i++) {
  checkRemovableRolls();
  if (!removableRollPositions.length) break;
  else removeRolls();
}

console.log("removed rolls: ", removedRollCount);
