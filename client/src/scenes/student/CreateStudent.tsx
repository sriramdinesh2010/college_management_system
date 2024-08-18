import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import Header from "../../components/Header";
import { ThemeSettings } from "../../app/state/theme";
import { useAddNewStudentMutation } from "./SutentApiSlice";
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const schema = z.object({
  image: z
    .any()
    // To not allow empty files
    .refine((files) => files?.length >= 1, { message: "Image is required." })
    // To not allow files other than images
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
      message: ".jpg, .jpeg, .png and .webp files are accepted.",
    })
    // To not allow files larger than 5MB
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
      message: `Max file size is 5MB.`,
    }),
  registernumber: z
    .number()
    .min(9, { message: "Register number contain 9 numbers" }),
  firstname: z.string().min(1, { message: " First Name is required" }),
  lastname: z.string().min(1, { message: "Last Name is required" }),
  gender: z
    .string({ message: "Gender is required" })
    .min(1, { message: "Gender is required" }),
  fathername: z
    .string({ message: " Father Name is required" })
    .min(1, { message: "Father name is required" }),
  mothername: z
    .string({ message: " Mother Name is required" })
    .min(1, { message: "Mother Name is required" }),
  dob: z.string().pipe(z.coerce.date()),
  bloodgroup: z
    .string({ message: "Blood group is required" })
    .min(1, { message: "Blood Group is required" }),
  phone: z
    .string()
    .min(10, { message: "Must be a valid mobile number" })
    .max(14, { message: "Must be a valid mobile number" }),
  email: z
    .string({ message: "Email  is required" })
    .email({ message: "Enter vaild Email address" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is requried" }),
  state: z.string().min(1, { message: "State is requried" }),
  country: z.string().min(1, { message: "Country is requried" }),
  program: z.string().min(1, { message: "Program is requried" }),
  course: z.string().min(1, { message: "Course is requried" }),
  department: z.string().min(1, { message: "Department is requried" }),
  currentsemester: z
    .string()
    .min(1, { message: "Current Semester  is requried" }),
  joiningdate: z.string().pipe(z.coerce.date()),
});
type FormData = z.infer<typeof schema>;
const StudentReg = () => {
  const theme = useTheme<ThemeSettings>();
  // reack hook form inint
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  //alert setup
  const [message, setmessage] = useState("");
  // sumbit handler
  const [addNewStudent] = useAddNewStudentMutation();
  const onSubmit = async (data: FieldValues) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("registernumber", data.registernumber);
    formData.append("firstname", data.firstname);
    formData.append("lastname", data.lastname);
    formData.append("gender", data.gender);
    formData.append("fathername", data.fathername);
    formData.append("mothername", data.mothername);
    formData.append("dob", data.dob);
    formData.append("bloodgroup", data.bloodgroup);
    formData.append("phone", data.phone);
    formData.append("email", data.email);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("country", data.country);
    formData.append("program", data.program);
    formData.append("course", data.course);
    formData.append("department", data.department);
    formData.append("currentsemester", data.currentsemester);
    formData.append("joiningdate", data.joiningdate);
    const result = await addNewStudent(formData).unwrap();
    try {
      setmessage(result.message);
      setOpen(true);
      reset();
    } catch (error) {
      setmessage(result.data.message);
      setOpen(true);
    }
  };
  const [open, setOpen] = useState(false);
  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <Box m="1.5rem 2.5rem">
      <Paper
        sx={{
          p: 5,
          display: "flex",
          flexDirection: "column",
          backgroundColor: theme.palette.background.alt,
        }}
      >
        <Header title={""} subtitle={"Student Registration Form"} />
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          message={message}
        >
          <Alert onClose={handleClose} severity="success">
            {message}
          </Alert>
        </Snackbar>
        <br></br>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Typography variant="h6" gutterBottom>
            1. Personal Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={6} md={4} lg={4} xl={3}>
              <InputLabel sx={{ mb: 1 }} error={!!errors.image}>
                Image
              </InputLabel>
              <TextField
                {...register("image")}
                variant="outlined"
                fullWidth
                type="file"
                name="image"
                error={!!errors.image}
                component="label"
                helperText={errors.image?.message?.toString()}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} xl={3}>
              <InputLabel sx={{ mb: 1 }} error={!!errors.registernumber}>
                Register Number
              </InputLabel>
              <TextField
                {...register("registernumber", { valueAsNumber: true })}
                variant="outlined"
                fullWidth
                type="number"
                error={!!errors.registernumber}
                name="registernumber"
                helperText={errors.registernumber?.message}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} xl={3}>
              <InputLabel sx={{ mb: 1 }} error={!!errors.firstname}>
                First Name
              </InputLabel>
              <TextField
                {...register("firstname")}
                variant="outlined"
                fullWidth
                error={!!errors.firstname}
                type="text"
                name="firstname"
                helperText={errors.firstname?.message}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} xl={3}>
              <InputLabel sx={{ mb: 1 }} error={!!errors.lastname}>
                Last Name
              </InputLabel>
              <TextField
                {...register("lastname")}
                variant="outlined"
                type="text"
                fullWidth
                error={!!errors.lastname}
                name="lastname"
                helperText={errors.lastname?.message}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} xl={3}>
              <InputLabel sx={{ mb: 1 }} error={!!errors.gender}>
                Gender
              </InputLabel>
              <Select
                fullWidth
                {...register("gender")}
                error={!!errors.gender}
                name="gender"
                defaultValue=""
              >
                <MenuItem value={"male"}>male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
                <MenuItem value={"others"}>others</MenuItem>
              </Select>
              {errors.gender && (
                <Typography color="error">{errors.gender.message}</Typography>
              )}
            </Grid>
            <Grid item xs={6} md={4} lg={4} xl={3}>
              <InputLabel sx={{ mb: 1 }} error={!!errors.fathername}>
                Father Name
              </InputLabel>
              <TextField
                {...register("fathername")}
                variant="outlined"
                fullWidth
                type="text"
                name="fathername"
                error={!!errors.fathername}
                helperText={errors.fathername?.message}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} xl={3}>
              <InputLabel sx={{ mb: 1 }} error={!!errors.mothername}>
                Mothers Name
              </InputLabel>
              <TextField
                {...register("mothername")}
                variant="outlined"
                fullWidth
                type="text"
                name="mothername"
                error={!!errors.mothername}
                helperText={errors.mothername?.message}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} xl={3}>
              <InputLabel sx={{ mb: 1 }} error={!!errors.dob}>
                Date of Birth
              </InputLabel>
              <TextField
                {...register("dob")}
                variant="outlined"
                fullWidth
                type="date"
                name="dob"
                error={!!errors.dob}
                helperText={errors.dob?.message}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} xl={3}>
              <InputLabel sx={{ mb: 1 }} error={!!errors.bloodgroup}>
                Blood Group
              </InputLabel>
              <TextField
                {...register("bloodgroup")}
                variant="outlined"
                fullWidth
                type="text"
                error={!!errors.bloodgroup}
                name="bloodgroup"
                helperText={errors.bloodgroup?.message}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} xl={3}>
              <InputLabel sx={{ mb: 1 }} error={!!errors.phone}>
                Phone Number
              </InputLabel>
              <TextField
                {...register("phone")}
                variant="outlined"
                fullWidth
                type="number"
                name="phone"
                autoComplete="on"
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} xl={3}>
              <InputLabel sx={{ mb: 1 }} error={!!errors.email}>
                Email{" "}
              </InputLabel>
              <TextField
                {...register("email")}
                variant="outlined"
                fullWidth
                type="email"
                name="email"
                autoComplete="on"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} xl={3}>
              <InputLabel sx={{ mb: 1 }} error={!!errors.address}>
                Address{" "}
              </InputLabel>
              <TextField
                {...register("address")}
                variant="outlined"
                fullWidth
                type="text"
                name="address"
                autoComplete="on"
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} xl={3}>
              <InputLabel sx={{ mb: 1 }} error={!!errors.city}>
                City
              </InputLabel>
              <TextField
                {...register("city")}
                variant="outlined"
                fullWidth
                type="text"
                name="city"
                error={!!errors.city}
                helperText={errors.city?.message}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} xl={3}>
              <InputLabel sx={{ mb: 1 }} error={!!errors.state}>
                State
              </InputLabel>
              <TextField
                {...register("state")}
                variant="outlined"
                fullWidth
                type="text"
                name="state"
                error={!!errors.state}
                helperText={errors.state?.message}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} xl={3}>
              <InputLabel sx={{ mb: 1 }} error={!!errors.country}>
                Country
              </InputLabel>
              <TextField
                {...register("country")}
                variant="outlined"
                fullWidth
                type="text"
                name="country"
                error={!!errors.country}
                autoComplete="on"
                helperText={errors.country?.message}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                2. Course Details
              </Typography>
            </Grid>
            <Grid item xs={6} md={4} lg={4} xl={3}>
              <InputLabel
                id="demo-simple-select-label"
                sx={{ mb: 1 }}
                error={!!errors.program}
              >
                Program
              </InputLabel>
              <Select
                {...register("program")}
                fullWidth
                name="program"
                error={!!errors.program}
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
                {...register("course")}
                fullWidth
                name="course"
                error={!!errors.course}
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
              <InputLabel sx={{ mb: 1 }} error={!!errors.department}>
                Department
              </InputLabel>
              <TextField
                {...register("department")}
                variant="outlined"
                fullWidth
                type="text"
                name="department"
                error={!!errors.department}
                helperText={errors.department?.message}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} xl={3}>
              <InputLabel sx={{ mb: 1 }} error={!!errors.currentsemester}>
                Current Semester
              </InputLabel>
              <TextField
                {...register("currentsemester")}
                variant="outlined"
                fullWidth
                type="text"
                name="currentsemester"
                error={!!errors.currentsemester}
                helperText={errors.currentsemester?.message}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} xl={3}>
              <InputLabel sx={{ mb: 1 }} error={!!errors.joiningdate}>
                Joining Date
              </InputLabel>
              <TextField
                {...register("joiningdate")}
                variant="outlined"
                fullWidth
                type="date"
                name="joiningdate"
                error={!!errors.joiningdate}
                helperText={errors.joiningdate?.message}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <Button variant="outlined" color="inherit" type="submit">
                Create Student
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default StudentReg;
