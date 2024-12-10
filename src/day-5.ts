import _, { after } from "lodash"

const path = "./inputs/day-5.txt"
const file = Bun.file(path)
const text = await file.text()
const [rulesText, updatesText] = text.split(/\r\n\r\n/)
const ruleList = rulesText.split(/\r?\n/).map(rule => rule.split("|"))
const updates = updatesText.split(/\r?\n/).map(line => line.split(","))

const rules: Record<string, string[]> = {}
ruleList.forEach(([page1, page2]) => {
  const edges = rules[page1] ?? []
  rules[page1] = [...edges, page2]
  if (!rules[page2]) rules[page2] = []
})

const correctUpdates = updates.filter(isUpdateCorrect)

function isUpdateCorrect(update: string[]): boolean {
  const isUpdateCorrect = update.every((page, pageIndex) => {
    const afterPages = _.drop(update, pageIndex + 1)
    const isPageCorrect = afterPages.every(afterPage => {
      return rules[page].includes(afterPage)
    })
    return isPageCorrect
  })
  return isUpdateCorrect
}

const middles = correctUpdates.map(update =>
  parseInt(update[Math.floor(update.length / 2)])
)
const sum = _.sum(middles)
// console.log(sum)

const incorrects = updates.filter(update => !isUpdateCorrect(update))
// console.log(incorrects)

incorrects.forEach(update => {
  for (let pageIndex = 0; pageIndex < update.length; ) {
    const page = update[pageIndex]
    const afterPages = _.drop(update, pageIndex + 1)
    let swapped = false
    afterPages.forEach((afterPage, afterPageIndex) => {
      const ruled = rules[page].includes(afterPage)
      if (!ruled) {
        swapPages(pageIndex, pageIndex + afterPageIndex + 1, update)
        swapped = true
      }
    })
    if (!swapped) pageIndex++
  }
})

function swapPages(index1: number, index2: number, update: string[]) {
  const page1 = update[index1]
  update[index1] = update[index2]
  update[index2] = page1
}

const incorrectMiddles = incorrects.map(update =>
  parseInt(update[Math.floor(update.length / 2)])
)
const incSum = _.sum(incorrectMiddles)
console.log(incSum)
