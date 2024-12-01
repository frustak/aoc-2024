import _ from "lodash"

const file = Bun.file("./inputs/day-1.txt")
const text = await file.text()
const lines = text.split(/\r?\n|\r|\n/g)
const words = lines.map(line => line.split(/\s+/g))
const numbers = words.map(group => group.map(word => parseInt(word)))
const lists = _.zip(...numbers) as number[][]
const sorted = lists.map(list => list.toSorted())
const [llist, rlist] = sorted
const distance = llist.reduce(
  (prev, curr, i) => prev + Math.abs(curr - rlist[i]),
  0
)

console.log(distance)

const [lcounts, rcount] = [_.countBy(llist), _.countBy(rlist)]
const similarity = _.entries(lcounts)
  .map(([key, value]) => parseInt(key) * value * (rcount[key] ?? 0))
  .reduce((prev, value) => prev + value, 0)

console.log(similarity)
