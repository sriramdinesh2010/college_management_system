import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { ThemeSettings } from "../../app/state/theme";
import StudentListSkeleton from "../../skeleton/StudentListSkeleton";
import { useDeleteNoteMutation, useGetNotesQuery } from "./NoteApiSlice";
const NotesList = () => {
  const theme = useTheme<ThemeSettings>();

  const handledeleteclick = (_id: string) => {
    deleteNote({ id: _id });
  };
  const handleupdateclick = (_id: string) => {
    console.log(_id);
  };
  const [deleteNote] = useDeleteNoteMutation();
  const columns = [
    {
      field: "noteId",
      headerName: "NoteID",
      flex: 0.2,
    },
    {
      field: "title",
      headerName: "Title",
      flex: 0.5,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "viewfor",
      headerName: "view for",
      flex: 0.2,
    },
    {
      field: "publishdate",
      headerName: "Publish Date	",
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

  const {
    data: notes,
    isLoading,
    error,
  } = useGetNotesQuery("ReactRTkQuaryList", {
    pollingInterval: 300000,
  });
  if (isLoading) return <StudentListSkeleton />;
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
        loading={isLoading || !notes}
        getRowId={(row) => row._id}
        rows={notes || []}
        columns={columns}
      />
    </Box>
  );
};

export default NotesList;
