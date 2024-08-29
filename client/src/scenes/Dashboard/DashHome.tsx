import {
  Box,
  CircularProgress,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { ThemeSettings } from "../../app/state/theme";
import CustomPaper from "../../components/CustomPaper";
import MyPieChart from "./MyPieChart";
import MyBarChart from "./MyBarChart";
import graduated from "../../assets/DashHome/graduated.png";
import division from "../../assets/DashHome/division.png";
import department from "../../assets/DashHome/department.png";
import degree from "../../assets/DashHome/degrees.png";
import observatory from "../../assets/DashHome/observatory.png";
import roommate from "../../assets/DashHome/roommate.png";
import { useGetAllDashDataQuery } from "./DashHomeApiSlice";

const DashHome = () => {
  const theme = useTheme<ThemeSettings>();
  const { data: dashData, isLoading } = useGetAllDashDataQuery(""); // Add isLoading

  // Destructure the dashData object with default values
  const {
    studentData: { maleCount, femaleCount } = { maleCount: 0, femaleCount: 0 },
    employeeCount = 0,
    userCount = 0,
    departmentCount = 0,
    programCount = 0,
    reserachCenterCount = 0,
    HostelRoomCount = 0,
  } = dashData || {}; // Handle undefined case

  // Render a loading spinner while fetching data
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <CustomPaper
            title={"Student"}
            count={maleCount + femaleCount}
            IconImage={<img src={graduated} width={60} height={60} />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CustomPaper
            title={"Employee"}
            count={employeeCount}
            IconImage={<img src={division} width={60} height={60} />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CustomPaper
            title={"Department"}
            count={departmentCount}
            IconImage={<img src={department} width={60} height={60} />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CustomPaper
            title={"Program"}
            count={programCount}
            IconImage={<img src={degree} width={60} height={60} />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CustomPaper
            title={"Research Center"}
            count={reserachCenterCount}
            IconImage={<img src={observatory} width={60} height={60} />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CustomPaper
            title={"Hostel Rooms"}
            count={HostelRoomCount}
            IconImage={<img src={roommate} width={60} height={60} />}
          />
        </Grid>
        <Grid item xs={12} md={8} lg={6}>
          <Paper
            elevation={4}
            sx={{
              p: 1,
              height: 300,
              backgroundColor: theme.palette.background.alt,
            }}
          >
            <Typography gutterBottom color={"secondary"} variant="h4">
              Student Data
            </Typography>
            <MyPieChart malecount={maleCount} femalecount={femaleCount} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={6}>
          <Paper
            elevation={4}
            sx={{
              p: 2,
              height: 240,
              backgroundColor: theme.palette.background.alt,
            }}
          >
            <MyBarChart />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashHome;
