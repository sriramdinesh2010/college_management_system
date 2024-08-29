import { Box, Button, useTheme } from "@mui/material";
import { ThemeSettings } from "../../app/state/theme";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useNavigate } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import { CSSProperties } from "react";
import {
  useDeleteSubjectMutation,
  useGetSubjectQuery,
} from "./SubjectApiSlice";
const SubjectList = () => {
  const theme = useTheme<ThemeSettings>();
  const override: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderColor: theme.palette.secondary.main,
  };
  const navigate = useNavigate();

  const handledeleteclick = (_id: string) => {
    deleteSubject({ id: _id });
  };
  const [deleteSubject] = useDeleteSubjectMutation();
  const columns = [
    {
      field: "program",
      headerName: "Program",
      flex: 0.1,
    },
    {
      field: "course",
      headerName: "Course",
      flex: 0.1,
    },
    {
      field: "coursename",
      headerName: "Course Name",
      flex: 0.2,
    },
    {
      field: "part",
      headerName: "Part",
      flex: 0.2,
    },
    {
      field: "year",
      headerName: "Year",
      flex: 0.1,
    },
    {
      field: "semester",
      headerName: "Semester",
      flex: 0.2,
    },
    {
      field: "subjectcode",
      headerName: "Subject Code",
      flex: 0.2,
    },
    {
      field: "subjectname",
      headerName: "Subject Name",
      flex: 0.4,
    },
    {
      field: "courseincharge",
      headerName: "Course Incharge",
      flex: 0.2,
    },
    {
      field: "update",
      headerName: "Update",
      sortable: false,
      flex: 0.3,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          color="secondary"
          size="small"
          variant="contained"
          startIcon={<EditOutlinedIcon />}
          onClick={() => {
            navigate("/editStudent", { state: { studendata: params.row } });
          }}
        >
          Update
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.3,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          color="secondary"
          size="small"
          variant="contained"
          startIcon={<DeleteOutlineOutlinedIcon />}
          onClick={() => handledeleteclick(params.row._id)}
        >
          Delete
        </Button>
      ),
    },
  ];
  const { data: subject, isLoading } = useGetSubjectQuery("");
  if (isLoading) {
    return <ScaleLoader cssOverride={override} />;
  }
  return (
    <Box
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: theme.palette.background.alt,
          color: theme.palette.secondary[100],
          borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: theme.palette.primary.light,
        },
        "& .MuiDataGrid-footerContainer": {
          backgroundColor: theme.palette.background.alt,
          color: theme.palette.secondary[100],
          borderTop: "none",
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: `${theme.palette.secondary[200]} !important`,
        },
      }}
    >
      <DataGrid
        loading={isLoading || !subject}
        getRowId={(row) => row._id}
        rows={subject || []}
        columns={columns}
        autoHeight
      />
    </Box>
  );
};

export default SubjectList;
