import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import CreateSubject from "./CreateSubject";
import SubjectList from "./SubjectList";
import { useTheme } from "@mui/material";
import { ThemeSettings } from "../../app/state/theme";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

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
            label="Create Subject"
            {...a11yProps(0)}
            sx={{
              backgroundColor:
                value === 0 ? theme.palette.secondary[300] : "transparent",
              color: value === 0 ? theme.palette.primary.contrastText : "",
              borderRadius: "4px",
              height: "10px",
              margin: "0 2px",
            }}
          />
          <Tab
            icon={<SearchIcon />}
            iconPosition="start"
            label="Search Subject"
            {...a11yProps(1)}
            sx={{
              backgroundColor:
                value === 1 ? theme.palette.secondary[300] : "transparent",
              color: value === 1 ? theme.palette.primary.contrastText : "",
              borderRadius: "4px",
              margin: "0 8px",
            }}
          />
          <Tab
            icon={<FormatListBulletedIcon />}
            iconPosition="start"
            label="Subject List"
            {...a11yProps(2)}
            sx={{
              backgroundColor:
                value === 2 ? theme.palette.secondary[300] : "transparent",
              color: value === 2 ? theme.palette.primary.contrastText : "",
              borderRadius: "4px",
              margin: "0 8px",
            }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <CreateSubject />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        search Subject
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <SubjectList />
      </CustomTabPanel>
    </Box>
  );
}
