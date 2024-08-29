import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import PulseLoader from "react-spinners/PulseLoader";
import RequireAuth from "./RequireAuth";
import { ROLES } from "../../config/roles";
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { ThemeSettings } from "../../app/state/theme";
import unauthorized from "../../assets/unauthorized.png";
type ErrorType = {
  data?: {
    message?: string;
  };
};

const PersistLogin: React.FC = () => {
  const theme = useTheme<ThemeSettings>();
  const navigate = useNavigate();
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken) as string | null;
  const effectRan = useRef<boolean>(false);

  const [trueSuccess, setTrueSuccess] = useState<boolean>(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();
  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      // React 18 Strict Mode
      const verifyRefreshToken = async () => {
        console.log("verifying refresh token");
        try {
          await refresh();
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      if (!token && persist) verifyRefreshToken();
    }

    return () => {
      effectRan.current = true;
    };

    // eslint-disable-next-line
  }, []);

  let content: JSX.Element = <></>; // Default initialization

  if (!persist) {
    // persist: no
    console.log("no persist");
    content = <RequireAuth allowedRoles={[ROLES.Admin]} />;
  } else if (isLoading) {
    //persist: yes, token: no
    console.log("loading");
    content = (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <PulseLoader color="#ffffff" />
      </Box>
    );
  } else if (isError) {
    //persist: yes, token: no
    console.log("error");
    content = (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
          backgroundColor: theme.palette.background.alt,
        }}
      >
        <Stack>
          <img src={unauthorized} width={400} height={400} />
          <Typography variant="h3" color="white" gutterBottom align="center">
            {`${
              (error as ErrorType)?.data?.message
            } ! or You Login is expired `}
          </Typography>
          <Button
            sx={{ mt: 2 }}
            onClick={() => navigate("/")}
            color={"secondary"}
          >
            Go To Login
          </Button>
        </Stack>
      </Box>
    );
  } else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes
    console.log("success");
    content = <RequireAuth allowedRoles={[ROLES.Admin]} />;
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    console.log("token and uninit");
    content = <RequireAuth allowedRoles={[ROLES.Admin]} />;
  }

  return content;
};

export default PersistLogin;
