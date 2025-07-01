import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

function Header({ title, subtitle }) {
  const theme = useTheme();
  
  return (
    <Box 
      className="header" 
      sx={{ 
        textAlign: 'center', 
        width: '100%', 
        background: `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("/medical-pattern.png")',
          backgroundSize: '400px',
          opacity: 0.08,
          zIndex: 0,
        }
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
          py: 2,
        }}
      >
        <Box 
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 0.5
          }}
        >
          <Box 
            component="img" 
            src="/medical-icon.svg" 
            alt="Medical Icon" 
            sx={{ 
              width: 46, 
              height: 46, 
              mr: 1.5,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
            }} 
          />
          <Typography 
            variant="h4" 
            component="h1" 
            fontWeight={700}
            sx={{ 
              letterSpacing: '0.5px',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            HealthCare Kiosk
          </Typography>
        </Box>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            opacity: 0.9,
            fontWeight: 500,
            letterSpacing: '0.4px',
            textShadow: '0 1px 2px rgba(0,0,0,0.1)'
          }}
        >
          Intelligent Patient Priority System
        </Typography>
      </Box>
    </Box>
  );
}

export default Header;
