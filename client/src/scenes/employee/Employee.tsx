import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import EmployeeReg from "./EmployeeReg";
import EmployeeList from "./EmployeeList";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { ThemeSettings } from "../../app/state/theme";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const theme = useTheme<ThemeSettings>();
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title={"Employee"} subtitle={"Employee Registration Form"} />
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            icon={<AddIcon />}
            iconPosition="start"
            label="Create Empolyee"
            {...a11yProps(0)}
          />
          <Tab
            icon={<SearchIcon />}
            iconPosition="start"
            label="Search Employee"
            {...a11yProps(1)}
          />
          <Tab label="employee list" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <EmployeeReg />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        search employee
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <EmployeeList />
      </CustomTabPanel>
    </Box>
  );
}
