import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { themeSettings } from "./app/state/theme";
import { RootState } from "./app/store";
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
import SearchStudent from "./scenes/student/SearchStudent";
import PersistLogin from "./scenes/Login/PersistLogin";
import Addadmin from "./scenes/addadmin/Addadmin";
import NewLogin from "./scenes/Login/NewLogin";
import NotFound from "./scenes/404/NotFound";

const App = () => {
  const mode = useSelector((state: RootState) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<NewLogin />} />
          <Route element={<PersistLogin />}>
            <Route path="/dashboard" element={<DashHome />} />
            <Route path="/createstudent" element={<CreateStudent />} />
            <Route path="/searchstudent" element={<SearchStudent />} />
            <Route path="/studentlist" element={<StudentList />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/editStudent" element={<EditStudent />} />
            <Route path="/department" element={<Department />} />
            <Route path="/subject" element={<Subject />} />
            <Route path="/library" element={<Library />} />
            <Route path="/hostel" element={<Hostel />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/addadmin" element={<Addadmin />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
