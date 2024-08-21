import React, { useState, MouseEvent } from "react";
import {
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Alert,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "./authApiSlice";
import { setCredentials } from "./authSlice";
import { useDispatch } from "react-redux";
import ScaleLoader from "react-spinners/ScaleLoader";
import usePersist from "../../hooks/usePersist";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { ThemeSettings } from "../../app/state/theme";
import LoginSvg from "../../assets/login_image.svg"; // Adjust the path as needed

// Define the types for the API response and errors
interface LoginResponse {
  accessToken: string;
}

interface ErrorType {
  status?: number;
  data?: {
    message?: string;
  };
}

// Zod schema for form validation
const schema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Enter a valid email address" }),
  password: z.string().nonempty({ message: "Enter your password" }),
});

// Infer the TypeScript type for form data from the Zod schema
type FormData = z.infer<typeof schema>;

const Login: React.FC = () => {
  // custom theme setting
  const theme = useTheme<ThemeSettings>();

  // Define state variables with types
  const [errMsg, setErrMsg] = useState<string>("");
  const [persist, setPersist] = usePersist();

  //persist checkpox change function
  const handleToggle = () => setPersist((prev: boolean) => !prev);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // login api setup
  const [login, { isLoading }] = useLoginMutation();

  // password show hide setup
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  //react-hook-form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  // form on submit
  const onSubmit = async (data: FieldValues) => {
    const logindata = {
      email: data.email,
      password: data.password,
    };
    try {
      const { accessToken } = (await login(
        logindata
      ).unwrap()) as LoginResponse;
      // store jwt token in  auth slice
      dispatch(setCredentials({ accessToken }));
      // form data reset
      reset();
      //user navigate after successful login
      navigate("/dashboard");
    } catch (err: unknown) {
      const error = err as ErrorType;
      if (!error.status) {
        setErrMsg("No Server Response");
      } else if (error.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (error.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(error.data?.message || "Login Failed");
      }
    }
  };

  if (isLoading) return <ScaleLoader height={5} width={40} color="secondary" />;

  return (
    <Container component="main">
      <CssBaseline />
      <Typography
        variant="h1"
        color={"secondary"}
        sx={{ marginTop: 2 }}
        gutterBottom
        align="center"
      >
        Sriram Collge of Arts and Science
      </Typography>
      <Paper
        sx={{
          marginTop: 5,
          marginRight: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 3,
          backgroundColor: theme.palette.background.alt,
          borderRadius: 3,
          width: "100%",
          height: "auto",
        }}
      >
        <Grid container spacing={6}>
          <Grid item xs={0} md={0} lg={6} xl={6}>
            <img
              src={LoginSvg}
              alt="No Data"
              style={{ width: "90%", height: "90%" }}
            />
            <Typography align="center" color="secondary" variant="h4">
              Admin Login
            </Typography>
          </Grid>
          <Grid item xs={0} md={0} lg={6} xl={6}>
            {errMsg && (
              <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
                {errMsg}
              </Alert>
            )}
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                  <InputLabel sx={{ mb: 1, mt: 1 }} error={!!errors.email}>
                    Email
                  </InputLabel>
                  <TextField
                    {...register("email")}
                    fullWidth
                    name="email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                  <InputLabel sx={{ mb: 1 }} error={!!errors.password}>
                    Password
                  </InputLabel>
                  <OutlinedInput
                    {...register("password")}
                    fullWidth
                    name="password"
                    type={showPassword ? "text" : "password"}
                    error={!!errors.password}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {errors.password && (
                    <Typography color="error">
                      {errors.password.message}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                  <FormControlLabel
                    value={persist}
                    control={
                      <Checkbox
                        checked={persist}
                        onChange={handleToggle}
                        id="persist"
                        color="secondary"
                      />
                    }
                    label="Trust This Device"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Login;
