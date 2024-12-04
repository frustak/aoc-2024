import _ from "lodash"

const path = "./inputs/day-2.txt"
const file = Bun.file(path)
const text = await file.text()
const lines = text.split(/\r?\n|\r|\n/g)
const words = lines.map(line => line.split(/\s+/g))
const numbers = words.map(group => group.map(word => parseInt(word)))
const reports = numbers

function safe(report: number[]): boolean {
  const diff = report[1] - report[0]
  const trend = diff > 0 ? "increasing" : diff < 0 ? "decreasing" : "steady"
  if (trend === "steady") return false
  for (let index = 0; index < report.length - 1; index++) {
    const curr = report[index]
    const next = report[index + 1]
    const diff = next - curr
    if (Math.abs(diff) > 3) return false
    if (trend === "increasing" && diff <= 0) return false
    if (trend === "decreasing" && diff >= 0) return false
  }
  return true
}

// const results = reports.map(safe)
// const safes = results.filter(Boolean)
// const count = safes.length

// console.log(count)

function tolerate(report: number[]): boolean {
  const diff = report[1] - report[0]
  const trend = diff > 0 ? "increasing" : diff < 0 ? "decreasing" : "steady"
  if (trend === "steady") return safe(_.drop(report, 1))
  for (let index = 0; index < report.length - 1; index++) {
    const curr = report[index]
    const next = report[index + 1]
    const diff = next - curr
    if (
      Math.abs(diff) > 3 ||
      (trend === "increasing" && diff <= 0) ||
      (trend === "decreasing" && diff >= 0)
    ) {
      console.log(
        report.filter((_, i) => i !== index),
        report.filter((_, i) => i !== index + 1)
      )
      return (
        safe(report.filter((_, i) => i !== index)) ||
        safe(report.filter((_, i) => i !== index + 1))
      )
    }
  }
  return true
}

const tolresults = reports.map(tolerate)
const tolerates = tolresults.filter(Boolean)
const tolcount = tolerates.length

console.log(tolcount)
