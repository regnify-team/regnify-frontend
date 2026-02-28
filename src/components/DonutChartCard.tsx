import { Card, CardContent, Typography, Box } from '@mui/material'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

interface DonutChartCardProps {
  title: string
  data: Array<{ name: string; value: number; color: string }>
  subtitle?: string
}

export const DonutChartCard = ({
  title,
  data,
  subtitle,
}: DonutChartCardProps) => {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  const renderLegend = () => {
    return (
      <Box sx={{ mt: 2 }}>
        {data.map((entry, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 1,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  bgcolor: entry.color,
                }}
              />
              <Typography variant="body2">{entry.name}</Typography>
            </Box>
            <Typography variant="body2" fontWeight={600}>
              {Math.round((entry.value / total) * 100)}%
            </Typography>
          </Box>
        ))}
      </Box>
    )
  }

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {subtitle}
          </Typography>
        )}

        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {renderLegend()}
      </CardContent>
    </Card>
  )
}
