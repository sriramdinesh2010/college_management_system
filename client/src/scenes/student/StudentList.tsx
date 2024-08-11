import { Box, Button, useTheme } from "@mui/material";
import useStudent from "../../hooks/useStudent";
import { ThemeSettings } from "../../app/state/theme";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const NewTable = () => {
  const theme = useTheme<ThemeSettings>();

  const handledeleteclick = (_id: string) => {
    console.log(_id);
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
      field: "course",
      headerName: "Course",
      flex: 0.2,
    },
    {
      field: "currentsemester",
      headerName: "Semester",
      flex: 0.2,
    },
    {
      field: "firstname",
      headerName: "First Name",
      flex: 0.2,
    },
    {
      field: "lastname",
      headerName: "Last Name",
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
      flex: 0.5,
    },
    {
      field: "update",
      headerName: "Update",
      Sorting: null,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          color="secondary"
          size="small"
          style={{ marginLeft: 16 }}
          tabIndex={params.hasFocus ? 0 : -1}
          onClick={() => handleupdateclick(params.row._id)}
        >
          <EditIcon />
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      renderCell: (params: GridRenderCellParams) => (
        <Button
          color="secondary"
          size="small"
          style={{ marginLeft: 16 }}
          tabIndex={params.hasFocus ? 0 : -1}
          onClick={() => handledeleteclick(params.row._id)}
        >
          <DeleteIcon />
        </Button>
      ),
    },
  ];

  //data from react-quary
  const { data, isLoading, error } = useStudent();
  if (isLoading) return "loding...";
  if (error) return "error";

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
        loading={isLoading || !data}
        getRowId={(row) => row._id}
        rows={data || []}
        columns={columns}
      />
    </Box>
  );
};

export default NewTable;
