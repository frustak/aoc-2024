import _ from "lodash"

const path = "./inputs/day-3.txt"
const file = Bun.file(path)
const text = await file.text()
const mults = text
  .matchAll(/mul\(\d+,\d+\)/g)
  .map(([mul]) => mul)
  .toArray()
  .map(mul =>
    mul
      .matchAll(/\d+/g)
      .map(([number]) => parseInt(number))
      .toArray()
  )
const result = mults.map(([a, b]) => a * b)
const sum = _.sum(result)
console.log(sum)
