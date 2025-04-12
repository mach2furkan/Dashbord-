export function formatCurrency(value: number, currency = "USD", decimals = 2): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

export function formatNumber(value: number, decimals = 2): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

export function formatPercent(value: number, decimals = 2): string {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100)
}

export function getRandomSparklineData(length = 8, min = 0.2, max = 1): number[] {
  return Array.from({ length }, () => min + Math.random() * (max - min))
}

export function getTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)

  if (diffHour > 0) {
    return `${diffHour}h ago`
  } else if (diffMin > 0) {
    return `${diffMin}m ago`
  } else {
    return "Just now"
  }
}

export function generateChartData(days = 30): { date: string; value: number }[] {
  const data = []
  const today = new Date()

  for (let i = days; i >= 0; i--) {
    const date = new Date()
    date.setDate(today.getDate() - i)

    // Generate a somewhat realistic looking price movement
    const baseValue = 100
    const randomWalk = Array.from({ length: i + 1 }, () => (Math.random() - 0.48) * 2).reduce(
      (sum, val) => sum + val,
      0,
    )

    data.push({
      date: date.toISOString().split("T")[0],
      value: baseValue + randomWalk,
    })
  }

  return data
}
