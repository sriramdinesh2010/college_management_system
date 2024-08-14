import { FaListUl, FaSearch } from "react-icons/fa";
import { FaBuildingColumns } from "react-icons/fa6";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { IoLibrarySharp, IoNotificationsCircleOutline } from "react-icons/io5";
import { PiChalkboardTeacherDuotone, PiStudentFill } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { TbNotes } from "react-icons/tb";
import { MdOutlineSubject } from "react-icons/md";

export const navItems = [
  {
    text: "Dashboard",
    icon: <RxDashboard fontSize="medium" />,
  },
  {
    text: "CreateStudent",
    icon: <PiStudentFill fontSize={23} />,
  },
  {
    text: "studentlist",
    icon: <FaListUl fontSize={23} />,
  },
  {
    text: "SearchStudent",
    icon: <FaSearch fontSize={23} />,
  },
  {
    text: "createemployee",
    icon: <PiChalkboardTeacherDuotone fontSize={23} />,
  },
  {
    text: "department",
    icon: <FaBuildingColumns fontSize={23} />,
  },
  {
    text: "Subject",
    icon: <MdOutlineSubject fontSize={23} />,
  },
  {
    text: "Library",
    icon: <IoLibrarySharp fontSize={23} />,
  },
  {
    text: "Hostel",
    icon: <HiOutlineBuildingOffice fontSize={23} />,
  },
  {
    text: "Notes",
    icon: <TbNotes fontSize={23} />,
  },
  {
    text: "Notification",
    icon: <IoNotificationsCircleOutline fontSize={23} />,
  },
];
