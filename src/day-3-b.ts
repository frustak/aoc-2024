import _ from "lodash"

const path = "./inputs/day-3.txt"
const file = Bun.file(path)
const text = await file.text()
const instructions = text
  .matchAll(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g)
  .map(([instruction]) => instruction)
  .toArray()

let mult = true
let sum = 0
instructions.forEach(instruction => {
  if (instruction === "don't()") mult = false
  else if (instruction === "do()") mult = true
  else if (mult) sum += multiply(parseMul(instruction))
})

console.log(sum)

function parseMul(mul: string) {
  return mul
    .matchAll(/\d+/g)
    .map(([number]) => parseInt(number))
    .toArray()
}

function multiply(numbers: number[]) {
  return numbers[0] * numbers[1]
}
