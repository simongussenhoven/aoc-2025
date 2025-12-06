const fs = require("fs");
const data: any = fs.readFileSync("./day5/data.txt", "utf8");

let ranges = data
  .split("\n\n")[0]
  .split("\n")
  .map((range: string) => range.split("-").map((str: string) => Number(str)));

const ingredients = data
  .split("\n\n")[1]
  .split("\n")
  .map((str: string) => Number(str));

// part 1
let freshCount = 0;
let freshIds: number[] = [];

const isFresh = (id: number) => {
  let isFresh = false;
  ranges.forEach((range: number[]) => {
    if (id >= range[0] && id <= range[1]) {
      isFresh = true;
    }
  });
  return isFresh;
};

ingredients.forEach((id: number) => {
  if (isFresh(id)) freshCount++;
});

console.log("Part1: " + freshCount);

// part 2
let mergedRanges: number[][] = [];
ranges.sort((r1: number[], r2: number[]) => r1[0] - r2[0]);

ranges.forEach((currentRange: number[]) => {
  if (mergedRanges.length === 0) {
    mergedRanges.push(currentRange);
  } else {
    let lastRange = mergedRanges[mergedRanges.length - 1];
    if (currentRange[0] <= lastRange[1]) {
      lastRange[1] = Math.max(lastRange[1], currentRange[1]);
    } else {
      mergedRanges.push(currentRange);
    }
  }
});

let totalFreshIds = 0;
mergedRanges.forEach((range) => {
  totalFreshIds += range[1] - range[0] + 1;
});

console.log("Part 2:", totalFreshIds);
