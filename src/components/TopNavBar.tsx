import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Link,
  Select,
  FormControl,
} from '@mui/material'
import { Help as HelpIcon, AccountCircle, Language } from '@mui/icons-material'
import { useState } from 'react'
import { Logo } from './Logo'

export const TopNavBar = () => {
  const [helpAnchor, setHelpAnchor] = useState<null | HTMLElement>(null)
  const [accountAnchor, setAccountAnchor] = useState<null | HTMLElement>(null)
  const [language, setLanguage] = useState('EN')

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: 'white',
        color: 'text.primary',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
    >
      <Toolbar>
        <Logo size="small" showText={true} />

        <Box sx={{ flexGrow: 1, ml: 4, display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Viewing | All Countries
          </Typography>
          <Link
            href="#"
            sx={{
              ml: 1,
              fontSize: '0.875rem',
              textDecoration: 'none',
              color: 'primary.main',
            }}
          >
            Change
          </Link>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FormControl size="small" sx={{ minWidth: 60 }}>
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              sx={{
                '& .MuiOutline-notchedOutline': { border: 'none' },
                '& .MuiSelect-select': { py: 0.5 },
              }}
              startAdornment={<Language fontSize="small" sx={{ mr: 0.5 }} />}
            >
              <MenuItem value="EN">EN</MenuItem>
              <MenuItem value="ES">ES</MenuItem>
              <MenuItem value="FR">FR</MenuItem>
              <MenuItem value="DE">DE</MenuItem>
            </Select>
          </FormControl>

          <IconButton
            onClick={(e) => setHelpAnchor(e.currentTarget)}
            sx={{ color: 'text.primary' }}
          >
            <HelpIcon />
          </IconButton>
          <Menu
            anchorEl={helpAnchor}
            open={Boolean(helpAnchor)}
            onClose={() => setHelpAnchor(null)}
          >
            <MenuItem onClick={() => setHelpAnchor(null)}>
              Documentation
            </MenuItem>
            <MenuItem onClick={() => setHelpAnchor(null)}>Support</MenuItem>
            <MenuItem onClick={() => setHelpAnchor(null)}>About</MenuItem>
          </Menu>

          <IconButton
            onClick={(e) => setAccountAnchor(e.currentTarget)}
            sx={{ color: 'text.primary' }}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={accountAnchor}
            open={Boolean(accountAnchor)}
            onClose={() => setAccountAnchor(null)}
          >
            <MenuItem onClick={() => setAccountAnchor(null)}>Profile</MenuItem>
            <MenuItem onClick={() => setAccountAnchor(null)}>Settings</MenuItem>
            <MenuItem onClick={() => setAccountAnchor(null)}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
