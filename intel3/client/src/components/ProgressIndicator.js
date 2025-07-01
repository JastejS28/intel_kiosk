import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

function ProgressIndicator({ activeStep }) {
  const theme = useTheme();
  
  const steps = [
    { number: 1, label: 'Patient Info', icon: 'person' },
    { number: 2, label: 'Vital Signs', icon: 'favorite' },
    { number: 3, label: 'Queue Status', icon: 'people' }
  ];
  
  return (
    <Box 
      className="progress-indicator" 
      sx={{ 
        display: 'flex', 
        mb: 5, 
        mt: 3,
        p: 2,
        borderRadius: 3,
        background: 'rgba(255,255,255,0.8)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        border: '1px solid rgba(0,0,0,0.04)'
      }}
    >
      {steps.map((step) => {
        const isActive = step.number === activeStep;
        const isCompleted = step.number < activeStep;
        
        // Create gradient colors for active and completed states
        const activeGradient = `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`;
        const completedGradient = `linear-gradient(45deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.main} 100%)`;
        
        return (
          <Box 
            key={step.number} 
            className={`progress-step ${isActive || isCompleted ? 'active' : ''}`}
            sx={{ 
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 1,
              px: 2
            }}
          >
            <Box 
              className={`step-number ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: isCompleted 
                  ? completedGradient 
                  : isActive 
                    ? activeGradient 
                    : 'rgba(0,0,0,0.1)',
                color: 'white',
                fontWeight: 'bold',
                mb: 1.5,
                transition: 'all 0.3s ease',
                boxShadow: isCompleted || isActive 
                  ? '0 4px 12px rgba(0,0,0,0.15)' 
                  : 'none',
                border: '2px solid white'
              }}
            >
              {isCompleted ? (
                <span>✓</span> /* Using a checkmark symbol instead of icon */
              ) : (
                <span>{step.number}</span>
              )}
            </Box>
            <Typography 
              variant="body2" 
              sx={{ 
                color: isActive 
                  ? 'primary.dark' 
                  : isCompleted 
                    ? 'secondary.dark' 
                    : 'text.secondary',
                fontWeight: isActive ? 600 : isCompleted ? 600 : 400,
                textAlign: 'center',
                fontSize: '0.9rem'
              }}
            >
              {step.label}
            </Typography>
            {step.number !== steps.length && (
              <Box 
                sx={{
                  position: 'absolute',
                  top: 24,
                  right: '-50%',
                  width: '100%',
                  height: 3,
                  backgroundColor: isCompleted ? theme.palette.secondary.main : 'rgba(0,0,0,0.1)',
                  zIndex: -1,
                  transition: 'all 0.3s ease'
                }}
              />
            )}
          </Box>
        );
      })}
    </Box>
  );
}

export default ProgressIndicator;
