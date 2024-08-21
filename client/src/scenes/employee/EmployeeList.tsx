import {
  Box,
  Button,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { ThemeSettings } from "../../app/state/theme";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  useDeleteEmployeeMutation,
  useGetEmployeeQuery,
} from "./EmployeeSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BasicTable() {
  const theme = useTheme<ThemeSettings>();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { data, isLoading, error } = useGetEmployeeQuery("");
  const [deleteEmployee] = useDeleteEmployeeMutation();

  const handleDeleteClick = async () => {
    if (!selectedId) return;

    try {
      await deleteEmployee({ id: selectedId }).unwrap();
      toast.success("Employee deleted successfully", { theme: "dark" });
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        const status = err.status || 500;
        const errorMessage = getErrorMessage(err.data);
        toast.error(`Error ${status}: ${errorMessage}`);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setOpen(false);
    }
  };

  const confirmDelete = (_id: string) => {
    setSelectedId(_id);
    setOpen(true);
  };

  const handleUpdateClick = (_id: string) => {
    console.log(_id);
  };

  const isFetchBaseQueryError = (
    error: unknown
  ): error is FetchBaseQueryError => {
    return (
      typeof error === "object" &&
      error !== null &&
      "status" in error &&
      "data" in error
    );
  };

  const getErrorMessage = (errorData: any) => {
    if (errorData && typeof errorData === "object" && "message" in errorData) {
      return errorData.message;
    }
    return "An unexpected error occurred";
  };

  const columns: GridColDef[] = [
    {
      field: "registernumber",
      headerName: "Reg Number",
      align: "center",
      headerAlign: "center",
      flex: 0.2,
    },
    {
      field: "department",
      headerName: "Department",
      align: "center",
      headerAlign: "center",
      flex: 0.2,
    },
    {
      field: "role",
      headerName: "Role",
      align: "center",
      headerAlign: "center",
      flex: 0.2,
    },
    {
      field: "firstname",
      headerName: "First Name",
      align: "center",
      headerAlign: "center",
      flex: 0.3,
    },
    {
      field: "lastname",
      headerName: "Initial",
      align: "center",
      headerAlign: "center",
      flex: 0.1,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      align: "center",
      headerAlign: "center",
      flex: 0.3,
    },
    {
      field: "email",
      headerName: "Email",
      align: "center",
      headerAlign: "center",
      flex: 0.3,
    },
    {
      field: "update",
      headerName: "actions",
      align: "center",
      headerAlign: "center",
      type: "actions",
      cellClassName: "actions",
      flex: 0.3,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          color="secondary"
          size="small"
          variant="contained"
          startIcon={<EditOutlinedIcon />}
          onClick={() => handleUpdateClick(params.row._id)}
        ></Button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      align: "center",
      headerAlign: "center",
      type: "actions",
      cellClassName: "actions",
      flex: 0.3,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          color="secondary"
          size="small"
          variant="contained"
          startIcon={<DeleteOutlineOutlinedIcon />}
          onClick={() => confirmDelete(params.row._id)}
        ></Button>
      ),
    },
  ];
  if (isLoading) return <div>Loading...</div>;
  if (error) {
    if (isFetchBaseQueryError(error)) {
      const errorMessage = getErrorMessage(error.data);
      return (
        <>
          <p>{errorMessage}</p>
        </>
      );
    } else {
      return <div>An unexpected error occurred</div>;
    }
  }

  return (
    <>
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
          autoHeight
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this employee?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteClick} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  );
}
