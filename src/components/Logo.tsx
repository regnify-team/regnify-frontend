import { Box, Typography } from '@mui/material'

interface LogoProps {
  size?: 'small' | 'medium' | 'large'
  showText?: boolean
}

export const Logo = ({ size = 'medium', showText = true }: LogoProps) => {
  const sizeMap = {
    small: 32,
    medium: 48,
    large: 64,
  }

  const iconSize = sizeMap[size]
  const fontSize =
    size === 'small' ? '1.2rem' : size === 'medium' ? '1.5rem' : '2rem'

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <Box
        sx={{
          width: iconSize,
          height: iconSize,
          borderRadius: 2,
          bgcolor: 'primary.main',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 700,
          fontSize: fontSize,
        }}
      >
        R
      </Box>
      {showText && (
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: 'text.primary' }}
        >
          Accutax
        </Typography>
      )}
    </Box>
  )
}
