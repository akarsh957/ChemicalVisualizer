import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Box
} from '@mui/material';

Chart.register(...registerables);

function StatCard({ title, value }) {
  return (
    <Card elevation={3}>
      <CardContent>
        <Typography color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" component="div">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

function Dashboard({ data }) {
  const chartData = {
    labels: Object.keys(data.type_distribution),
    datasets: [
      {
        label: '# of Equipment',
        data: Object.values(data.type_distribution),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };
  const chartOptions = { scales: { y: { beginAtZero: true } } };
  const rawDataHeaders = data.raw_data.length > 0 ? Object.keys(data.raw_data[0]) : [];

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Analysis for: {data.file_info.name}
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Equipment" value={data.file_info.total_count} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Avg. Flowrate" value={data.summary_stats.avg_flowrate} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Avg. Pressure" value={data.summary_stats.avg_pressure} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Avg. Temperature" value={data.summary_stats.avg_temperature} />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Equipment Type Distribution
            </Typography>
            <Bar data={chartData} options={chartOptions} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 2, height: '400px', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>
              Raw Data
            </Typography>
            <TableContainer sx={{ flexGrow: 1, overflowY: 'auto' }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {rawDataHeaders.map(key => <TableCell key={key}><b>{key}</b></TableCell>)}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.raw_data.map((row, index) => (
                    <TableRow key={index} hover>
                      {Object.values(row).map((val, i) => <TableCell key={i}>{val}</TableCell>)}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;