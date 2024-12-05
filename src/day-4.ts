import _ from "lodash"

const THE_WORD = "XMAS"
const REVERSED = THE_WORD.split("").reverse().join("")
const path = "./inputs/day-4.txt"
const file = Bun.file(path)
const text = await file.text()
const lines = text.split(/\r?\n/)

let count = 0
lines.forEach((line, lineIndex) => {
  const letters = line.split("")
  letters.forEach((letter, wordIndex) => {
    const horizontal = _.slice(
      letters,
      wordIndex,
      wordIndex + THE_WORD.length
    ).join("")
    if (horizontal === THE_WORD || horizontal === REVERSED) {
      count++
    }

    const vertical = _.slice(lines, lineIndex, lineIndex + THE_WORD.length)
      .map(line => line[wordIndex])
      .join("")
    if (vertical === THE_WORD || vertical === REVERSED) {
      count++
    }

    const diagonal_forward = _.slice(
      lines,
      lineIndex,
      lineIndex + THE_WORD.length
    )
      .map((line, innerLineIndex) => line[wordIndex + innerLineIndex])
      .join("")
    if (diagonal_forward === THE_WORD || diagonal_forward === REVERSED) {
      count++
    }

    const diagonal_backward = _.slice(
      lines,
      lineIndex,
      lineIndex + THE_WORD.length
    )
      .map((line, innerLineIndex) => line[wordIndex - innerLineIndex])
      .join("")
    if (diagonal_backward === THE_WORD || diagonal_backward === REVERSED) {
      count++
    }
  })
})

console.log(count)
