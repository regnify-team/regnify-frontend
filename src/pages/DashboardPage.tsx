import { Box, Typography, Grid, Switch, FormControlLabel } from '@mui/material'
import { DateRangeFilter } from '../components/DateRangeFilter'
import { MetricCard } from '../components/MetricCard'
import { GlobalBusinessFootprint } from '../components/GlobalBusinessFootprint'

import { useState, useEffect } from 'react'
import axios from 'axios'

export const DashboardPage = () => {
  const [metrics, setMetrics] = useState({
    totalDocuments: '...',
    successRate: '...',
    pendingItems: '...',
    lastUpdated: '...',
  })

  useEffect(() => {
    axios
      .get('/api/dashboard')
      .then((response) => setMetrics(response.data))
      .catch((err) => console.error('Failed to fetch dashboard metrics:', err))
  }, [])

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h4" fontWeight={600}>
          Dashboard
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Last Updated: {metrics.lastUpdated}
          </Typography>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Auto-refresh"
          />
        </Box>
      </Box>

      <DateRangeFilter />

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <MetricCard
            title="Total Documents"
            value={metrics.totalDocuments}
            color="blue"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <MetricCard
            title="Success Rate"
            value={metrics.successRate}
            color="green"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <MetricCard
            title="Pending Items"
            value={metrics.pendingItems}
            color="yellow"
          />
        </Grid>
      </Grid>

      <GlobalBusinessFootprint />
    </Box>
  )
}
