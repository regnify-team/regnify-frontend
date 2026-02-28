import { Card, CardContent, Typography } from '@mui/material'

interface MetricCardProps {
  title: string
  value: string | number
  color: 'blue' | 'green' | 'yellow'
}

export const MetricCard = ({ title, value, color }: MetricCardProps) => {
  const colorMap = {
    blue: {
      bg: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
      text: '#fff',
    },
    green: {
      bg: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
      text: '#fff',
    },
    yellow: {
      bg: 'linear-gradient(135deg, #FFA726 0%, #F57C00 100%)',
      text: '#fff',
    },
  }

  const colors = colorMap[color]

  return (
    <Card
      sx={{
        background: colors.bg,
        color: colors.text,
        height: '100%',
        minHeight: 140,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
          {title}
        </Typography>
        <Typography variant="h3" fontWeight={700}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  )
}
