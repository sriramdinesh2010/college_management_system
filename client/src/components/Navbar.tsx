import { useEffect, useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "../components/FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "../app/state";
import profileImage from "../assets/profile.jpeg";
import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import { ThemeSettings } from "../app/state/theme";
import { BiMenuAltLeft } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../scenes/Login/authApiSlice";
import useAuth from "../hooks/useAuth";

interface NavbarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }: NavbarProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme<ThemeSettings>();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const [sendLogout, { isSuccess, isError }] = useSendLogoutMutation();
  const { email, roles } = useAuth();

  useEffect(() => {
    console.log("enter useeffect");
    if (isSuccess) {
      localStorage.removeItem("persist");
      navigate("/");
    }
  }, [isSuccess, navigate]);

  if (isError) {
    console.log(isError);
  }

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <BiMenuAltLeft />
          </IconButton>
          <FlexBetween
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
            sx={{ backgroundColor: theme.palette.background.alt }}
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>

          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {email}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {roles[0]}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={() => sendLogout()}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
