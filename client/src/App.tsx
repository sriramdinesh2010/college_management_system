import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "./app/state/theme";
import { RootState } from "./app/store";
import Layout from "./scenes/layout";
import DashHome from "./scenes/Dashboard/DashHome";
import CreateStudent from "./scenes/student/CreateStudent";
import StudentList from "./scenes/student/StudentList";

const queryClient = new QueryClient();
const App = () => {
  const mode = useSelector((state: RootState) => state.global.mode);
  console.log(mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashHome />} />
              <Route path="/createstudent" element={<CreateStudent />} />
              <Route path="/studentlist" element={<StudentList />} />
            </Route>
          </Routes>
        </ThemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
