import { Box } from '@mui/material'
import { InvoiceUploadArea } from '../components/InvoiceUploadArea'
import { InvoiceTable } from '../components/InvoiceTable'

export const UploadPage = () => {
  return (
    <Box>
      <InvoiceUploadArea />
      <Box sx={{ mt: 4 }}>
        <InvoiceTable />
      </Box>
    </Box>
  )
}
