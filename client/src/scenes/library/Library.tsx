import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { FaPlus, FaSearch, FaList } from "react-icons/fa";
import { TbHttpGet } from "react-icons/tb";
import { IoIosReturnRight } from "react-icons/io";
import { ThemeSettings } from "../../app/state/theme";
import { useTheme } from "@mui/material";
import NewBookRegister from "./NewBookRegister";
import BookList from "./BookList";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function Library() {
  const theme = useTheme<ThemeSettings>();
  const [value, setValue] = React.useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      m="1.5rem 2.5rem"
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "auto",
        backgroundColor: theme.palette.background.alt,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab
          label="Create Books"
          icon={<FaPlus />}
          iconPosition="start"
          {...a11yProps(0)}
        />
        <Tab
          label="Search Books"
          icon={<FaSearch />}
          iconPosition="start"
          {...a11yProps(1)}
        />
        <Tab
          label="Book List"
          icon={<FaList />}
          iconPosition="start"
          {...a11yProps(2)}
        />
        <Tab
          label="Get Book"
          icon={<TbHttpGet />}
          iconPosition="start"
          {...a11yProps(3)}
        />
        <Tab
          label="Retrun Book"
          icon={<IoIosReturnRight />}
          iconPosition="start"
          {...a11yProps(4)}
        />
      </Tabs>

      <TabPanel value={value} index={0}>
        <NewBookRegister />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        <BookList />
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item five
      </TabPanel>
    </Box>
  );
}
