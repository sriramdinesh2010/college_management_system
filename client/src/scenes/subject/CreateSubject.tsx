import {
  Box,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useTheme,
} from "@mui/material";
import { ThemeSettings } from "../../app/state/theme";
import Header from "../../components/Header";

const CreateSubject = () => {
  const theme = useTheme<ThemeSettings>();
  return (
    <Box
      sx={{
        p: 5,
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.background.alt,
      }}
    >
      <Header title={"Create Subject"} subtitle={"Add new subject here"} />
      <form>
        <Grid container spacing={3}>
          <Grid item xs={6} md={4} lg={4} xl={3}>
            <InputLabel id="demo-simple-select-label" sx={{ mb: 1 }}>
              Program
            </InputLabel>
            <Select fullWidth name="program" defaultValue="">
              <MenuItem value={"UG"}>UG</MenuItem>
              <MenuItem value={"PG"}>PG</MenuItem>
              <MenuItem value={"PhD"}>PhD</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6} md={4} lg={4} xl={3}>
            <InputLabel sx={{ mb: 1 }}>Course</InputLabel>
            <Select fullWidth name="course" defaultValue="">
              <MenuItem value={"B.Sc"}>B.Sc</MenuItem>
              <MenuItem value={"M.Sc"}>M.Sc</MenuItem>
              <MenuItem value={"B.A"}>B.A</MenuItem>
              <MenuItem value={"M.A"}>M.A</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6} md={4} lg={4} xl={3}>
            <InputLabel sx={{ mb: 1 }}>Course Name</InputLabel>
            <Select fullWidth name="course" defaultValue="">
              <MenuItem value={"Tamil"}>Tamil</MenuItem>
              <MenuItem value={"Commerce"}>Commerce</MenuItem>
              <MenuItem value={"English"}>English</MenuItem>
              <MenuItem value={"Physics"}>Physics</MenuItem>
              <MenuItem value={"Mathematics"}>Mathematics</MenuItem>
              <MenuItem value={"Computer Science"}>Computer Science</MenuItem>
              <MenuItem value={"Information technology"}>
                Information technology
              </MenuItem>
              <MenuItem value={"Chemistry"}>Chemistry</MenuItem>
              <MenuItem value={"Botany"}>Botany</MenuItem>
              <MenuItem value={"Zoology"}>Zoology</MenuItem>
              <MenuItem value={"Micro biology"}>Micro biology</MenuItem>
              <MenuItem value={"Bio Teach"}>Bio Teach</MenuItem>
              <MenuItem value={"Business administration"}>
                Business administration
              </MenuItem>
              <MenuItem value={"Physical Education"}>
                Physical Education
              </MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6} md={4} lg={4} xl={3}>
            <InputLabel sx={{ mb: 1 }}>Department</InputLabel>
            <Select fullWidth name="department" defaultValue="">
              <MenuItem value={"Tamil"}>Tamil</MenuItem>
              <MenuItem value={"Commerce"}>Commerce</MenuItem>
              <MenuItem value={"English"}>English</MenuItem>
              <MenuItem value={"Physics"}>Physics</MenuItem>
              <MenuItem value={"Mathematics"}>Mathematics</MenuItem>
              <MenuItem value={"Computer Science"}>Computer Science</MenuItem>
              <MenuItem value={"Information technology"}>
                Information technology
              </MenuItem>
              <MenuItem value={"Chemistry"}>Chemistry</MenuItem>
              <MenuItem value={"Botany"}>Botany</MenuItem>
              <MenuItem value={"Zoology"}>Zoology</MenuItem>
              <MenuItem value={"Micro biology"}>Micro biology</MenuItem>
              <MenuItem value={"Bio Teach"}>Bio Teach</MenuItem>
              <MenuItem value={"Business administration"}>
                Business administration
              </MenuItem>
              <MenuItem value={"Physical Education"}>
                Physical Education
              </MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6} md={4} lg={4} xl={3}>
            <InputLabel sx={{ mb: 1 }}>part</InputLabel>
            <Select fullWidth name="part" defaultValue="">
              <MenuItem value={"Core"}>Core</MenuItem>
              <MenuItem value={"Core Lab"}>Core Lab</MenuItem>
              <MenuItem value={"Elective"}>Elective</MenuItem>
              <MenuItem value={"SLC"}>SLC</MenuItem>
              <MenuItem value={"NME"}>NME</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6} md={4} lg={4} xl={3}>
            <InputLabel sx={{ mb: 1 }}>Year</InputLabel>
            <Select fullWidth name="year" defaultValue="">
              <MenuItem value={"I Year"}>I Year</MenuItem>
              <MenuItem value={"II Year"}>II Year</MenuItem>
              <MenuItem value={"III Year"}>III Year</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6} md={4} lg={4} xl={3}>
            <InputLabel sx={{ mb: 1 }}>Semester</InputLabel>
            <Select fullWidth name="semester" defaultValue="">
              <MenuItem value={"I Semester"}>I Semester </MenuItem>
              <MenuItem value={"II Semester"}>II Semester</MenuItem>
              <MenuItem value={"III Semester"}>III Semester</MenuItem>Semester
              <MenuItem value={"IV Semester"}>IV Semester</MenuItem>
              <MenuItem value={"V Semester"}>V Semester</MenuItem>
              <MenuItem value={"VI Semester"}>VISemester </MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6} md={4} lg={4} xl={3}>
            <InputLabel sx={{ mb: 1 }}>Subject Code</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              type="number"
              name="subjectcode"
              component="label"
            />
          </Grid>
          <Grid item xs={6} md={4} lg={4} xl={3}>
            <InputLabel sx={{ mb: 1 }}>Subject Name</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              type="text"
              name="subjectname"
              component="label"
            />
          </Grid>
          <Grid item xs={6} md={4} lg={4} xl={3}>
            <InputLabel sx={{ mb: 1 }}>Hours</InputLabel>
            <Select fullWidth name="hours" defaultValue="">
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={3}>3</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CreateSubject;
