import { Box, Chip, IconButton, Stack, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import {
  Visibility,
  InfoOutlined,
  Refresh,
  MoreVert,
} from '@mui/icons-material'
import { api } from '../utils/api'

interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

interface InvoiceApiItem {
  id: number
  invoiceNumber: string
  docDate: string
  proDate: string
  sender: string
  receiver: string
  status: string
  businessStatus: string
  providerResponse: string
}

interface InvoicesPageResponse {
  content?: InvoiceApiItem[]
}

interface InvoiceRow {
  id: number
  invoiceNo: string
  docDate: string
  procDate: string
  sender: string
  receiver: string
  status: string
  businessStatus: string
  providerResponse: string
}

function CustomToolbar() {
  return (
    <Box
      sx={{
        p: 1,
        borderBottom: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <GridToolbar />
      <Box sx={{ flexGrow: 1 }} />
      <IconButton size="small" sx={{ ml: 1 }}>
        <MoreVert />
      </IconButton>
      <IconButton size="small" sx={{ ml: 1 }}>
        <Refresh />
      </IconButton>
    </Box>
  )
}

export const InvoiceTable = () => {
  const mapInvoicesToRows = (invoices: InvoiceApiItem[]) =>
    invoices.map((invoice) => ({
      id: invoice.id,
      invoiceNo: invoice.invoiceNumber,
      docDate: invoice.docDate,
      procDate: invoice.proDate,
      sender: invoice.sender,
      receiver: invoice.receiver,
      status: invoice.status,
      businessStatus: invoice.businessStatus,
      providerResponse: invoice.providerResponse,
    }))

  const columns: GridColDef[] = [
    {
      field: 'invoiceNo',
      headerName: 'INVOICE #',
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <Typography variant="body2" color="primary" sx={{ fontWeight: 500 }}>
          {params.value}
        </Typography>
      ),
    },
    { field: 'docDate', headerName: 'DOC DATE', width: 100 },
    { field: 'procDate', headerName: 'PROC DATE', width: 100 },
    { field: 'sender', headerName: 'SENDER', flex: 1, minWidth: 150 },
    { field: 'receiver', headerName: 'RECEIVER', flex: 1, minWidth: 150 },
    {
      field: 'status',
      headerName: 'STATUS',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            bgcolor: 'rgba(46, 125, 50, 0.12)',
            color: 'success.main',
            fontWeight: 500,
            borderRadius: 1,
          }}
        />
      ),
    },
    { field: 'businessStatus', headerName: 'BUSINESS STATUS', width: 140 },
    {
      field: 'providerResponse',
      headerName: 'PROVIDER RESPONSE',
      width: 160,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            bgcolor: 'rgba(46, 125, 50, 0.12)',
            color: 'success.main',
            fontWeight: 500,
            borderRadius: 1,
          }}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'ACTIONS',
      width: 100,
      sortable: false,
      renderCell: () => (
        <Stack direction="row" spacing={1}>
          <IconButton size="small">
            <Visibility fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <InfoOutlined fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
  ]

  const [rows, setRows] = useState<InvoiceRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get<ApiResponse<InvoicesPageResponse>>('/invoices', {
        params: {
          page: 0,
          size: 50,
        },
      })
      .then((response) => {
        const invoices = response.data.data.content ?? []
        setRows(mapInvoicesToRows(invoices))
        setLoading(false)
      })
      .catch(() =>
        api.get<ApiResponse<InvoiceApiItem[]>>('/invoices').then((response) => {
          setRows(mapInvoicesToRows(response.data.data))
          setLoading(false)
        })
      )
      .catch((err) => {
        console.error('Failed to fetch invoices:', err)
        setLoading(false)
      })
  }, [])

  return (
    <Box
      sx={{
        height: 600,
        width: '100%',
        bgcolor: 'background.paper',
        borderRadius: 2,
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
        disableRowSelectionOnClick
        slots={{
          toolbar: CustomToolbar,
        }}
        sx={{
          border: 'none',
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: 'background.default',
            fontWeight: 600,
            color: 'text.secondary',
            fontSize: '0.75rem',
            letterSpacing: '0.05em',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid',
            borderColor: 'divider',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: 'action.hover',
          },
        }}
      />
    </Box>
  )
}
