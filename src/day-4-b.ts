import _ from "lodash"

const THE_WORD = "MAS"
const REVERSED = THE_WORD.split("").reverse().join("")
const path = "./inputs/day-4.txt"
const file = Bun.file(path)
const text = await file.text()
const lines = text.split(/\r?\n/)

let count = 0
lines.forEach((line, lineIndex) => {
  const letters = line.split("")
  letters.forEach((letter, wordIndex) => {
    const xLines = _.slice(lines, lineIndex, lineIndex + THE_WORD.length)
    // top left to bottom right
    const tlbr = xLines
      .map((line, innerLineIndex) => line[wordIndex + innerLineIndex])
      .join("")
    // top right to bottom left
    const trbl = xLines
      .map(
        (line, innerLineIndex) =>
          line[wordIndex + THE_WORD.length - 1 - innerLineIndex]
      )
      .join("")

    if (
      (tlbr === THE_WORD || tlbr === REVERSED) &&
      (trbl === THE_WORD || trbl === REVERSED)
    )
      count++
  })
})

console.log(count)
