import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material'
import { useState } from 'react'

export const InvoiceUploadArea = () => {
  const [country, setCountry] = useState('')

  const handleCountryChange = (event: SelectChangeEvent) => {
    setCountry(event.target.value as string)
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight={600} sx={{ mb: 3 }}>
        Upload Invoice
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: 4,
          textAlign: 'center',
          mb: 4,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box
          sx={{
            p: 6,
            mb: 4,
            border: '2px dashed',
            borderColor: 'divider',
            borderRadius: 2,
            bgcolor: 'background.default',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 300,
            cursor: 'pointer',
            '&:hover': {
              borderColor: 'primary.main',
              bgcolor: 'action.hover',
            },
          }}
        >
          <CloudUploadIcon
            sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }}
          />
          <Typography variant="h6" gutterBottom>
            Drag and drop your file here
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            or
          </Typography>
          <Typography
            variant="caption"
            display="block"
            color="text.secondary"
            sx={{ mt: 4 }}
          >
            Maximum file size: 150 MB
          </Typography>
          <Typography variant="caption" display="block" color="text.secondary">
            Accepted formats: XML, xml | Excel (xls, xlsx) | JSON (json) | UBL
            (ubl)
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
          <Box sx={{ flex: 1, textAlign: 'left' }}>
            <InputLabel shrink sx={{ mb: 1, fontWeight: 500 }}>
              Invoice Name (Optional)
            </InputLabel>
            <TextField
              fullWidth
              placeholder="Enter invoice name"
              variant="outlined"
              size="small"
            />
          </Box>
          <Box sx={{ flex: 1, textAlign: 'left' }}>
            <InputLabel shrink sx={{ mb: 1, fontWeight: 500 }}>
              Country (Optional)
            </InputLabel>
            <FormControl fullWidth size="small">
              <Select
                value={country}
                onChange={handleCountryChange}
                displayEmpty
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return (
                      <Typography color="text.secondary">
                        Select country
                      </Typography>
                    )
                  }
                  return selected
                }}
              >
                <MenuItem value="USA">USA</MenuItem>
                <MenuItem value="Germany">Germany</MenuItem>
                <MenuItem value="India">India</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Button
          variant="contained"
          fullWidth
          size="large"
          sx={{ py: 1.5, textTransform: 'none', fontSize: '1rem' }}
        >
          Validate
        </Button>
      </Paper>
    </Box>
  )
}
