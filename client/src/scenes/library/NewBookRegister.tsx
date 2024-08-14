import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
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
    .refine((files) => files?.length >= 1, { message: "Image is required." })
    // To not allow files other than images
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
      message: ".jpg, .jpeg, .png and .webp files are accepted.",
    })
    // To not allow files larger than 5MB
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
      message: `Max file size is 5MB.`,
    }),
  accessnumber: z
    .number({ message: "Access Number is requried" })
    .min(1, { message: "Access Number is requried" })
    .max(9, { message: "Access Number contain 9 Number" }),
  isbn: z
    .number({ message: "ISBN is a number" })
    .min(1, { message: "ISBN is required" })
    .max(13, { message: "enter valid isbn number" }),
  callnumber: z
    .string({ message: "Call Number is required" })
    .min(2, { message: "Call Number is required" }),
  ddcnumber: z
    .string({ message: "DCC Number is required" })
    .min(1, { message: "DCC Number is required" }),
  oclcnumber: z.number().min(2).max(10),
  lccnumber: z.number().min(2).max(10),
  title: z.string().min(1, { message: "Tittle is required" }),
  author: z.string().min(1, { message: "Author Name  is required" }),
  publisher: z.string().min(1, { message: "Publisher Name is required" }),
  barcode: z.number().min(2).max(10),
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
  const onSubmit = (data: FieldValues) => {
    console.log(data);
    const formData = new FormData();

    console.log(formData);

    axios
      .post("http://localhost:5000/book", formData)
      .then((res) => setmessage(res.data.message));
    setOpen(true);
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
        <form onSubmit={handleSubmit(onSubmit)}>
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
              />
              {errors.image && (
                <Typography color="error">
                  {errors.image?.message?.toString()}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} md={4} lg={6} xl={3}>
              <InputLabel sx={{ mb: 1 }} error={!!errors.accessnumber}>
                Access Number
              </InputLabel>
              <TextField
                {...register("accessnumber")}
                variant="outlined"
                fullWidth
                type="number"
                name="accessnumber"
                autoComplete="on"
                error={!!errors.accessnumber}
              />
              {errors.accessnumber && (
                <Typography color="error">
                  {errors.accessnumber.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} md={4} lg={6} xl={3}>
              <InputLabel sx={{ mb: 1 }} error={!!errors.isbn}>
                ISBN Number
              </InputLabel>
              <TextField
                {...register("isbn")}
                variant="outlined"
                fullWidth
                type="number"
                name="isbn"
                autoComplete="on"
                error={!!errors.isbn}
              />
              {errors.isbn && (
                <Typography color="error">{errors.isbn.message}</Typography>
              )}
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
              />
              {errors.callnumber && (
                <Typography color="error">
                  {errors.callnumber.message}
                </Typography>
              )}
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
              />
              {errors.ddcnumber && (
                <Typography color="error">
                  {errors.ddcnumber.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} md={4} lg={6} xl={6}>
              <InputLabel sx={{ mb: 1 }} error={!!errors.oclcnumber}>
                OCLC Number
              </InputLabel>
              <TextField
                {...register("oclcnumber")}
                variant="outlined"
                fullWidth
                type="number"
                name="oclcnumber"
                autoComplete="on"
                error={!!errors.oclcnumber}
              />
              {errors.oclcnumber && (
                <Typography color="error">
                  {errors.oclcnumber.message}
                </Typography>
              )}
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
              />
              {errors.title && (
                <Typography color="error">{errors.title.message}</Typography>
              )}
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
              />
              {errors.author && (
                <Typography color="error">{errors.author.message}</Typography>
              )}
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
              />
              {errors.publisher && (
                <Typography color="error">
                  {errors.publisher.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} md={4} lg={6} xl={3}>
              <InputLabel sx={{ mb: 1 }} error={!!errors.barcode}>
                Barcode
              </InputLabel>
              <TextField
                {...register("barcode")}
                variant="outlined"
                fullWidth
                type="number"
                name="barcode"
                autoComplete="on"
                error={!!errors.barcode}
              />
              {errors.barcode && (
                <Typography color="error">{errors.barcode.message}</Typography>
              )}
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
