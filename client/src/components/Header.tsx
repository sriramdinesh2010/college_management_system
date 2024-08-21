import { Typography, Box, useTheme } from "@mui/material";
import { ThemeSettings } from "../app/state/theme";

interface Props {
  title: string;
  subtitle: string;
}
const Header = ({ title, subtitle }: Props) => {
  const theme = useTheme<ThemeSettings>();
  return (
    <Box>
      <Typography
        variant="h3"
        color={theme.palette.secondary[100]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={theme.palette.secondary[300]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
