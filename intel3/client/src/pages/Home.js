import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Container, Grid, Card, CardContent, CardMedia } from '@mui/material';
import Header from '../components/Header';

function Home() {
  const navigate = useNavigate();
  
  const handleStartCheckIn = () => {
    // Clear any existing session data when starting new check-in
    sessionStorage.removeItem('patientInfo');
    sessionStorage.removeItem('completePatientData');
    sessionStorage.removeItem('patientSubmitted');
    navigate('/patient-info');
  };
  
  return (
    <Box 
      className="page-container" 
      sx={{
        background: 'linear-gradient(180deg, rgba(242,248,255,1) 0%, rgba(248,250,252,1) 100%)',
        minHeight: '100vh',
        backgroundImage: 'url("/medical-pattern-light.png")',
        backgroundSize: '600px',
        backgroundAttachment: 'fixed',
        backgroundBlendMode: 'overlay',
      }}
    >
      <Header />
      
      <Container className="content">
        <Box 
          sx={{ 
            textAlign: 'center', 
            my: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box 
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              mb: 2,
            }}
          >
            <Box 
              sx={{
                width: 90,
                height: 90,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #bbdefb 0%, #e3f2fd 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(25, 118, 210, 0.2)',
                mb: 2,
              }}
            >
              <Box 
                component="img" 
                src="/medical-cross.svg" 
                alt="Medical Logo"
                sx={{ 
                  width: 50, 
                  height: 50,
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))'
                }}
              />
            </Box>
          </Box>
          
          <Typography 
            variant="h3" 
            component="h1" 
            fontWeight={700} 
            gutterBottom
            sx={{ 
              background: 'linear-gradient(45deg, #1565c0 30%, #42a5f5 90%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              mb: 2,
              letterSpacing: '0.5px'
            }}
          >
            Welcome to HealthCare Kiosk
          </Typography>
          
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ 
              mb: 5, 
              maxWidth: 650, 
              fontSize: '1.1rem',
              lineHeight: 1.6
            }}
          >
            Our intelligent patient queue management system helps optimize your healthcare experience with smart prioritization and minimal wait times.
          </Typography>
          
          <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            onClick={handleStartCheckIn}
            sx={{ 
              fontSize: '1.2rem', 
              px: 5, 
              py: 1.8, 
              mb: 8,
              borderRadius: 30,
              boxShadow: '0 8px 24px rgba(25, 118, 210, 0.3)',
              '&:hover': {
                boxShadow: '0 12px 28px rgba(25, 118, 210, 0.4)',
                transform: 'translateY(-3px)'
              },
            }}
          >
            Start Patient Check-in
          </Button>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card 
                className="feature-card" 
                elevation={0}
                sx={{ 
                  background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                  borderTop: '4px solid #1976d2',
                  height: '100%'
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      boxShadow: '0 8px 16px rgba(25, 118, 210, 0.15)',
                    }}
                  >
                    <Box
                      component="img"
                      src="/quick-registration.svg"
                      alt="Quick Registration"
                      sx={{ width: 46, height: 46 }}
                    />
                  </Box>
                  <Typography 
                    variant="h6" 
                    component="h2" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 600,
                      color: '#1565c0',
                      mb: 1.5
                    }}
                  >
                    Quick Registration
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ 
                      lineHeight: 1.6,
                      fontSize: '0.95rem'
                    }}
                  >
                    Fast and easy patient registration with minimal information required for a streamlined check-in experience
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card 
                className="feature-card" 
                elevation={0}
                sx={{ 
                  background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                  borderTop: '4px solid #4caf50',
                  height: '100%'
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      boxShadow: '0 8px 16px rgba(76, 175, 80, 0.15)',
                    }}
                  >
                    <Box
                      component="img"
                      src="/vital-signs.svg"
                      alt="Vital Signs Monitoring"
                      sx={{ width: 46, height: 46 }}
                    />
                  </Box>
                  <Typography 
                    variant="h6" 
                    component="h2" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 600,
                      color: '#2e7d32',
                      mb: 1.5
                    }}
                  >
                    Vital Signs Monitoring
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ 
                      lineHeight: 1.6,
                      fontSize: '0.95rem'
                    }}
                  >
                    Accurately measure and record vital signs for comprehensive patient assessment and proper care prioritization
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card 
                className="feature-card" 
                elevation={0}
                sx={{ 
                  background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                  borderTop: '4px solid #f57c00',
                  height: '100%'
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      boxShadow: '0 8px 16px rgba(245, 124, 0, 0.15)',
                    }}
                  >
                    <Box
                      component="img"
                      src="/intelligent-queue.svg"
                      alt="Intelligent Queue"
                      sx={{ width: 46, height: 46 }}
                    />
                  </Box>
                  <Typography 
                    variant="h6" 
                    component="h2" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 600,
                      color: '#e65100',
                      mb: 1.5
                    }}
                  >
                    Intelligent Queue
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ 
                      lineHeight: 1.6,
                      fontSize: '0.95rem'
                    }}
                  >
                    Smart prioritization system that ensures patients with urgent needs are seen promptly while optimizing wait times
                  </Typography>
                  <Typography variant="h6" component="h2" gutterBottom>
                    Intelligent Queue
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    AI powered queue management based on health risk priority
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 6, p: 3, bgcolor: '#f5f9ff', borderRadius: 2, maxWidth: 800 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              About This System
            </Typography>
            <Typography variant="body2" color="text.secondary">
              The Healthcare Kiosk is an interactive device designed to streamline patient intake and queue management in hospitals and Ayushman Arogya Mandirs. It
              uses advanced Intel technology and machine learning algorithms to prioritize patients based on their vital signs and medical urgency.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              By collecting vital signs such as blood pressure, heart rate, temperature, and oxygen saturation, the system can intelligently assign priority scores to
              patients, ensuring that those with more critical needs are seen first, while optimizing overall wait times.
            </Typography>
          </Box>
          
          <Typography variant="caption" color="text.secondary" sx={{ mt: 4 }}>
            © 2025 Healthcare Kiosk System | Powered by Intel Technology
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Home;
