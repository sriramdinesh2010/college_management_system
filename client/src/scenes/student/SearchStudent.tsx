import {
  Autocomplete,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { ThemeSettings } from "../../app/state/theme";
import Header from "../../components/Header";
import { useState } from "react";
import { useGetStudentsQuery, useSingleStudentQuery } from "./SutentApiSlice";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";
import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import logo from "../../assets/logo23.png";

interface RegistrationOption {
  registernumber: number;
}

const schema = z.object({
  registernumber: z
    .number({ message: "Enter A Register Number" })
    .min(9, { message: "Enter valid Register Number" }),
});

type FormData = z.infer<typeof schema>;

const SearchStudent = () => {
  //custem theme applay
  const theme = useTheme<ThemeSettings>();
  //auto complete open close setup
  const [open, setOpen] = useState<boolean>(false);
  //setup autocomplete data from rtk quary
  const { data: students, isLoading } = useGetStudentsQuery("");
  //init react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const [selectedRegisterNumber, setSelectedRegisterNumber] = useState<
    number | null
  >(null);
  const {
    data: singleStudent,
    isLoading: singleStudentLoading,
    isError,
    error,
  } = useSingleStudentQuery(
    selectedRegisterNumber ? { registernumber: selectedRegisterNumber } : null,
    {
      skip: selectedRegisterNumber === null,
    }
  );

  const onSubmit = async (data: FieldValues) => {
    setSelectedRegisterNumber(data.registernumber);
    reset();
  };
  const getErrorMessage = (error: any) => {
    if (error) {
      if ("data" in error && typeof (error as any).data === "object") {
        const data = (error as any).data as { message?: string };
        return data.message || "An error occurred";
      }
      return "An error occurred";
    }
    return "An unknown error occurred";
  };

  const getFormattedImageUrl = (imagePath: string) => {
    // Convert backslashes to forward slashes and prepend the base URL
    const formattedPath = imagePath.replace(/\\/g, "/");
    return `http://localhost:5000/${formattedPath}`;
  };

  return (
    <Paper
      sx={{
        p: 5,
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.background.default,
        m: "1.5rem 2.5rem",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12} xl={12}>
          <Header title="Search Student" subtitle="" />
        </Grid>
        <Grid item xs={12} md={12} lg={12} xl={12}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={11} md={11} lg={11} xl={11}>
                <Autocomplete
                  sx={{
                    "& .MuiAutocomplete-paper": {
                      backgroundColor: theme.palette.background.alt,
                    },
                  }}
                  open={open}
                  fullWidth
                  onOpen={() => setOpen(true)}
                  onClose={() => setOpen(false)}
                  getOptionLabel={(option: RegistrationOption) =>
                    option.registernumber.toString()
                  }
                  isOptionEqualToValue={(
                    option: RegistrationOption,
                    value: RegistrationOption
                  ) => option.registernumber === value.registernumber}
                  options={students || []}
                  loading={isLoading}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="Register Number"
                      error={!!errors.registernumber}
                      helperText={errors.registernumber?.message}
                      {...register("registernumber", {
                        setValueAs: (v) => (v === "" ? undefined : Number(v)),
                      })}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {isLoading ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={1} md={1} lg={1} xl={1}>
                <IconButton type="submit" color="secondary">
                  <SearchIcon fontSize="large" />
                </IconButton>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12} md={12} lg={12} xl={12}>
          {singleStudentLoading ? (
            <CircularProgress />
          ) : isError ? (
            <p>Error: {getErrorMessage(error)}</p>
          ) : singleStudent ? (
            <Card
              sx={{
                backgroundColor: theme.palette.background.alt,
              }}
            >
              <CardContent>
                <Grid container spacing={3} sx={{ m: 2 }}>
                  <Grid
                    item
                    xs={2}
                    md={3}
                    lg={3}
                    xl={3}
                    sx={{ borderBottom: "1px solid #ffd166" }}
                  >
                    <img src={logo} width={"80%"} height={"70%"} />
                  </Grid>
                  <Grid
                    item
                    xs={10}
                    md={8}
                    lg={8}
                    xl={8}
                    sx={{ borderBottom: "1px solid #ffd166" }}
                  >
                    <Typography variant="h2" color={"secondary"} gutterBottom>
                      Sriram College of Arts and Science
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Perumalpattu, Thiruvallur Dist. Pincode – 602024,
                      Tamilnadu, India.
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={3} lg={3} xl={3}>
                    <CardMedia
                      component="img"
                      sx={{
                        width: "80%",
                        height: "70%",
                        border: "3px solid #ffd166",
                        borderRadius: "20px",
                      }}
                      image={getFormattedImageUrl(singleStudent.image)}
                      alt="student Image"
                    />
                  </Grid>

                  <Grid item xs={8} md={8} lg={8} xl={8} sx={{ m: 2 }}>
                    <Grid container rowGap={0.5} spacing={1}>
                      <Grid item xs={12} md={6} lg={6} xl={4}>
                        <Typography variant="h5">
                          NAME:{"   "} {singleStudent.firstname}{" "}
                          {singleStudent.lastname}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={4}>
                        <Typography variant="h5">
                          REGISTER NUMBER: {singleStudent.registernumber}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={4}>
                        <Typography variant="h5">
                          COURSE: {singleStudent.course}{" "}
                          {singleStudent.department}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={4}>
                        <Typography variant="h5">
                          SEMESTER: {singleStudent.currentsemester}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={4}>
                        <Typography variant="h5">
                          GENDER: {singleStudent.gender}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={4}>
                        <Typography variant="h5">DOB:</Typography>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={4}>
                        <Typography variant="h5">
                          FATHER NAME: {singleStudent.fathername}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={4}>
                        <Typography variant="h5">
                          MOTHER NAME: {singleStudent.mothername}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={4}>
                        <Typography variant="h5">
                          MOBILE NO: {singleStudent.phone}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={4}>
                        <Typography variant="h5">
                          EMAIL: {singleStudent.email}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} md={6} lg={6} xl={4}>
                        <Typography variant="h5">YEAR: 2024</Typography>
                      </Grid>

                      <Grid item xs={12} md={6} lg={6} xl={4}>
                        <Typography variant="h5">
                          BLOOD GROUP: {singleStudent.bloodgroup}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={12} lg={12} xl={12}>
                        <Typography variant="h5">
                          ADDRESS: <br />
                          {singleStudent.address}
                          {","}
                          <br />
                          {singleStudent.city}
                          {","}
                          <br />
                          {singleStudent.state}
                          {","}
                          <br />
                          {singleStudent.country}
                          {","}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ) : null}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SearchStudent;
