import { useState, MouseEvent } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { ThemeSettings } from "../../app/state/theme";
import usePersist from "../../hooks/usePersist";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "./authApiSlice";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ScaleLoader from "react-spinners/ScaleLoader";
import { setCredentials } from "./authSlice";
import {
  Alert,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  useTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
// import LoginSvg from "../../assets/login_image.gif";
import Lottie from "lottie-react";
import CollegeAnimation from "../../assets/college_animation.json";

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

export default function Login() {
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
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid item xs={12} md={12} lg={12} xl={12}></Grid>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Lottie animationData={CollegeAnimation} loop={true} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        sx={{ backgroundColor: theme.palette.background.alt }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {errMsg && (
            <Alert
              severity="error"
              sx={{ width: "100%", mt: 2, fontSize: "15px" }}
            >
              {errMsg}
            </Alert>
          )}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
            <InputLabel sx={{ mb: 1, mt: 1 }} error={!!errors.email}>
              Email
            </InputLabel>
            <TextField
              {...register("email")}
              fullWidth
              name="email"
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{ mb: 2 }}
            />
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
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />

            <FormControlLabel
              value={persist}
              sx={{ mb: 2 }}
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

            <Button
              type="submit"
              fullWidth
              color="secondary"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" color={"secondary"}>
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
