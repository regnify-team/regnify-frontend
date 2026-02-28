// Chart data types
export interface ChartDataItem {
  name: string
  value: number
  color: string
}

export interface BarChartDataItem {
  day: string
  value: number
}

// Metric card types
export interface MetricData {
  title: string
  value: string | number
  color: 'blue' | 'green' | 'yellow'
}

// Navigation types
export interface NavItem {
  label: string
  path: string
  icon?: React.ReactNode
}

// Filter types
export interface DateRangeFilter {
  startDate: Date | null
  endDate: Date | null
  preset?: string
}
