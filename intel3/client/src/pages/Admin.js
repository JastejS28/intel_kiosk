import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Container,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Chip,
  Snackbar,
  Alert
} from '@mui/material';
import config from '../config';
import Header from '../components/Header';

function AdminDashboard() {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCalling, setIsCalling] = useState(false);
  const [error, setError] = useState(null);
  const [callSuccess, setCallSuccess] = useState(false);
  const [calledPatient, setCalledPatient] = useState(null);

  const fetchQueue = useCallback(async () => {
    setError(null);
    try {
      const response = await axios.get(`${config.apiUrl}/patients`);
      setQueue(response.data || []);
    } catch (err) {
      setError('Failed to fetch queue data. Please ensure the server is running.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQueue();
    const intervalId = setInterval(fetchQueue, 20000);
    return () => clearInterval(intervalId);
  }, [fetchQueue]);

  const callNextPatient = async () => {
    setIsCalling(true);
    setError(null);
    try {
      const response = await axios.post(`${config.apiUrl}/queue/next`);
      setCalledPatient(response.data.calledPatient);
      setCallSuccess(true);
      await fetchQueue();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to call next patient.');
    } finally {
      setIsCalling(false);
    }
  };

  const getPriorityInfo = (patient) => {
    const score = patient.priority_score || 0;
    if (score > 20) {
      return { level: 'High', color: '#d32f2f' };
    }
    return { level: 'Low', color: '#6CC24A' };
  };

  // Add this function before getPriorityInfo
  const getAbnormalVitals = (patient) => {
    const vitals = [];
    if (!patient) return vitals;

    if (patient.Heart_Rate && (patient.Heart_Rate < 60 || patient.Heart_Rate > 100)) {
      vitals.push(`Heart Rate: ${patient.Heart_Rate} BPM`);
    }
    if (patient.Systolic_Blood_Pressure && (patient.Systolic_Blood_Pressure < 90 || patient.Systolic_Blood_Pressure > 120)) {
      vitals.push(`Systolic BP: ${patient.Systolic_Blood_Pressure} mmHg`);
    }
    if (patient.Diastolic_Blood_Pressure && (patient.Diastolic_Blood_Pressure < 60 || patient.Diastolic_Blood_Pressure > 80)) {
      vitals.push(`Diastolic BP: ${patient.Diastolic_Blood_Pressure} mmHg`);
    }
    if (patient.Body_Temperature && (patient.Body_Temperature < 36.1 || patient.Body_Temperature > 37.2)) {
      vitals.push(`Temp: ${patient.Body_Temperature}°C`);
    }
    if (patient.Oxygen_Saturation && patient.Oxygen_Saturation < 95) {
      vitals.push(`O2 Sat: ${patient.Oxygen_Saturation}%`);
    }
    if (patient.Respiratory_Rate && (patient.Respiratory_Rate < 12 || patient.Respiratory_Rate > 20)) {
      vitals.push(`Resp. Rate: ${patient.Respiratory_Rate}`);
    }
    return vitals;
  };

  const highPriorityCount = queue.filter(p => (p.priority_score || 0) > 20).length;
  const lowPriorityCount = queue.filter(p => (p.priority_score || 0) <= 20).length;

  return (
    <Box
      className="page-container"
      sx={{
        background: 'linear-gradient(180deg, rgba(242,248,255,1) 0%, rgba(248,250,252,1) 100%)',
        minHeight: '100vh'
      }}
    >
      <Header />

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} className="content">
        <Paper
          sx={{
            p: 4,
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
          }}
        >
          <Typography variant="h4" align="center" gutterBottom fontWeight="600" color="primary.dark">
            Administrator Dashboard
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          <Box sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
            <Typography variant="h6">Current Queue Status</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 2 }}>
              <Box>
                <Typography>High Priority:</Typography>
                <Typography variant="h5" color="#d32f2f" fontWeight="bold">
                  {highPriorityCount}
                </Typography>
              </Box>
              <Box>
                <Typography>Low Priority:</Typography>
                <Typography variant="h5" color="#6CC24A" fontWeight="bold">
                  {lowPriorityCount}
                </Typography>
              </Box>
              <Box>
                <Typography>Total Patients:</Typography>
                <Typography variant="h5" fontWeight="bold">
                  {queue.length}
                </Typography>
              </Box>
            </Box>
          </Box>

          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead sx={{ bgcolor: '#0078D4' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Position</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Patient Name</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Priority</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Abnormal Vitals</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Wait Time</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Check-in Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading && queue.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : queue.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                      The queue is currently empty.
                    </TableCell>
                  </TableRow>
                ) : (
                  queue.map((patient) => {
                    const { level, color } = getPriorityInfo(patient);
                    const abnormalVitals = getAbnormalVitals(patient);
                    
                    return (
                      <TableRow key={patient.patient_id} hover>
                        <TableCell>{patient.queue_position}</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>{patient.name || 'Processing...'}</TableCell>
                        <TableCell>
                          <Chip label={level} size="small" sx={{ bgcolor: color, color: 'white' }} />
                        </TableCell>
                        <TableCell>
                          {abnormalVitals.length > 0 ? (
                            <Box>
                              {abnormalVitals.map((vital, idx) => (
                                <Typography key={idx} variant="caption" display="block" color="error">
                                  • {vital}
                                </Typography>
                              ))}
                            </Box>
                          ) : (
                            <Typography variant="caption" color="text.secondary">None</Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          {typeof patient.estimated_wait_time === 'number'
                            ? `${patient.estimated_wait_time} min`
                            : '...'}
                        </TableCell>
                        <TableCell>
                          {new Date(patient.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button variant="outlined" color="primary" onClick={fetchQueue} disabled={loading}>
              Refresh
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={callNextPatient}
              disabled={isCalling || queue.length === 0}
              startIcon={isCalling ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {isCalling ? 'Calling...' : 'Call Next Patient'}
            </Button>
          </Box>
        </Paper>

        <Snackbar
          open={callSuccess}
          autoHideDuration={6000}
          onClose={() => setCallSuccess(false)}
          message={`Successfully called patient: ${calledPatient?.name || calledPatient?.patient_id || ''}`}
        />
      </Container>
    </Box>
  );
}

export default AdminDashboard;