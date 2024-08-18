import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  Snackbar,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { useAddNewBookMutation } from "./BookApiSlice";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const schema = z.object({
  image: z
    .any()
    // To not allow empty files
    .refine((files) => files?.length >= 1, {
      message: "Cover Image  is required.",
    })
    // To not allow files other than images
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
      message: ".jpg, .jpeg, .png and .webp files are accepted.",
    })
    // To not allow files larger than 5MB
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
      message: `Max file size is 5MB.`,
    }),
  accessnumber: z
    .string({ message: "Access Number is requried" })
    .min(1, { message: "Access Number is requried" })
    .max(9, { message: "Access Number contain 9 Number" }),
  isbn: z
    .string({ message: "ISBN is requried" })
    .min(1, { message: "ISBN is required" }),
  callnumber: z
    .string({ message: "Call Number is required" })
    .min(2, { message: "Call Number is required" }),
  ddcnumber: z
    .string({ message: "DCC Number is required" })
    .min(1, { message: "DCC Number is required" }),
  oclcnumber: z.string().min(2),
  lccnumber: z.string().min(2),
  title: z.string().min(1, { message: "Tittle is required" }),
  author: z.string().min(1, { message: "Author Name  is required" }),
  publisher: z.string().min(1, { message: "Publisher Name is required" }),
  barcode: z.string().min(2).max(10),
});
type FormData = z.infer<typeof schema>;

const NewBookRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const [message, setmessage] = useState("");
  // sumbit handler
  const [addNewBook] = useAddNewBookMutation();
  const onBookSubmit = (data: FieldValues) => {
    console.log(data);
    reset();
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
    <>
      <Box sx={{ width: "800px" }}>
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          message={message}
        />
        <form onSubmit={onBookSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4} lg={6} xl={3}>
              <InputLabel sx={{ mb: 1 }} error={!!errors.image}>
                Image
              </InputLabel>
              <TextField
                {...register("image")}
                variant="outlined"
                fullWidth
                type="file"
                name="image"
                error={!!errors.image}
                component="label"
                helperText={errors.image?.message?.toString()}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={6} xl={3}>
              <InputLabel sx={{ mb: 1 }} error={!!errors.accessnumber}>
                Access Number
              </InputLabel>
              <TextField
                {...register("accessnumber")}
                variant="outlined"
                fullWidth
                type="text"
                name="accessnumber"
                autoComplete="on"
                error={!!errors.accessnumber}
                helperText={errors.accessnumber?.message}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={6} xl={3}>
              <InputLabel sx={{ mb: 1 }} error={!!errors.isbn}>
                ISBN Number
              </InputLabel>
              <TextField
                {...register("isbn")}
                variant="outlined"
                fullWidth
                type="text"
                name="isbn"
                autoComplete="on"
                error={!!errors.isbn}
                helperText={errors.isbn?.message}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={6} xl={3}>
              <InputLabel sx={{ mb: 1 }} error={!!errors.callnumber}>
                Call Number
              </InputLabel>
              <TextField
                {...register("callnumber")}
                variant="outlined"
                fullWidth
                type="text"
                name="callnumber"
                autoComplete="on"
                error={!!errors.callnumber}
                helperText={errors.callnumber?.message}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={6} xl={3}>
              <InputLabel sx={{ mb: 1 }} error={!!errors.ddcnumber}>
                DDC Number
              </InputLabel>
              <TextField
                {...register("ddcnumber")}
                variant="outlined"
                fullWidth
                type="text"
                name="ddcnumber"
                autoComplete="on"
                error={!!errors.ddcnumber}
                helperText={errors.ddcnumber?.message}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={6} xl={6}>
              <InputLabel sx={{ mb: 1 }} error={!!errors.oclcnumber}>
                OCLC Number
              </InputLabel>
              <TextField
                {...register("oclcnumber")}
                variant="outlined"
                fullWidth
                type="text"
                name="oclcnumber"
                autoComplete="on"
                error={!!errors.oclcnumber}
                helperText={errors.oclcnumber?.message}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={6} xl={3}>
              <InputLabel sx={{ mb: 1 }} error={!!errors.title}>
                Title
              </InputLabel>
              <TextField
                {...register("title")}
                variant="outlined"
                fullWidth
                type="text"
                name="title"
                autoComplete="on"
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={6} xl={3}>
              <InputLabel sx={{ mb: 1 }} error={!!errors.author}>
                Author
              </InputLabel>
              <TextField
                {...register("author")}
                variant="outlined"
                fullWidth
                type="text"
                name="author"
                autoComplete="on"
                error={!!errors.author}
                helperText={errors.author?.message}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={6} xl={3}>
              <InputLabel sx={{ mb: 1 }} error={!!errors.publisher}>
                Publisher
              </InputLabel>
              <TextField
                {...register("publisher")}
                variant="outlined"
                fullWidth
                type="text"
                name="publisher"
                autoComplete="on"
                error={!!errors.publisher}
                helperText={errors.publisher?.message}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={6} xl={3}>
              <InputLabel sx={{ mb: 1 }} error={!!errors.barcode}>
                Barcode
              </InputLabel>
              <TextField
                {...register("barcode")}
                variant="outlined"
                fullWidth
                type="text"
                name="barcode"
                autoComplete="on"
                error={!!errors.barcode}
                helperText={errors.barcode?.message}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <Button variant="contained" type="submit">
                Submited
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default NewBookRegister;
