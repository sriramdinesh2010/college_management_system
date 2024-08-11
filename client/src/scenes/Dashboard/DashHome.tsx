import { Box, Grid, Paper, Typography, useTheme } from "@mui/material";
import { ThemeSettings } from "../../app/state/theme";

const DashHome = () => {
  const theme = useTheme<ThemeSettings>();
  return (
    <Box m="1.5rem 2.5rem">
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={6}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
              backgroundColor: theme.palette.background.alt,
            }}
          ></Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={6}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          ></Paper>
        </Grid>
        <Grid item xs={12} md={8} lg={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 100,
            }}
            className="glass_effect"
          >
            <Typography align="center" gutterBottom>
              Total No.of Student
            </Typography>
            <Typography align="center" variant="h4">
              1500+
            </Typography>
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 100,
            }}
          >
            <Typography align="center" gutterBottom>
              Total No.of Staff
            </Typography>
            <Typography align="center" variant="h4">
              150+
            </Typography>
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12} md={4} lg={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 100,
              backgroundColor: { color: theme.palette.secondary[300] },
            }}
          >
            <Typography align="center" gutterBottom>
              Total no of Department
            </Typography>
            <Typography align="center" variant="h4">
              16
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 100,
            }}
          >
            <Typography align="center" gutterBottom>
              Total no of Program
            </Typography>
            <Typography align="center" variant="h4">
              35
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 100,
            }}
          >
            <Typography align="center" gutterBottom>
              Total no of Reserach Center
            </Typography>
            <Typography align="center" variant="h4">
              5
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 100,
            }}
          >
            <Typography align="center" gutterBottom>
              Total no of Hostel Rooms
            </Typography>
            <Typography align="center" variant="h4">
              100+
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashHome;
