import { Box, Typography, Grid } from '@mui/material'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { DonutChartCard } from '../components/DonutChartCard'
import { BarChartCard } from '../components/BarChartCard'

export const AnalyticsDashboard = () => {
  const [data, setData] = useState({
    statusData: [],
    countryData: [],
    documentTypeData: [],
    responseStatusData: [],
    timeData: [],
  })

  useEffect(() => {
    axios
      .get('/api/analytics')
      .then((response) => setData(response.data))
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
