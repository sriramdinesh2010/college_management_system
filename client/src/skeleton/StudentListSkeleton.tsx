import { Box, Skeleton } from "@mui/material";

const StudentListSkeleton = () => {
  return (
    <Box m="1.5rem 2.5rem" gap={1}>
      <Skeleton width={"100%"} height={80} />
      <Skeleton width={"100%"} height={60} />
      <Skeleton width={"100%"} height={60} />
      <Skeleton width={"100%"} height={60} />
      <Skeleton width={"100%"} height={60} />
      <Skeleton width={"100%"} height={60} />
      <Skeleton width={"100%"} height={60} />
      <Skeleton width={"100%"} height={60} />
      <Skeleton width={"100%"} height={60} />
      <Skeleton width={"100%"} height={70} />
    </Box>
  );
};

export default StudentListSkeleton;
