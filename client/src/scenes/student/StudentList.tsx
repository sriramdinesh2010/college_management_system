import { Box, Button, useTheme } from "@mui/material";
import { ThemeSettings } from "../../app/state/theme";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  useDeleteStudentMutation,
  useGetStudentsQuery,
} from "./SutentApiSlice";
import { useNavigate } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import { CSSProperties } from "react";

const NewTable = () => {
  const theme = useTheme<ThemeSettings>();
  const override: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderColor: theme.palette.secondary.main,
  };
  const navigate = useNavigate();

  const handledeleteclick = (_id: string) => {
    deleteStudent({ id: _id });
  };
  const [deleteStudent] = useDeleteStudentMutation();
  const columns = [
    {
      field: "registernumber",
      headerName: "Reg Number",
      flex: 0.2,
    },
    {
      field: "department",
      headerName: "Department",
      flex: 0.2,
    },
    {
      field: "course",
      headerName: "Course",
      flex: 0.1,
    },
    {
      field: "currentsemester",
      headerName: "Semester",
      flex: 0.2,
    },
    {
      field: "firstname",
      headerName: "First Name",
      flex: 0.3,
    },
    {
      field: "lastname",
      headerName: "Intial",
      flex: 0.1,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 0.3,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.3,
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

  //data from react-quary
  const { data: students, isLoading } = useGetStudentsQuery(
    "ReactRTkQuaryList",
    {
      pollingInterval: 300000,
    }
  );
  if (isLoading) {
    return <ScaleLoader cssOverride={override} />;
  }
  //this is return table
  return (
    <Box
      m="1.5rem 2.5rem"
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
        loading={isLoading || !students}
        getRowId={(row) => row._id}
        rows={students || []}
        columns={columns}
      />
    </Box>
  );
};

export default NewTable;
