const employee = require("../model/Employee");
const student = require("../model/Student");
const user = require("../model/user");

const getAllData = async (req, res) => {
  const Malecount = student.find({ gender: "male" });
  const Femalecount = student.find({ gender: "Female" });
  const EmployeeCount = employee.find();
  const UserCount = user.find();

  const DashHomeData = {
    studentData: {
      maleCount: (await Malecount).length,
      femaleCount: (await Femalecount).length,
    },
    employeeCount: (await EmployeeCount).length,
    userCount: (await UserCount).length,
    departmentCount: "",
    programCount: "",
    reserachCenterCount: "",
    HostelRoomCount: "",
  };
  res.json(DashHomeData);
};

module.exports = {
  getAllData,
};
