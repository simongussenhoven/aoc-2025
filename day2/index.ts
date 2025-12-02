const fs = require("fs");
const data = fs.readFileSync("./day2/data.txt", "utf8");

//
const ids: Array<Array<string>> = data
  .split(",")
  .map((id: string) => id.split("-"));

let countPart1 = 0;
let countPart2 = 0;

const isMadeOfPatterns = (str: string) => {
  let allPatternsEqual = false;
  const arr = str.split("");

  for (let chunkSize = 1; chunkSize <= arr.length / 2; chunkSize++) {
    // only iterate for chunksizes the array can be deviced in
    if (arr.length % chunkSize === 0) {
      // split the array into chunks of that size and put them in the chunks array

      const chunks: Array<string> = [];
      for (let pos = 0; pos < arr.length; pos = pos + chunkSize) {
        const chunk = arr.slice(pos, pos + chunkSize).join("");
        chunks.push(chunk);
      }

      // check if all are equal
      if (chunks.every((ch: string) => ch === chunks[0])) {
        allPatternsEqual = true;
      }
    }
  }
  return allPatternsEqual;
};

// iterate over each range
ids.forEach((row) => {
  const start = row[0];
  const end = row[1];

  for (let i = Number(start); i <= Number(end); i++) {
    const string = String(i);
    const first = string.slice(0, string.length / 2);
    const second = string.slice(string.length / 2, string.length);

    if (first === second) {
      countPart1 = countPart1 + Number(string);
    }
  }

  // check each number for patterns
  for (let i = Number(start); i <= Number(end); i++) {
    const string = String(i);
    if (isMadeOfPatterns(string)) countPart2 = countPart2 + Number(string);
  }
});

// part 1
console.log(countPart1);

// //part 2
console.log(countPart2);
