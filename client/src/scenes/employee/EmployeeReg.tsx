import { zodResolver } from "@hookform/resolvers/zod";
import {
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
import { ThemeSettings } from "../../app/state/theme";
import { useAddNewEmployeeMutation } from "./EmployeeSlice";

const MAX_FILE_SIZE = 9000000;
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
      message: `Max file size is 9MB.`,
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
  role: z.string().min(1, { message: "Role is requried" }),
  department: z.string().min(1, { message: "Department is requried" }),
  joiningdate: z.string().pipe(z.coerce.date()),
});
type FormData = z.infer<typeof schema>;
const EmpolyeeReg = () => {
  const theme = useTheme<ThemeSettings>();

  // reack hook form inint
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  //set error message
  const [message, setmessage] = useState("");
  const [addNewEmployee] = useAddNewEmployeeMutation();
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
    formData.append("department", data.department);
    formData.append("role", data.role);
    formData.append("joiningdate", data.joiningdate);
    const result = await addNewEmployee(formData).unwrap();
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
    <Paper
      sx={{
        p: 5,
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.background.alt,
      }}
    >
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={message}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
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
            />
            {errors.image && (
              <Typography color="error">
                {errors.image?.message?.toString()}
              </Typography>
            )}
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
            />
            {errors.registernumber && (
              <Typography color="error">
                {errors.registernumber.message}
              </Typography>
            )}
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
            />
            {errors.firstname && (
              <Typography color="error">{errors.firstname.message}</Typography>
            )}
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
            />
            {errors.lastname && (
              <Typography color="error">{errors.lastname.message}</Typography>
            )}
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
            />
            {errors.fathername && (
              <Typography color="error">{errors.fathername.message}</Typography>
            )}
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
            />
            {errors.mothername && (
              <Typography color="error">{errors.mothername.message}</Typography>
            )}
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
            />
            {errors.dob && (
              <Typography color="error">{errors.dob.message}</Typography>
            )}
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
            />
            {errors.bloodgroup && (
              <Typography color="error">{errors.bloodgroup.message}</Typography>
            )}
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
            />
            {errors.phone && (
              <Typography color="error">{errors.phone.message}</Typography>
            )}
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
            />
            {errors.email && (
              <Typography color="error">{errors.email.message}</Typography>
            )}
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
            />
            {errors.address && (
              <Typography color="error">{errors.address.message}</Typography>
            )}
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
            />
            {errors.city && (
              <Typography color="error">{errors.city.message}</Typography>
            )}
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
            />
            {errors.state && (
              <Typography color="error">{errors.state.message}</Typography>
            )}
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
            />
            {errors.country && (
              <Typography color="error">{errors.country.message}</Typography>
            )}
          </Grid>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              2. Course Details
            </Typography>
          </Grid>
          <Grid item xs={6} md={4} lg={4} xl={3}>
            <InputLabel sx={{ mb: 1 }} error={!!errors.role}>
              Role
            </InputLabel>
            <Select
              {...register("role")}
              fullWidth
              name="role"
              error={!!errors.role}
              defaultValue=""
            >
              <MenuItem value={"HOD"}>HOD</MenuItem>
              <MenuItem value={"assistant professor"}>
                Assistant Professor
              </MenuItem>
              <MenuItem value={"Associate Professor"}>
                Associate Professor{" "}
              </MenuItem>
            </Select>
            {errors.role && (
              <Typography color="error">{errors.role.message}</Typography>
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
            />
            {errors.department && (
              <Typography color="error">{errors.department.message}</Typography>
            )}
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
            />
            {errors.joiningdate && (
              <Typography color="error">
                {errors.joiningdate.message}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Button variant="contained" type="submit">
              Submited
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default EmpolyeeReg;
