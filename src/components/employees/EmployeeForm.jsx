import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateEmployee,
  addNewEmployee,
  getSingleEmployee,
} from "../../api/employees/employees";
import {
  currentEmployeeId,
  getEmployeeData,
  setCurrentEmployeeId,
} from "../../store/employeeSlice";
import PopUp from "../UI/PopUp";
import classes from "./EmployeeForm.module.scss";

const EmployeeForm = ({ showDialogHandler }) => {
  const id = useSelector(currentEmployeeId);
  const mode = id ? "update" : "add";
  const dispatch = useDispatch();
  const [employeeItem, setEmployeeItem] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    monthlySalary: "",
  });

  const changeHandler = (event) => {
    event.preventDefault();
    setEmployeeItem((prevEmployeeItem) => ({
      ...prevEmployeeItem,
      [event.target.name]: event.target.value,
    }));
  };

  const submitHandler = async (itemData, event) => {
    event.preventDefault();
    try {
      if (mode === "update") {
        const response = await updateEmployee(id, itemData);
        //   add popup here
      } else {
        const response = await addNewEmployee(itemData);
      }

      dispatch(getEmployeeData());
      handleCancel();
    } catch (error) {
      console.log(error.mesasge);
    }
  };

  const handleCancel = () => {
    setEmployeeItem({
      fullName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      monthlySalary: "",
    });
    dispatch(setCurrentEmployeeId(null));
    showDialogHandler(false);
  };

  useEffect(() => {
    if (id) {
      const getTask = async () => {
        try {
          const response = await getSingleEmployee(id);
          setEmployeeItem(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      getTask();
    }
  }, [id]);

  return (
    <PopUp onClose={showDialogHandler.bind(this, false)}>
      <h4>{mode} Employee Data</h4>
      <form
        onSubmit={submitHandler.bind(this, employeeItem)}
        className={classes["employee-form"]}
      >
        <label>
          Full Name
          <input
            type="text"
            value={employeeItem.fullName}
            name="fullName"
            onChange={changeHandler}
          />
        </label>
        <label>
          Email
          <input
            type="text"
            value={employeeItem.email}
            name="email"
            onChange={changeHandler}
          />
        </label>

        <label>
          Phone Number
          <input
            type="number"
            value={employeeItem.phoneNumber}
            name="phoneNumber"
            onChange={changeHandler}
          />
        </label>

        <label>
          Birth Date
          <input
            type="date"
            value={employeeItem.dateOfBirth}
            name="dateOfBirth"
            onChange={changeHandler}
          />
        </label>

        <label>
          Monthly Salary
          <input
            type="number"
            value={employeeItem.monthlySalary}
            name="monthlySalary"
            onChange={changeHandler}
          />
        </label>

        <div className={classes["button-box"]}>
          <button type="submit">{mode}</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </PopUp>
  );
};

export default EmployeeForm;
