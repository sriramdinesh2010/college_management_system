import { Box, Button, useTheme } from "@mui/material";
import { ThemeSettings } from "../../app/state/theme";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  useDeleteEmployeeMutation,
  useGetEmployeeQuery,
} from "./EmployeeSlice";

export default function BasicTable() {
  const theme = useTheme<ThemeSettings>();

  //data from react-quary
  const { data, isLoading, error } = useGetEmployeeQuery("");
  const [deleteEmployee] = useDeleteEmployeeMutation();
  if (isLoading) return "loding...";
  if (error) return "error";
  const handledeleteclick = (_id: string) => {
    deleteEmployee({ id: _id });
  };
  const handleupdateclick = (_id: string) => {
    console.log(_id);
  };
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
      field: "role",
      headerName: "Department",
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
      Sorting: null,
      flex: 0.3,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          color="secondary"
          size="small"
          variant="contained"
          startIcon={<EditOutlinedIcon />}
          onClick={() => handleupdateclick(params.row._id)}
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
  if (isLoading) return "loding...";
  if (error) return "error";
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
        loading={isLoading || !data}
        getRowId={(row) => row._id}
        rows={data || []}
        columns={columns}
      />
    </Box>
  );
}
