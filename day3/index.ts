const fs = require("fs");
const data = fs.readFileSync("./day3/data.txt", "utf8");

const banks = data.split(`\n`);

const getHighestNumbers = (str: string) => {
  const mappedChars = str
    .split("")
    .map((b) => Number(b))
    .map((char, index) => {
      return { num: char, index };
    });

  let number = 0;

  mappedChars.forEach((char1, index1) => {
    mappedChars.forEach((char2, index2) => {
      if (index1 <= index2) return;
      const newNumber = Number(
        [char1, char2]
          .sort((a, b) => a.index - b.index)
          .map((obj) => obj.num)
          .join("")
      );
      if (newNumber > number) number = newNumber;
    });
  });

  return number;
};

let maxJoltage = 0;

banks.forEach((batt: string) => {
  maxJoltage += getHighestNumbers(batt);
});

console.log(maxJoltage);
