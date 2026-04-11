import { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
} from '@mui/material'
import { Visibility, VisibilityOff, ArrowBack } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { Logo } from '../components/Logo'
import { supabase } from '../utils/supabase'

export const LoginPage = () => {
  const navigate = useNavigate()
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberUsername, setRememberUsername] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccessMsg(null)

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) {
        setError(error.message)
      } else {
        setSuccessMsg('Check your email to verify your account.')
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        setError(error.message)
      } else {
        navigate('/dashboard')
      }
    }
    setIsLoading(false)
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f0f2f5',
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 440,
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Logo size="large" showText={false} />
          </Box>

          <Typography variant="h5" align="center" fontWeight={600} gutterBottom>
            Welcome to Regnify
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            {isSignUp ? 'Create a new account' : 'Enter your credentials to sign in'}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {successMsg && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {successMsg}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              sx={{ mb: 2.5 }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {!isSignUp && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3,
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberUsername}
                      onChange={(e) => setRememberUsername(e.target.checked)}
                      size="small"
                    />
                  }
                  label={
                    <Typography variant="body2">Remember me</Typography>
                  }
                />
                <Link
                  href="#"
                  variant="body2"
                  sx={{ textDecoration: 'none', color: 'primary.main' }}
                >
                  Forgot password?
                </Link>
              </Box>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              sx={{ mb: 2, py: 1.5 }}
            >
              {isLoading ? <CircularProgress size={24} /> : isSignUp ? 'Sign up' : 'Sign in'}
            </Button>

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Typography variant="body2">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <Link
                  component="button"
                  type="button"
                  variant="body2"
                  onClick={() => {
                    setIsSignUp(!isSignUp)
                    setError(null)
                    setSuccessMsg(null)
                  }}
                  sx={{ textDecoration: 'none', color: 'primary.main', verticalAlign: 'baseline' }}
                >
                  {isSignUp ? 'Sign in' : 'Sign up'}
                </Link>
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Link
                href="#"
                variant="body2"
                onClick={(e) => {
                  e.preventDefault()
                  if (isSignUp) setIsSignUp(false)
                }}
                sx={{
                  textDecoration: 'none',
                  color: 'text.secondary',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  visibility: isSignUp ? 'visible' : 'hidden'
                }}
              >
                <ArrowBack fontSize="small" />
                Back to login
              </Link>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}
