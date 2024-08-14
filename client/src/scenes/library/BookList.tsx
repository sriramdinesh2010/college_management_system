import { Box, Button, useTheme } from "@mui/material";
import { ThemeSettings } from "../../app/state/theme";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useGetBookQuery, useDeleteBookMutation } from "./BookApiSlice";
import { useNavigate } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";

const BookList = () => {
  const navigate = useNavigate();
  const theme = useTheme<ThemeSettings>();

  const handledeleteclick = (_id: string) => {
    deleteBook({ id: _id });
  };
  const [deleteBook] = useDeleteBookMutation();
  const columns = [
    {
      field: "accessnumber",
      headerName: "Accessnumber",
      flex: 0.3,
    },
    {
      field: "isbn_number",
      headerName: "ISBN Number",
      flex: 0.3,
    },
    {
      field: "title",
      headerName: "Title",
      flex: 0.4,
    },
    {
      field: "author",
      headerName: "Author",
      flex: 0.3,
    },
    {
      field: "ddcnumber",
      headerName: "DDC Number",
      flex: 0.3,
    },
    {
      field: "oclcnumber",
      headerName: "OCLC Number",
      flex: 0.3,
    },
    {
      field: "update",
      headerName: "Update",
      Sorting: null,
      flex: 0.4,
      renderCell: (_params: GridRenderCellParams) => (
        <Button
          color="secondary"
          size="small"
          variant="contained"
          startIcon={<EditOutlinedIcon />}
          onClick={() => {
            navigate("/editStudent");
          }}
        >
          Update
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.4,
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
  const { data: books, isLoading } = useGetBookQuery("ReactRTkQuaryList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  if (isLoading) {
    return <ScaleLoader />;
  }
  //this is return table
  return (
    <Box
      m="1.5rem 2.5rem"
      width="750px"
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
        loading={isLoading || !books}
        getRowId={(row) => row._id}
        rows={books || []}
        columns={columns}
      />
    </Box>
  );
};

export default BookList;
