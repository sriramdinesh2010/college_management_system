import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useGetStudentsQuery } from "../student/SutentApiSlice";

interface RegistrationOption {
  registernumber: number;
}

const AsyncAutocomplete: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  // Fetch students data using RTK Query
  const { data: students, isLoading } = useGetStudentsQuery(inputValue, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  return (
    <Autocomplete
      open={open}
      fullWidth
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      onInputChange={(_event: React.SyntheticEvent, registernumber: string) => {
        setInputValue(registernumber);
      }}
      getOptionLabel={(option: RegistrationOption) =>
        option.registernumber.toString()
      }
      options={students || []}
      loading={isLoading}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          label="RegisterNumber"
          value=""
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default AsyncAutocomplete;
