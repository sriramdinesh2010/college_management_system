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
import Employee from "./scenes/employee/Employee";
import Department from "./scenes/department/Department";
import Library from "./scenes/library/Library";
import Notes from "./scenes/notes/Notes";
import Notification from "./scenes/notification/Notification";
import Hostel from "./scenes/hostel/Hostel";
import Subject from "./scenes/subject/Subject";
import EditStudent from "./scenes/student/EditStudent";
const queryClient = new QueryClient();
const App = () => {
  const mode = useSelector((state: RootState) => state.global.mode);
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
              <Route path="/createemployee" element={<Employee />} />
              <Route path="/editStudent" element={<EditStudent />} />
              <Route path="/department" element={<Department />} />
              <Route path="/subject" element={<Subject />} />
              <Route path="/library" element={<Library />} />
              <Route path="/hostel" element={<Hostel />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/notification" element={<Notification />} />
            </Route>
          </Routes>
        </ThemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
