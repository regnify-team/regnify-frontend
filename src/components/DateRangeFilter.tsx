import { useState } from 'react'
import {
  Box,
  Paper,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material'
import { FilterList } from '@mui/icons-material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'

export const DateRangeFilter = () => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null)
  const [endDate, setEndDate] = useState<Dayjs | null>(null)
  const [preset, setPreset] = useState('')

  const handleApply = () => {
    console.log('Applying filter:', { startDate, endDate, preset })
  }

  const handleReset = () => {
    setStartDate(null)
    setEndDate(null)
    setPreset('')
  }

  const handleToday = () => {
    const today = dayjs()
    setStartDate(today)
    setEndDate(today)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper
        sx={{
          p: 2,
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <FilterList sx={{ color: 'text.secondary' }} />

        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          slotProps={{
            textField: { size: 'small', sx: { minWidth: 180 } },
          }}
        />

        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          slotProps={{
            textField: { size: 'small', sx: { minWidth: 180 } },
          }}
        />

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Preset Range</InputLabel>
          <Select
            value={preset}
            label="Preset Range"
            onChange={(e) => setPreset(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="today">Today</MenuItem>
            <MenuItem value="yesterday">Yesterday</MenuItem>
            <MenuItem value="last7days">Last 7 Days</MenuItem>
            <MenuItem value="last30days">Last 30 Days</MenuItem>
            <MenuItem value="thisMonth">This Month</MenuItem>
          </Select>
        </FormControl>

        <Button variant="outlined" size="small" onClick={handleToday}>
          Today
        </Button>

        <Box sx={{ flexGrow: 1 }} />

        <Button variant="contained" size="small" onClick={handleApply}>
          Apply
        </Button>

        <Button variant="outlined" size="small" onClick={handleReset}>
          Reset
        </Button>
      </Paper>
    </LocalizationProvider>
  )
}
