import Lottie from "lottie-react";
import Animation from "../../assets/Animation/404_animation.json";
import { Box } from "@mui/material";

const NotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Lottie animationData={Animation} loop={true} />
    </Box>
  );
};

export default NotFound;
