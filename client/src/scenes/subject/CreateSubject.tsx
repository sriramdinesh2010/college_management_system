import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { ThemeSettings } from "../../app/state/theme";
import Header from "../../components/Header";
import z from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddNewSubjectMutation } from "./SubjectApiSlice";
import { toast, ToastContainer } from "react-toastify";

const schema = z.object({
  program: z.string().nonempty({ message: "Choose a Program" }),
  course: z.string().nonempty({ message: "Choose a Course" }),
  coursename: z.string().nonempty({ message: "Choose a Course Name" }),
  department: z.string().nonempty({ message: "Select a Department" }),
  part: z.string().nonempty({ message: "Select a Part of Paper" }),
  year: z.string().nonempty({ message: "Choose a Year" }),
  semester: z.string().nonempty({ message: "Choose a Semester" }),
  subjectcode: z.string().min(8, { message: "Enter a Subject Code" }),
  subjectname: z.string().nonempty({ message: "Enter a Sunject Name" }),
  hour: z.string().nonempty({ message: "Choose Hour Of a Paper" }),
  courseincharge: z
    .string()
    .nonempty({ message: "Select Inchage Of the Course" }),
});
type FormData = z.infer<typeof schema>;

const CreateSubject = () => {
  const theme = useTheme<ThemeSettings>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [addNewSubject] = useAddNewSubjectMutation();

  const onSubmit = async (data: FieldValues) => {
    // const formData = new FormData();

    // formData.append("program", data.program);
    // formData.append("course", data.course);
    // formData.append("coursename", data.coursename);
    // formData.append("department", data.department);
    // formData.append("part", data.part);
    // formData.append("year", data.year);
    // formData.append("semester", data.semester);
    // formData.append("subjectcode", data.subjectcode);
    // formData.append("subjectname", data.subjectname);
    // formData.append("hour", data.hour);
    // formData.append("courseincharge", data.courseincharge);

    const subjectdata = {
      program: data.program,
      course: data.course,
      coursename: data.coursename,
      department: data.department,
      part: data.part,
      year: data.year,
      semester: data.semester,
      subjectcode: data.subjectcode,
      subjectname: data.subjectname,
      hour: data.hour,
      courseincharge: data.courseincharge,
    };
    const result = await addNewSubject(subjectdata).unwrap();
    try {
      toast.success(result.message, { theme: "dark" });
      reset();
    } catch (error) {
      toast.error(result.data.message, { theme: "dark" });
      reset();
    }
  };
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={6} md={4} lg={4} xl={3}>
            <InputLabel
              id="demo-simple-select-label"
              sx={{ mb: 1 }}
              error={!!errors.program}
            >
              Program
            </InputLabel>
            <Select
              fullWidth
              {...register("program")}
              error={!!errors.program}
              name="program"
              defaultValue=""
            >
              <MenuItem value={"UG"}>UG</MenuItem>
              <MenuItem value={"PG"}>PG</MenuItem>
              <MenuItem value={"PhD"}>PhD</MenuItem>
            </Select>
            {errors.program && (
              <Typography color="error">{errors.program.message}</Typography>
            )}
          </Grid>
          <Grid item xs={6} md={4} lg={4} xl={3}>
            <InputLabel sx={{ mb: 1 }} error={!!errors.course}>
              Course
            </InputLabel>
            <Select
              fullWidth
              {...register("course")}
              error={!!errors.course}
              name="course"
              defaultValue=""
            >
              <MenuItem value={"B.Sc"}>B.Sc</MenuItem>
              <MenuItem value={"M.Sc"}>M.Sc</MenuItem>
              <MenuItem value={"B.A"}>B.A</MenuItem>
              <MenuItem value={"M.A"}>M.A</MenuItem>
            </Select>
            {errors.course && (
              <Typography color="error">{errors.course.message}</Typography>
            )}
          </Grid>
          <Grid item xs={6} md={4} lg={4} xl={3}>
            <InputLabel sx={{ mb: 1 }} error={!!errors.coursename}>
              Course Name
            </InputLabel>
            <Select
              fullWidth
              {...register("coursename")}
              error={!!errors.coursename}
              name="coursename"
              defaultValue=""
            >
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
            {errors.coursename && (
              <Typography color="error">{errors.coursename.message}</Typography>
            )}
          </Grid>
          <Grid item xs={6} md={4} lg={4} xl={3}>
            <InputLabel sx={{ mb: 1 }} error={!!errors.department}>
              Department
            </InputLabel>
            <Select
              fullWidth
              {...register("department")}
              error={!!errors.department}
              name="department"
              defaultValue=""
            >
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
            {errors.department && (
              <Typography color="error">{errors.department.message}</Typography>
            )}
          </Grid>
          <Grid item xs={6} md={4} lg={4} xl={3}>
            <InputLabel sx={{ mb: 1 }} error={!!errors.part}>
              part
            </InputLabel>
            <Select
              fullWidth
              {...register("part")}
              error={!!errors.part}
              name="part"
              defaultValue=""
            >
              <MenuItem value={"Core"}>Core</MenuItem>
              <MenuItem value={"Core Lab"}>Core Lab</MenuItem>
              <MenuItem value={"Elective"}>Elective</MenuItem>
              <MenuItem value={"SLC"}>SLC</MenuItem>
              <MenuItem value={"NME"}>NME</MenuItem>
            </Select>
            {errors.part && (
              <Typography color="error">{errors.part.message}</Typography>
            )}
          </Grid>
          <Grid item xs={6} md={4} lg={4} xl={3}>
            <InputLabel sx={{ mb: 1 }} error={!!errors.year}>
              Year
            </InputLabel>
            <Select
              fullWidth
              {...register("year")}
              error={!!errors.year}
              name="year"
              defaultValue=""
            >
              <MenuItem value={"I Year"}>I Year</MenuItem>
              <MenuItem value={"II Year"}>II Year</MenuItem>
              <MenuItem value={"III Year"}>III Year</MenuItem>
            </Select>
            {errors.year && (
              <Typography color="error">{errors.year.message}</Typography>
            )}
          </Grid>
          <Grid item xs={6} md={4} lg={4} xl={3}>
            <InputLabel sx={{ mb: 1 }} error={!!errors.semester}>
              Semester
            </InputLabel>
            <Select
              fullWidth
              {...register("semester")}
              error={!!errors.semester}
              name="semester"
              defaultValue=""
            >
              <MenuItem value={"I Semester"}>I Semester </MenuItem>
              <MenuItem value={"II Semester"}>II Semester</MenuItem>
              <MenuItem value={"III Semester"}>III Semester</MenuItem>Semester
              <MenuItem value={"IV Semester"}>IV Semester</MenuItem>
              <MenuItem value={"V Semester"}>V Semester</MenuItem>
              <MenuItem value={"VI Semester"}>VISemester </MenuItem>
            </Select>
            {errors.semester && (
              <Typography color="error">{errors.semester.message}</Typography>
            )}
          </Grid>
          <Grid item xs={6} md={4} lg={4} xl={3}>
            <InputLabel sx={{ mb: 1 }} error={!!errors.subjectcode}>
              Subject Code
            </InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              type="number"
              {...register("subjectcode")}
              error={!!errors.subjectcode}
              name="subjectcode"
              helperText={errors.subjectcode?.message}
            />
          </Grid>
          <Grid item xs={6} md={4} lg={4} xl={3}>
            <InputLabel sx={{ mb: 1 }} error={!!errors.subjectname}>
              Subject Name
            </InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              type="text"
              {...register("subjectname")}
              error={!!errors.subjectname}
              name="subjectname"
              component="label"
              helperText={errors.subjectname?.message}
            />
          </Grid>
          <Grid item xs={6} md={4} lg={4} xl={3}>
            <InputLabel sx={{ mb: 1 }} error={!!errors.hour}>
              Hour
            </InputLabel>
            <Select
              fullWidth
              {...register("hour")}
              error={!!errors.hour}
              name="hour"
              defaultValue=""
            >
              <MenuItem value={"6"}>6</MenuItem>
              <MenuItem value={"3"}>3</MenuItem>
            </Select>
            {errors.hour && (
              <Typography color="error">{errors.hour.message}</Typography>
            )}
          </Grid>
          <Grid item xs={6} md={4} lg={4} xl={3}>
            <InputLabel sx={{ mb: 1 }} error={!!errors.courseincharge}>
              Course Incharge
            </InputLabel>
            <Select
              fullWidth
              {...register("courseincharge")}
              error={!!errors.courseincharge}
              name="courseincharge"
              defaultValue=""
            >
              <MenuItem value={"staff 1"}>staff 1</MenuItem>
              <MenuItem value={"staff 2"}>staff 2</MenuItem>
            </Select>
            {errors.courseincharge && (
              <Typography color="error">
                {errors.courseincharge.message}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Button variant="outlined" color="secondary" type="submit">
              Create Subject
            </Button>
          </Grid>
        </Grid>
      </form>
      <ToastContainer />
    </Box>
  );
};

export default CreateSubject;
