import { Box, Button, useTheme } from "@mui/material";
import { ThemeSettings } from "../../app/state/theme";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useDeleteAdminMutation, useGetAdminsQuery } from "./AdminApiSlice";
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
    deleteAdmin({ id: _id });
  };
  const [deleteAdmin] = useDeleteAdminMutation();
  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 0.1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.2,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.2,
      renderCell: (params: GridRenderCellParams) => {
        const roleData = params.row.roles;

        // Check if roleData exists and is an array
        return (
          <span>
            {Array.isArray(roleData) ? roleData.join(", ") : "No Role"}
          </span>
        );
      },
    },
    {
      field: "update",
      headerName: "Update",
      flex: 0.2,
      sortable: false,

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
      flex: 0.2,
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
  const { data: admin, isLoading } = useGetAdminsQuery("ReactRTkQuaryList", {
    pollingInterval: 300000,
  });
  console.log(admin);
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
        loading={isLoading || !admin}
        getRowId={(row) => row._id}
        rows={admin || []}
        columns={columns}
      />
    </Box>
  );
};

export default NewTable;
