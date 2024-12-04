type Report = number[]

async function getReports() {
  const path = "./inputs/day-2.txt"
  const file = Bun.file(path)
  const text = await file.text()
  const lines = text.split(/\r?\n|\r|\n/g)
  const words = lines.map(line => line.split(/\s+/g))
  const numbers = words.map(group => group.map(word => parseInt(word)))
  return numbers
}

function isReportSafe(report: Report) {
  const diff = report[1] - report[0]
  const trend = getTrend(diff)
  if (trend === "steady") return false
  for (let index = 0; index < report.length - 1; index++) {
    const currLevel = report[index]
    const nextLevel = report[index + 1]
    const diff = nextLevel - currLevel
    const newTrend = getTrend(diff)
    if (newTrend !== trend) return false
    if (Math.abs(diff) > 3 || Math.abs(diff) < 1) return false
  }
  return true
}

function tolerate(report: Report) {
  const subReports = [
    report,
    ...report.map((_, index) => report.filter((_, i) => i !== index)),
  ]
  const result = subReports.some(isReportSafe)
  return result
}

function getTrend(diff: number) {
  return diff > 0 ? "increasing" : diff < 0 ? "decreasing" : "steady"
}

function safeReportsCount(reports: Report[]) {
  return reports.map(tolerate).filter(Boolean).length
}

const reports = await getReports()
console.log(safeReportsCount(reports))
