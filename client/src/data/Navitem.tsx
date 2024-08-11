import { HomeOutlined } from "@mui/icons-material";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaListUl } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

export const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Student",
    icon: null,
  },
  {
    text: "CreateStudent",
    icon: <IoMdAddCircleOutline fontSize={23} />,
  },
  {
    text: "studentlist",
    icon: <FaListUl fontSize={20} />,
  },
  {
    text: "SearchStudent",
    icon: <FaSearch fontSize={20} />,
  },
];
