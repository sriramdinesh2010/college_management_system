import { Grid, Paper, Typography, useTheme } from "@mui/material";
import { ThemeSettings } from "../app/state/theme";
import CountUp from "react-countup";
type Props = {
  title: String;
  count: number;
  IconImage: JSX.Element;
};

const CustomPaper = ({ title, count, IconImage }: Props) => {
  const theme = useTheme<ThemeSettings>();
  return (
    <Paper
      elevation={4}
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: 100,
        width: "auto",
        backgroundColor: theme.palette.background.alt,
      }}
    >
      <Grid container>
        <Grid item xs={4} md={4} lg={4} xl={4}>
          {IconImage}
        </Grid>
        <Grid item xs={8} md={8} lg={8} xl={8}>
          <Typography gutterBottom color={"secondary"} variant="h4">
            {title.toUpperCase()}
          </Typography>
          <Typography variant="h4">
            <CountUp start={0} end={count}></CountUp>
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CustomPaper;
