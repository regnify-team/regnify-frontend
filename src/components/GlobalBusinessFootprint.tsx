import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
  Alert,
} from '@mui/material'

export const GlobalBusinessFootprint = () => {
  const [selectedCountry, setSelectedCountry] = React.useState('Germany')

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            Global Business Footprint
          </Typography>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <Select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <MenuItem value="Germany">Germany</MenuItem>
              <MenuItem value="France">France</MenuItem>
              <MenuItem value="UK">UK</MenuItem>
              <MenuItem value="Spain">Spain</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Map placeholder */}
        <Box
          sx={{
            width: '100%',
            height: 300,
            bgcolor: '#e8f4f8',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            backgroundImage:
              'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
          }}
        >
          <Typography variant="h6" color="text.secondary">
            Map Visualization Placeholder
          </Typography>
        </Box>

        <Alert severity="warning" sx={{ mt: 2 }}>
          <Typography variant="body2">
            <strong>Note:</strong> Data visualization represents EMEA region
            activity only
          </Typography>
        </Alert>
      </CardContent>
    </Card>
  )
}
