import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
      light: '#8b9cf7',
      dark: '#4c63d2',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#764ba2',
      light: '#9575cd',
      dark: '#5e35b1',
      contrastText: '#ffffff'
    },
    background: {
      default: '#f8fafc',
      paper: 'rgba(255, 255, 255, 0.8)'
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b'
    },
    grey: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a'
    },
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669'
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706'
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626'
    },
    info: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb'
    }
  },
  typography: {
    fontFamily: '"Inter", "Space Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 800,
      fontSize: '3.5rem',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      '@media (max-width:768px)': {
        fontSize: '2.5rem'
      }
    },
    h2: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 700,
      fontSize: '2.75rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
      '@media (max-width:768px)': {
        fontSize: '2rem'
      }
    },
    h3: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
      '@media (max-width:768px)': {
        fontSize: '1.5rem'
      }
    },
    h4: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4
    },
    h5: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.5
    },
    h6: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.5
    },
    body1: {
      fontFamily: '"Inter", sans-serif',
      fontSize: '1rem',
      lineHeight: 1.7,
      fontWeight: 400
    },
    body2: {
      fontFamily: '"Inter", sans-serif',
      fontSize: '0.875rem',
      lineHeight: 1.6,
      fontWeight: 400
    },
    button: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.01em'
    },
    caption: {
      fontFamily: '"Inter", sans-serif',
      fontSize: '0.75rem',
      lineHeight: 1.5,
      fontWeight: 500
    }
  },
  shape: {
    borderRadius: 16
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '12px 24px',
          fontSize: '1rem',
          fontWeight: 600,
          boxShadow: 'none',
          textTransform: 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
          }
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)'
          }
        },
        containedSecondary: {
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #ec4899 0%, #ef4444 100%)'
          }
        },
        outlined: {
          borderWidth: '2px',
          borderColor: 'rgba(102, 126, 234, 0.3)',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(12px)',
          '&:hover': {
            borderWidth: '2px',
            borderColor: '#667eea',
            background: 'rgba(255, 255, 255, 0.95)'
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 16px 64px rgba(0, 0, 0, 0.15)',
            borderColor: 'rgba(102, 126, 234, 0.2)'
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)'
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(8px)',
            borderRadius: 12,
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.9)'
            },
            '&.Mui-focused': {
              background: 'rgba(255, 255, 255, 0.95)',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#667eea',
                borderWidth: '2px'
              }
            }
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          fontWeight: 500
        }
      }
    }
  }
});

export default theme;