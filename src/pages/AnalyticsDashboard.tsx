import { Box, Typography, Grid } from '@mui/material'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { DonutChartCard } from '../components/DonutChartCard'
import { BarChartCard } from '../components/BarChartCard'

interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

interface DashboardStatsResponse {
  documentsByStatus: Record<string, number>
  documentsByCountry: Record<string, number>
  documentsByType: Record<string, number>
  providerResponseStatus: Record<string, number>
  dailyStats: Array<{ date: string; count: number }>
}

interface ChartDataItem {
  name: string
  value: number
  color: string
}

interface AnalyticsViewData {
  statusData: ChartDataItem[]
  countryData: ChartDataItem[]
  documentTypeData: ChartDataItem[]
  responseStatusData: ChartDataItem[]
  timeData: Array<{ day: string; value: number }>
}

const chartColors = ['#4CAF50', '#2196F3', '#FFA726', '#F44336', '#9C27B0']

const mapRecordToChartData = (dataMap: Record<string, number>): ChartDataItem[] =>
  Object.entries(dataMap).map(([name, value], index) => ({
    name,
    value,
    color: chartColors[index % chartColors.length],
  }))

export const AnalyticsDashboard = () => {
  const [data, setData] = useState<AnalyticsViewData>({
    statusData: [],
    countryData: [],
    documentTypeData: [],
    responseStatusData: [],
    timeData: [],
  })

  useEffect(() => {
    axios
      .get<ApiResponse<DashboardStatsResponse>>('/api/analytics')
      .then((response) => {
        const stats = response.data.data

        setData({
          statusData: mapRecordToChartData(stats.documentsByStatus),
          countryData: mapRecordToChartData(stats.documentsByCountry),
          documentTypeData: mapRecordToChartData(stats.documentsByType),
          responseStatusData: mapRecordToChartData(stats.providerResponseStatus),
          timeData: stats.dailyStats.map((item) => ({
            day: new Date(item.date).toLocaleDateString('en-US', {
              weekday: 'short',
            }),
            value: item.count,
          })),
        })
      })
      .catch((err) => console.error('Failed to fetch analytics:', err))
  }, [])

  const {
    statusData,
    countryData,
    documentTypeData,
    responseStatusData,
    timeData,
  } = data

  return (
    <Box>
      <Typography variant="h4" fontWeight={600} sx={{ mb: 3 }}>
        Analytics Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <DonutChartCard title="Breakdown by Status" data={statusData} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <DonutChartCard title="Breakdown by Country" data={countryData} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <DonutChartCard
            title="Breakdown by Document Type"
            data={documentTypeData}
            subtitle="Credit Note : 20"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <DonutChartCard
            title="Service Provider Response Status"
            data={responseStatusData}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <BarChartCard
            title="Breakdown by Time Period (Last 7 Days)"
            data={timeData}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
