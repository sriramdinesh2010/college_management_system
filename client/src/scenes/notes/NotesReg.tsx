import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { ThemeSettings } from "../../app/state/theme";
import Header from "../../components/Header";
import { useAddNewNoteMutation } from "./NoteApiSlice";

const schema = z.object({
  title: z
    .string({ message: "Title must be a String" })
    .min(1, { message: "Title is required" }),
  description: z
    .string({ message: "Discription must be a String" })
    .min(1, { message: "Discription is required" }),
  viewfor: z
    .string({ message: "Viewfor must be a String" })
    .min(1, { message: "View For is required" }),
  publishdate: z.string().pipe(z.coerce.date()),
});
type FormData = z.infer<typeof schema>;
const NotesReg = () => {
  const theme = useTheme<ThemeSettings>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [message, setmessage] = useState("");
  const [addNewNote] = useAddNewNoteMutation();
  const onSubmit = async (data: FieldValues) => {
    const noteId = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    const noteobject = {
      noteId: noteId,
      title: data.title,
      description: data.description,
      viewfor: data.viewfor,
      publishdate: data.publishdate,
    };
    const result = await addNewNote(noteobject).unwrap();
    try {
      setmessage(result.message);
      setOpen(true);
      reset();
    } catch (err) {
      setmessage(result.message);
      setOpen(true);
    }
  };
  const [open, setOpen] = useState(false);
  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <Paper
      sx={{
        p: 5,
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.background.alt,
      }}
    >
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={message}
      />
      <Header title={"Create New Notes"} subtitle="For infrom all" />
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <InputLabel sx={{ mb: 1 }} error={!!errors.title}>
              Title
            </InputLabel>
            <TextField
              {...register("title")}
              variant="outlined"
              fullWidth
              type="text"
              error={!!errors.title}
              name="title"
              helperText={errors.title?.message}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <InputLabel sx={{ mb: 1 }} error={!!errors.description}>
              Description
            </InputLabel>
            <TextField
              {...register("description")}
              variant="outlined"
              id="outlined-multiline-flexible"
              fullWidth
              multiline
              maxRows={4}
              type="text"
              error={!!errors.description}
              name="description"
              helperText={errors.description?.message}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <InputLabel sx={{ mb: 1 }} error={!!errors.viewfor}>
              View For
            </InputLabel>
            <Select
              fullWidth
              {...register("viewfor")}
              error={!!errors.viewfor}
              name="viewfor"
              defaultValue=""
            >
              <MenuItem value={"student"}>Student</MenuItem>
              <MenuItem value={"empolyee"}>Empolyee</MenuItem>
              <MenuItem value={"both"}>Both</MenuItem>
            </Select>
            {errors.viewfor && (
              <Typography color="error">{errors.viewfor.message}</Typography>
            )}
          </Grid>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <InputLabel sx={{ mb: 1 }} error={!!errors.publishdate}>
              Joining Date
            </InputLabel>
            <TextField
              {...register("publishdate")}
              variant="outlined"
              fullWidth
              type="date"
              name="publishdate"
              error={!!errors.publishdate}
              helperText={errors.publishdate?.message}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Button variant="contained" type="submit">
              Submited
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default NotesReg;
